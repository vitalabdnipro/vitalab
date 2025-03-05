import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
  const { id: orderId, analysis, total } = req.query;

  if (req.method === "POST") {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        total,
      },
    });

    await prisma.OrderLine.create({
      data: {
        orderId: orderId,
        analysisId: req.body[0].searchInput.id,
        analysisCode: req.body[0].searchInput.value,
        analysisName: req.body[0].searchInput.label,
        analysisPrice: req.body[0].searchInput.price,
        analysisColor: req.body[0].searchInput.colorTube,
        analysisContainerName: req.body[0].searchInput.containerName,
      },
      //   order: { connect: { orderId } },
    });

    return res.status(200).json({});
  }

  if (req.method === "DELETE") {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        total,
      },
    });

    await prisma.OrderLine.delete({
      where: {
        id: analysis,
      },
    });

    return res.status(200).json({});
  }
}
