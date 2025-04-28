import { transporter } from "@utils/nodemailer"
import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const mailRouter = createTRPCRouter({
  nurseCall: publicProcedure
    .input(
      z.object({ fullName: z.string(), phone: z.string(), comment: z.string() })
    )
    .mutation(async ({ input }) => {
      const response = transporter.sendMail({
        from: process.env.NODEMAILER_FROM_EMAIL || "vitalab@vitalab.com.ua",
        to: process.env.NODEMAILER_TO_EMAIL || "info@vitalab.com.ua",
        subject: `VitaLab - Виклик медсестри`,
        text: "_",
        html: `<!doctype html>
            <html>
              <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                <title>Vitalab</title>
              </head>
              <body style="width:680px;">
                  <ul>
                    <li>Ім'я: ${input.fullName}</li>
                    <li>Телефон: ${input.phone}</li>
                    ${input.comment && `<li>Коментар: ${input.comment}</li>`}
                  </ul>
                </div>
              </body>
            </html>`,
      })

      const body = await response
      return body
    }),
})
