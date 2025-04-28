// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  // NextAuth
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),

  // Nodemailer
  NODEMAILER_HOST: z.string(),
  NODEMAILER_PORT: z.string().transform(Number),
  NODEMAILER_USER: z.string(),
  NODEMAILER_PASS: z.string(),
  NODEMAILER_SECURE: z.string().transform((val) => val === "true"),
  NODEMAILER_FROM_EMAIL: z.string().email(),
  NODEMAILER_TO_EMAIL: z.string().email(),

  // SMS API
  SMS_API_URL: z.string().url(),
  SMS_API_AUTH: z.string(),
  SMS_SOURCE: z.string(),

  // OTP
  OTP_LENGTH: z.string().transform(Number),
  OTP_CHARS: z.string(),

  // Featured Products
  FEATURED_PRODUCTS: z.string().optional(),

  // Secret Token
  MY_SECRET_TOKEN: z.string(),

  // LiqPay
  NEXT_LIQPAY_PUBLIC_KEY: z.string(),
  NEXT_LIQPAY_PRIVATE_KEY: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // Medusa
  NEXT_PUBLIC_MEDUSA_BACKEND_URL: z.string().url(),

  // Stripe
  NEXT_PUBLIC_STRIPE_KEY: z.string().optional(),

  // PayPal
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: z.string().optional(),

  // Search
  NEXT_PUBLIC_SEARCH_APP_ID: z.string().optional(),
  NEXT_PUBLIC_SEARCH_ENDPOINT: z.string().url(),
  NEXT_PUBLIC_SEARCH_API_KEY: z.string(),
  NEXT_PUBLIC_SEARCH_INDEX_NAME: z.string(),

  // Google Maps
  NEXT_PUBLIC_MAP_API_KEY: z.string(),

  // Google Tag Manager
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: z.string(),

  // E-commerce
  NEXT_PUBLIC_ECOMMERCE_STORAGE_KEY: z.string().optional(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
  NEXT_PUBLIC_PAYPAL_CLIENT_ID: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  NEXT_PUBLIC_SEARCH_APP_ID: process.env.NEXT_PUBLIC_SEARCH_APP_ID,
  NEXT_PUBLIC_SEARCH_ENDPOINT: process.env.NEXT_PUBLIC_SEARCH_ENDPOINT,
  NEXT_PUBLIC_SEARCH_API_KEY: process.env.NEXT_PUBLIC_SEARCH_API_KEY,
  NEXT_PUBLIC_SEARCH_INDEX_NAME: process.env.NEXT_PUBLIC_SEARCH_INDEX_NAME,
  NEXT_PUBLIC_MAP_API_KEY: process.env.NEXT_PUBLIC_MAP_API_KEY,
  NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
  NEXT_PUBLIC_ECOMMERCE_STORAGE_KEY: process.env.NEXT_PUBLIC_ECOMMERCE_STORAGE_KEY,
};
