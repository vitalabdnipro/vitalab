// import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { getServerSession } from "next-auth/next"
import Nextauth from "../auth/[...nextauth]";

export default async function handler(req, res) {
  //   const patients = await prisma.patient.findMany();
  // const session = await getSession({ req });
  // console.log(session);
  const session = await getServerSession(req, res, Nextauth)
  // console.log("session", session)

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  const patients = await prisma.user.findUnique({
    where: {
      id: user.id,
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
