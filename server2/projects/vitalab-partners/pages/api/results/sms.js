import dayjs from "dayjs";
import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.query.apiKey !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized");
  }

  const ordersArray = await prisma.order.findMany({
    where: {
      status: "SENT",
      sentAt: {
        gte: dayjs().subtract(1, "Month").toDate(),
      },
    },
    select: {
      id: true,
      analyzes: { where: { status: "COMPLETED" } },
      _count: {
        select: { analyzes: true },
      },
    },
  });

  const sms = async (data) => {
    // console.log(`sms: ${data}`);
    const res = await fetch("https://api.omnicell.com.ua/ip2sms/", {
      method: "POST",
      headers: {
        Authorization: "Basic Vml0YUxhYjowODNJc2duQ2J3QVRnY2pleHptYg==",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "single",
        validity: "+30 min",
        extended: true,
        source: "VitaLab",
        desc: "Simple bulk via json",
        type: "SMS",
        to: [
          {
            msisdn: data.partner.phone.replaceAll("\\D", ""),
          },
        ],
        body: {
          value: `Замовлення #${data.number} ${data.patient.lastName} ${data.patient.firstName} ${data.patient.middleName} виконано!`,
        },
      }),
    });
    return res;
  };

  console.log(`ordersArray: ${ordersArray.length}`);

  const setStatus = async (id) => {
    const res = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: "COMPLETED",
      },
      select: {
        number: true,
        partner: { select: { phone: true } },
        patient: {
          select: { firstName: true, lastName: true, middleName: true },
        },
      },
    });

    return res;
  };

  if (ordersArray.length > 0) {
    ordersArray.forEach(async (order) => {
      if (order.analyzes.length == order._count.analyzes) {
        const resStatus = await setStatus(order.id);
        // const resSms = await sms(resStatus);
        console.log(
          `SET STATUS COMPLETED: ${order.id} ${JSON.stringify(
            resStatus
          )}`
        );
      }
    });
  }

  //   const raw = {
  //     id: "single",
  //     validity: "+30 min",
  //     extended: true,
  //     source: "VitaLab",
  //     desc: "Simple bulk via json",
  //     type: "SMS",
  //     to: [
  //       {
  //         msisdn: "+380636245898",
  //       },
  //     ],
  //     body: {
  //       value: `Все готово`,
  //     },
  //   };

  //   const result = await fetch("https://api.omnicell.com.ua/ip2sms/", {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Basic Vml0YUxhYjowODNJc2duQ2J3QVRnY2pleHptYg==",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(raw),
  //   });

  //   const data = await result.json();

  //   console.log(`data: ${JSON.stringify(data)}`);
  //   console.log(`result: ${JSON.stringify(result)}`);

  //   if (!result.ok) {
  //     return new Response(
  //       JSON.stringify({
  //         error: data.error.email[0],
  //       }),
  //       {
  //         status: 500,
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //       }
  //     );
  //   }

  //   return new Response(
  //     JSON.stringify({
  //       error: "",
  //     }),
  //     {
  //       status: 201,
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     }
  //   );
  return res.status(200).json();
}
