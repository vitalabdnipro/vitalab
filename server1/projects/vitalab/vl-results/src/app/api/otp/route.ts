import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { phone, otp } = await request.json()

  const response = await fetch("https://api.omnicell.com.ua/ip2sms/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Basic Vml0YUxhYjpWaXRhTGFiX1NNUw==",
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
          msisdn: phone,
        },
      ],
      body: {
        value: `SMS-пароль ${otp}`,
      },
    }),
  })

  const data = await response.json()
  // const data = {
  //   state: { value: "Accepted" },
  //   id: 6617169505098,
  //   date: "Sun, 19 Mar 2023 11:39:44 +0200",
  //   execTime: 94,
  // };

  return NextResponse.json(data)
}
