import prisma from "../../../lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export default async function handler(req, res) {
  //   const patients = await prisma.patient.findMany();
  if (req.method === "GET") {
    const patient = await prisma.patient.findUnique({
      where: {
        id: req.query.id,
      },
      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    // console.log(patient);
    res.status(200).json(patient);
  } else if (req.method === "PUT") {
    const { data } = req.body;
    // console.log("data:",data);
    const patient = await prisma.patient.update({
      where: {
        id: req.query.id,
      },
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        middleName: data.middleName.trim(),
        birthday: dayjs(data.birthday, "DD.MM.YYYY").utc("Europe/Kiev").toISOString(),
        gender: data.gender,
        phone: data.phone,
        email: data.email,
      },
    });

    res.status(200).json();
  }
}
