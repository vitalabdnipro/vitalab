// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    LIQPAY_PUBLIC_KEY: z.string().min(1),
    LIQPAY_PRIVATE_KEY: z.string().min(1),
    LIQPAY_SERVER_URL: z.string().url(),
    LIQPAY_RESULT_URL: z.string().url(),
    NODEMAILER_HOST: z.string().min(1),
    NODEMAILER_PORT: z.string().min(1),
    NODEMAILER_USER: z.string().min(1),
    NODEMAILER_PASS: z.string().min(1),
    CLOUDFLARE_TURNSTILE_SECRET_KEY: z.string().min(1),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get typeerrors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    // NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: z.string().min(1),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get typeerrors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    LIQPAY_PUBLIC_KEY: process.env.LIQPAY_PUBLIC_KEY,
    LIQPAY_PRIVATE_KEY: process.env.LIQPAY_PRIVATE_KEY,
    LIQPAY_SERVER_URL: process.env.LIQPAY_SERVER_URL,
    LIQPAY_RESULT_URL: process.env.LIQPAY_RESULT_URL,
    NODEMAILER_HOST: process.env.NODEMAILER_HOST,
    NODEMAILER_PORT: process.env.NODEMAILER_PORT,
    NODEMAILER_USER: process.env.NODEMAILER_USER,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
    CLOUDFLARE_TURNSTILE_SECRET_KEY: process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
    NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY,
  },
})
