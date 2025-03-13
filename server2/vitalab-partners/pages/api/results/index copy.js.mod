import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default async function handler(req, res) {
  const session = await getSession({ req });
  dayjs.extend(utc);

  //   const org = await prisma.user.findUnique({
  //     where: {
  //       id: session.user.id,
  //     },
  //     select: {
  //       organizationId: true,
  //     },
  //   });
  //   //TODO bring back checking by sessions
  //   // console.log(req.query.period);
  //   if (req.method === "GET") {

  const analyzes = await prisma.OrderLine.findMany({
    where: {
      status: "SENT",
      order: {
        sentAt: {
          gte: dayjs().subtract(1, "month").toDate(),
        },
      },
    },
    include: {
      order: { select: { number: true } },
    },
  });

  try {
    const promises = await Promise.all(
      analyzes.map((analysis) => {
        const data = fetch("http://10.8.0.1/results/get_by_test_id", {
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
              },
            },
          }),
        })
          .then((res) => res.json())
          .then((analysis) => ({
            order: analysis.order.number,
            testId: analysis.analysisId,
            analysis,
          }));

        return data;
      })
    );

    console.log(promises[1].test.data);

    // const analyzesArray = await Promise.all(
    //   promises.map((analysis) => analysis.json())
    // );

    // const analyzesFilteredArray = analyzesArray.filter(
    //   ({ data }) => data.test_results_status === "READY"
    // );

    res.status(200).json(promises);
  } catch (e) {
    res.status(500).json(console.log(e.message));
  }

  //   console.log(promises);
  //   res.status(200).json(analyzes);
}
// }
