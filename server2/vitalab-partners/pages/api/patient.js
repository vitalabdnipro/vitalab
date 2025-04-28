// import { getSession } from 'next-auth/react';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  //   const session = await getSession({ req });
  if (req.method === "POST") {
    try {
      const { name, surname, middlename } = req.body;
      const result = await prisma.patient.create({
        data: {
          name: name,
          surname,
          middlename,
          // author: { connect: { email: session?.user?.email } },
        },
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}
