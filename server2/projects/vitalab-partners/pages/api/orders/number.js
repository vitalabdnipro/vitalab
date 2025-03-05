import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        number: req.query.n,
      },
      // },
      // include: {
      //   patient: true,
      //   partner: {
      //     include: {
      //       organization: true,
      //     },
      //   },
      //   analyzes: true,
      // },
    });

    res.status(200).json({
      number: order ? order.number : null,
    });
  } catch (e) {
    res.status(500).json(console.log(e.message));
  }
}
