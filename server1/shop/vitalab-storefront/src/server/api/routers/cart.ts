// import { MEDUSA_BACKEND_URL } from "@lib/config";
// import Medusa from "@medusajs/medusa-js";
// import { medusaClient } from "@lib/config";
// import { useCart } from "medusa-react";
// import { z } from "zod";

// import { router, publicProcedure } from "../trpc";

// export const exampleRouter = router({
//   // hello: publicProcedure
//   //   .input(z.object({ text: z.string().nullish() }).nullish())
//   //   .query(({ input }) => {
//   //     return {
//   //       greeting: `Hello ${input?.text ?? "world"}`,
//   //     };
//   //   }),
//   // getAll: publicProcedure.query(({ ctx }) => {
//   //   return ctx.prisma.example.findMany();
//   // }),
//   addItemToCart: publicProcedure.input(z.any()).mutation(async ({ input }) => {
//     // const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 });
//     const variant_id = "variant_01GK3S101PH6R20Z91R70BRH1D";
//     const ip = await medusaClient.carts.lineItems.create(input.id, {
//       variant_id,
//       quantity: 1,
//     });

//     // console.log("input", ctx);
//     return {
//       cart: ip.cart,
//     };
//   }),
// });

import { medusaClient } from "@lib/config"
import axios from "axios"
import { z } from "zod"

// import { publicProcedure, router } from "../trpc"
import { createTRPCRouter, publicProcedure } from "../trpc"

let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

export const cartRouter = createTRPCRouter({
  add: publicProcedure
    .input(
      z.object({
        cartId: z.string(),
        variantId: z.string(),
        manipulationId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const c = await medusaClient.carts
        .retrieve(input.cartId)
        .then(({ cart }) => cart)

      const foundVariant = c.items.some(
        (variant) => variant.variant_id === input.variantId
      )

      // if (foundVariant && foundVariant?.quantity >= 1) {
      //   const cart = await medusaClient.carts.lineItems
      //     .update(input.cartId, foundVariant.id, {
      //       quantity: 1,
      //     })
      //     .then(({ cart }) => cart)

      //   console.log("foundVariant", foundVariant.quantity)
      //   return cart
      // } else {
      if (foundVariant) {
        console.log("foundVariant", input.variantId)
        return c
      } else {
        let cart = await medusaClient.carts.lineItems
          .create(input.cartId, {
            variant_id: input.variantId,
            quantity: 1,
            // metadata: { manipulation: "937" },
          })
          .then(({ cart }) => cart)

        if (input.manipulationId !== "0") {
          const hasManipulation = cart.items.some(
            (p) =>
              p.variant.product.external_id === input.manipulationId?.toString()
          )

          if (!hasManipulation) {
            const res = await axios.get(
              `${MEDUSA_BACKEND_URL}/store/products/retrieveByExternalId/${input.manipulationId}`
            )

            cart = await medusaClient.carts.lineItems
              .create(input.cartId, {
                variant_id: res.data.product.variants[0].id,
                quantity: 1,
              })
              .then(({ cart }) => cart)
          }
        }

        return cart
      }

      // if (
      //   cart.items.some(
      //     (p) => p.variant.product.metadata.manipulation_id !== "937"
      //   )
      // ) {

      // }
      // const test = await fetch(
      //   `${MEDUSA_BACKEND_URL}/store/cart/metadata/${cart.id}/${JSON.stringify({
      //     test: "valuetest",
      //   })}`
      // );

      // await fetch(`${MEDUSA_BACKEND_URL}/store/cart/metadata`, {
      //   method: "PUT", // or 'PUT'
      //   headers: {
      //     "Content-Type": "application/json",
      //     Accept: "application/json",
      //   },
      //   body: JSON.stringify({
      //     cartId: "5",
      //     // metadata: { test: "valuetest" },
      //   }),
      // });
      // console.log(cart.items[0]?.tax_lines);
      return c
    }),
  remove: publicProcedure
    .input(
      z.object({
        cartId: z.string(),
        lineId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // get the analysis to be removed
      const product = await medusaClient.carts
        .retrieve(input.cartId)
        .then(({ cart }) => cart.items.find((item) => item.id === input.lineId))

      // remove analysis from cart
      let cart = await medusaClient.carts.lineItems
        .delete(input.cartId, input.lineId)
        .then(({ cart }) => cart)

      if (product?.variant.product.metadata?.manipulation_id !== "0") {
        // check if there are analyzes in the cart that use the same manipulation
        const exist = cart.items.find(
          (item) =>
            item?.variant.product.metadata?.manipulation_id ===
            product?.variant.product.metadata?.manipulation_id
        )

        if (!exist) {
          const manipulation = cart.items.find((item) => {
            console.log(
              typeof product?.variant.product.metadata?.manipulation_id
            )
            return (
              item?.variant.product.external_id ===
              product?.variant.product.metadata?.manipulation_id?.toString()
            )
          })

          cart = await medusaClient.carts.lineItems
            .delete(cart.id, manipulation.id)
            .then(({ cart }) => cart)
        }
      }
      return cart
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        metadata: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      const response = await fetch(`${MEDUSA_BACKEND_URL}/store/cart`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: input.id,
          data: input.metadata,
        }),
      })

      const cart = await response.json()

      return cart
    }),
  update2: publicProcedure
    .input(
      z.object({
        cartId: z.string(),
        payload: z.any(),
      })
    )
    .mutation(async ({ input }) => {
      // const response = await fetch(`${MEDUSA_BACKEND_URL}/store/cart`, {
      //   method: "PUT",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: input.id,
      //     data: input.metadata,
      //   }),
      // })

      // const cart = await response.json()

      // return cart
      const data = {
        email: "test@i.com",
        shipping_address: input.payload.shipping_address,
      }
      console.log(data)
      const res = await medusaClient.carts.update(input.cartId, {
        email: input.payload.email,
        // shipping_address: input.payload.shipping_address,
      })

      const x = await res.cart
      // console.log(input.payload.shipping_address)
      return { data: x }
    }),
})
