import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export default async function handler(req, res) {
  const session = await getSession({ req });
  dayjs.extend(utc);

  const org = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      organizationId: true,
    },
  });
  //TODO bring back checking by sessions
  // console.log(req.query.period);
  if (req.method === "GET") {
    const { start, end } = req.query;
    console.log(end);
    const result = await prisma.organization.findMany({
      where: { id: org.organizationId },
      include: {
        users: {
          include: {
            orders: {
              where: {
                sentAt: {
                  gte: dayjs(start).toDate(),
                  lte: dayjs(end).toDate(),
                },
                OR: [{ status: "SENT" }, { status: "COMPLETED" }],
              },
              include: {
                patient: true,
                analyzes: true,
                partner: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(result);
  }
}
