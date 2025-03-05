import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next"
import Nextauth from "../auth/[...nextauth]";

const getLatestOrderNumber = async () => {
  try {
    const n = await prisma.order.findMany({
      // where: { number: { lt: "555999999999" } },
      where: { number: { lt: "555555555555" } },
      select: {
        number: true,
      },
      orderBy: {
        number: "desc",
      },
      take: 1,
    });

    //TODO recreate
    return n.length === 0 ? "555000000125" : Number(n[0].number) + 1;
  } catch (error) {
    console.log(error);
  }
};

export default async function handler(req, res) {
  // const session = await getSession({ req });
  const session = await getServerSession(req, res, Nextauth)
  // console.log("session", session)

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  console.log(user)
  if (req.method === "GET") {
    const result = await prisma.order.findMany({
      where: { partnerId: user.id },
    });

    res.status(200).json(result);
  } else if (req.method === "POST") {
    try {
      let { patientId, orderNumber, analysis, total, note } = req.body;
      // console.log("api", analysis);
      if (!orderNumber) {
        orderNumber = await getLatestOrderNumber();
      }

      const data = analysis.map(
        ({
          searchInput: {
            label,
            value,
            price,
            id,
            colorTube = "0",
            containerName,
          },
        }) => ({
          analysisId: id,
          analysisName: label,
          analysisCode: value,
          analysisColor: colorTube,
          analysisPrice: price,
          analysisContainerName: containerName,
        })
      );

      console.log("data", data);

      const result = await prisma.order.create({
        data: {
          number: String(orderNumber),
          partnerId: user.id,
          patientId,
          total,
          note,
          // author: { connect: { email: session?.user?.email } },
          analyzes: {
            createMany: { data },
          },
        },
        // include: {
        //   analyzes: true, // Include all posts in the returned object
        // },
      });
      // console.log(result);
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(console.log(e.message));
    }
  }
}
