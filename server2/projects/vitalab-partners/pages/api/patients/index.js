import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import dayjs from "dayjs";
//TODO SET GLOBAL TZ
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getServerSession } from "next-auth/next"
import Nextauth from "../auth/[...nextauth]";
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export default async function handle(req, res) {
  // const session = await getSession({ req });
  // console.log(req.body);
  const session = await getServerSession(req, res, Nextauth)
  // console.log("session", session)

  const user = await prisma.user.findFirst({
    where: {
      email: session.user.email,
    },
  });

  if (req.method === "POST") {
    try {
      const {
        firstName,
        lastName,
        middleName,
        phone,
        email,
        birthday,
        gender,
      } = req.body;
      const result = await prisma.patient.create({
        data: {
          partnerId: user.id,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          middleName: middleName.trim(),
          phone,
          email,
          birthday: dayjs(birthday, "DD.MM.YYYY")
            .utc("Europe/Kiev")
            .toISOString(),
          gender,
        },
        select: {
          id: true,
        },
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(console.log(e.message));
    }
  }
}

// import prisma from "../../../lib/prisma";

// export default async function handler(req, res) {
//   //   const patients = await prisma.patient.findMany();

//   const patient = await prisma.patient.findUnique({
//     where: {
//       id: "cl3d1h3ww0855wathahrpjy5m",
//     },
//   });
//   // console.log(patient);
//   res.json(patient);
// }
