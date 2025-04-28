import { z } from "zod"

// import { protectedProcedure, publicProcedure, router } from "../trpc"
import { createTRPCRouter, publicProcedure } from "../trpc"

const phoneNumberSchema = z.string().regex(/^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)

export const authRouter = createTRPCRouter({
  // getSession: publicProcedure.query(({ ctx }) => {
  //   return ctx.session
  // }),
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can see this secret message!"
  // }),
  otp: publicProcedure
    .input(
      z.object({
        phone: phoneNumberSchema,
        otp: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const formattedPhoneNumber = `${input.phone.replace(/\D/g, "")}`
      console.log("otp:", input.otp)

      const response = await fetch(process.env.SMS_API_URL || "https://api.omnicell.com.ua/ip2sms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Basic ${process.env.SMS_API_AUTH || "Vml0YUxhYjpWaXRhTGFiX1NNUw=="}`,
        },
        body: JSON.stringify({
          id: "single",
          validity: "+30 min",
          extended: true,
          source: process.env.SMS_SOURCE || "VitaLab",
          desc: "Simple bulk via json",
          type: "SMS",
          to: [
            {
              msisdn: formattedPhoneNumber,
            },
          ],
          body: {
            value: `SMS-пароль ${input.otp}`,
          },
        }),
      })

      const data = await response.json()

      // return { response }
      // const response = {
      //   state: { value: "Accepted" },
      //   id: "6614012446421",
      //   date: "Tue, 20 Nov 2018 08:55:46 +0200",
      //   execTime: "40",
      // }
      return { ...data, phone: input.phone }
    }),
})
