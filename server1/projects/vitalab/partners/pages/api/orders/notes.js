import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id, note } = req.body;  
  const order = await prisma.order.update({
    where: {
      id,
    },
    data: {
      note,
    },
  });

  res.status(200).json(order);
}
