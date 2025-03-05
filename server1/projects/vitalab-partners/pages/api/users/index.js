import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  //   const patients = await prisma.patient.findMany();
  const session = await getSession({ req });
  // console.log(session);
  const patients = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      patients: {
        orderBy: {
          createdAt: "desc",
        },
      },
      organization: true,
    },
  });

  res.status(200).json(patients);
}
