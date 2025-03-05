import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { number } = req.body;
  
  if (req.method === "PUT") {
    const result = await prisma.order.update({
      where: {
        number,
      },
      data: {
        status: "SENT",
        analyzes: {
          updateMany: {
            where: {
              status: "COMPLETED",
            },
            data: {
              status: "SENT",
            },
          },
        },
      },
    });

    return res.status(200).end();
  }
}
