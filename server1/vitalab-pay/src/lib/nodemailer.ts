import nodemailer from "nodemailer"
import { env } from "env.mjs"

export const transporter = nodemailer.createTransport({
  host: env.NODEMAILER_HOST,
  port: 465,
  secure: true, // use SSL
  auth: {
    user: env.NODEMAILER_USER,
    pass: env.NODEMAILER_PASS,
  },
})
