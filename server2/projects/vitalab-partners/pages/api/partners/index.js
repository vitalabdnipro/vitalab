import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const partners = await prisma.user.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      include: {
        organization: true,
      },
    });
    //   console.log(partners);
    res.status(200).json(partners);
  } else if (req.method === "POST") {
    const {
      organization,
      lisId,
      lastName,
      firstName,
      middleName,
      phone,
      email,
      password,
    } = req.body;

    const hash = await bcrypt.hash(password, 12);

    const result = await prisma.organization.create({
      data: {
        subdivisionId: "2a0ad0970ebb4122a504afb6e24f593c",
        subdivisionName: "Клініка",
        name: organization,
        users: {
          create: [
            {
              lisId,
              lastName,
              firstName,
              middleName: middleName ? middleName : null,
              phone,
              email,
              password: hash,
            },
          ],
        },
      },
    });
    res.status(200).json(result);
  }
}
