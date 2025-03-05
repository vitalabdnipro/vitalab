// import { createTRPCRouter } from "~/server/api/trpc";

import { authRouter } from "./routers/auth"
import { cartRouter } from "./routers/cart"
import { customerRouter } from "./routers/customer"
import { exampleRouter } from "./routers/example"
import { mailRouter } from "./routers/mail"
import { orderRouter } from "./routers/order"
import { productRouter } from "./routers/product"
import { createTRPCRouter } from "./trpc"

// import { exampleRouter } from "~/server/api/routers/example";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  auth: authRouter,
  cart: cartRouter,
  order: orderRouter,
  customer: customerRouter,
  product: productRouter,
  mail: mailRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
