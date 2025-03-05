import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        patient: true,
        partner: {
          include: {
            organization: true,
          },
        },
        analyzes: true,
      },
    });

    res.status(200).json(order);
  }

  if (req.method === "DELETE") {
    console.log(id);
    const deleteOrderLine = prisma.OrderLine.deleteMany({
      where: {
        orderId: id,
      },
    });

    const deleteOrder = prisma.order.delete({
      where: {
        id: id,
      },
    });

    const transaction = await prisma.$transaction([
      deleteOrderLine,
      deleteOrder,
    ]);

    console.log(`id: ${id} deleted ${JSON.stringify(transaction[1])}`);
    return res
      .status(200)
      .json({
        patientId: transaction[1].patientId,
        number: transaction[1].number,
      });
  }
}
