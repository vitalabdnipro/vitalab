import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const org = await prisma.organization.findUnique({
    where: {
      id: req.query.id,
    },
  });

  res.status(200).json(org);
}
