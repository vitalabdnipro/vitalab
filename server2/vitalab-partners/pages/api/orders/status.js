export default async function handler(req, res) {
  const { number } = req.body;

  console.log(`id ${id} status ${status}`);

  if (req.method === "PUT") {
    await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });

    return res.status(200).json({});
  }
}
