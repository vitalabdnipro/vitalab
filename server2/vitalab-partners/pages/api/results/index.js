import prisma from "../../../lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import murmurhash from "murmurhash";
import fs from "fs";
import { PDFDocument, rgb } from "pdf-lib";

export default async function handler(req, res) {
  if (req.query.apiKey !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized");
  }

  dayjs.extend(utc);

  const analyzes = await prisma.OrderLine.findMany({
    where: {
      status: "SENT",
      order: {
        sentAt: {
          gte: dayjs().subtract(1, "Month").toDate(),
        },
      },
    },
    include: {
      order: {
        select: {
          number: true,
          _count: {
            select: { analyzes: true },
          },
        },
      },
    },
  });

  analyzes.forEach(async (element) => {
    if (element.analysisCode === "00001") {
      await prisma.OrderLine.update({
        where: {
          id: element.id,
        },
        data: {
          status: "COMPLETED",
        },
      });
      console.log(element.id);
    }
  });

  if (analyzes) {
    let completedAnalyzes = [];

    try {
      const chunkSize = 3;

      for (let i = 0; i < analyzes.length; i += chunkSize) {
        const chunk = analyzes.slice(i, i + chunkSize);
        const promises = await Promise.all(
          chunk.map(
            async (analysis) =>
              // await fetch("http://192.168.44.250/results/get_by_test_id", {
              await fetch(
                "http://mirthOUT.vitalab.com.ua:55080/results/get_by_test_id",
                {
                  method: "POST",
                  headers: {
                    //   "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    referral_data: {
                      document_data: { doc_num: analysis.order.number },
                      test: {
                        ext_id: analysis.analysisId,
                        id: analysis.analysisId,
                        code: analysis.analysisCode,
                        base64: true,
                      },
                    },
                  }),
                }
              )
          )
        );

        const analyzesArray = await Promise.all(
          promises.map((analysis) => analysis.json())
        );

        const analyzesFilteredArray = analyzesArray.filter((a) => {
          if (a.status === "ERR") return false;

          if (a.data.form_original.length > 1) {
            const allResearchReady = a.data.form_original.every(
              (element) => element.status === "READY"
            );

            // if (allResearchReady) {
            return allResearchReady && a.data.test_results_status === "READY";
            // }

            // return false;
          } else {
            return (
              a.data.form_original[0].status === "READY" &&
              a.data.test_results_status === "READY"
            );
          }
        });

        completedAnalyzes.push(...analyzesFilteredArray);
      }
    } catch (error) {
      return res.status(500).json(console.log(`error - ${error.message}`));
    }

    console.log(`analyzesFilteredArray: ${completedAnalyzes.length}`);

    if (completedAnalyzes.length > 0) {
      // const prom = await Promise.all(
      completedAnalyzes.map(async (test, index) => {
        const directoryHash = murmurhash.v3(test.data.document_data.doc_num, 8);

        console.log(
          `doc: ${test.data.document_data.doc_num} ${directoryHash} payload: ${test.data.test_results[0]?.payload}`
        );

        if (
          typeof test.data.test_results[0]?.payload == "undefined" ||
          test.data.form_original[0].file_content == null ||
          test.data.test_results[0]?.payload == null
        ) {
          // console.log(test.data.form_original[0]);
          console.log(
            `error ${test.data.document_data.doc_num} ${test.data.test_results[0]?.payload}`
          );
          return false;
        }

        if (test.data.form_original.length > 1) {
          // Load each PDF
          const pdfDocs = await Promise.all(
            test.data.form_original.map(
              async (content) =>
                await PDFDocument.load(content.file_content, { ignoreEncryption: true })
            )
          );

          // Create a new PDF document
          const mergedPdf = await PDFDocument.create();

          for (const pdfDoc of pdfDocs) {
            const copiedPages = await mergedPdf.copyPages(
              pdfDoc,
              pdfDoc.getPageIndices()
            );
            copiedPages.forEach((page) => mergedPdf.addPage(page));
          }

          // Save the merged PDF to a file
          const mergedPdfBytes = await mergedPdf.save();
          const createDir = await fs.promises.mkdir(`/usr/share/caddy/r/${directoryHash}`, {
            recursive: true,
          });
          const createFile = await fs.promises.writeFile(
            `/usr/share/caddy/r/${directoryHash}/${test.data.test_results[0].payload}.pdf`,
            mergedPdfBytes
          );

          console.log(
            `Medical report created: ${createFile} id: ${test.data.test_results[0].payload}`
          );
        } else {
          let buff = Buffer.from(
            test.data.form_original[0].file_content,
            "base64"
          );

          const createDir = await fs.promises.mkdir(`/usr/share/caddy/r/${directoryHash}`, {
            recursive: true,
          });

          const createFile = await fs.promises.writeFile(
            `/usr/share/caddy/r/${directoryHash}/${test.data.test_results[0].payload}.pdf`,
            buff
          );

          console.log(
            `Medical report created: ${createFile} id: ${test.data.test_results[0].payload}`
          );
        }

        function checkFileExists(file) {
          return fs.promises
            .access(file, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);
        }

        console.log(
          `exist:`,
          await checkFileExists(
            `/usr/share/caddy/r/${directoryHash}/${test.data.test_results[0].payload}.pdf`
          )
        );

        if (
          await checkFileExists(
            `/usr/share/caddy/r/${directoryHash}/${test.data.test_results[0].payload}.pdf`
          )
        ) {
          const res = await prisma.order.update({
            where: {
              number: test.data.document_data.doc_num,
            },
            data: {
              analyzes: {
                updateMany: {
                  where: {
                    id: test.data.test_results[0].payload,
                  },
                  data: {
                    status: "COMPLETED",
                    completedAt: dayjs(test.data.date_ready).toDate(),
                  },
                },
              },
            },
            select: {
              id: true,
              analyzes: { where: { status: "COMPLETED" } },
              _count: {
                select: { analyzes: true },
              },
            },
          });

          console.log(
            `${index} hash: ${directoryHash} id: ${test.data.test_results[0].payload}`,
            test.data.document_data.doc_num
          );
        }
      });
    }
  }
  return res.status(200).json();
}
