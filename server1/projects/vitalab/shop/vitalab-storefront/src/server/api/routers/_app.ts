import { router } from "../trpc"
import { authRouter } from "./auth"
import { cartRouter } from "./cart"
import { customerRouter } from "./customer"
import { exampleRouter } from "./example"
import { orderRouter } from "./order"
import { productRouter } from "./product"
import { mailRouter } from "./mail"

export const appRouter = router({
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
