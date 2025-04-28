import { medusaClient } from "@lib/config"
import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const productRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { product } = await medusaClient.products.retrieve(input.id)

      return product
    }),
  getByCollection: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { products } = await medusaClient.products.list({
        collection_id: [input.id],
        currency_code: "uah",
        limit: 1000,
      })

      console.log("products", products)
      // console.log("products", products[0])
      // const f = products.filter((p) => p?.metadata?.category?.code === +input.id)

      // console.log("f", f[0].variants[0])

      // // console.log("categoriesData", categoriesData)

      // // console.log(params);
      // // получаем все анализы в категории

      // const analyzes = products
      //   .filter((analysis: any) => {
      //     return analysis.metadata?.category?.code === +params.slug
      //   })
      //   .map((p, _, array) => {
      //     return {
      //       product: p,
      //       calculated_price: p.variants[0].calculated_price,
      //       original_price: p.variants[0].original_price,
      //       price_type: p.variants[0].calculated_price_type,
      //       percentage_diff: getPercentageDiff(
      //         p.variants[0].calculated_price,
      //         p.variants[0].original_price
      //       ),
      //     }
      //   })
      //   .sort((a, b) => a.product.mid_code - b.product.mid_code)
      return products
    }),
})
