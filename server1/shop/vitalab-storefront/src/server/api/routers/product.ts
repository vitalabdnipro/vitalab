import { medusaClient } from "@lib/config"
import { z } from "zod"
import fs from "fs"
import path from "path"

import { createTRPCRouter, publicProcedure } from "../trpc"

/**
 * Product router for handling product-related API requests
 */
export const productRouter = createTRPCRouter({
  /**
   * Get a product by its ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const { product } = await medusaClient.products.retrieve(input.id)
        return product
      } catch (error) {
        console.error("Error retrieving product:", error)

        // Fallback to local data for testing
        try {
          const dataPath = path.resolve(process.cwd(), 'data', 'category_products.json')
          const fileData = fs.readFileSync(dataPath, 'utf8')
          const data = JSON.parse(fileData)

          // Search for the product in all collections
          for (const collection of data.collections) {
            const product = collection.products.find(prod => prod.id === input.id)
            if (product) {
              console.log(`Using fallback data for product ${input.id}`)

              // Transform the product data to match what the frontend expects
              if (product.variants) {
                product.variants = product.variants.map(variant => {
                  if (variant.prices && variant.prices.length > 0) {
                    // Set original_price to the first price amount
                    variant.original_price = variant.prices[0].amount;

                    // Set calculated_price to the second price amount if it exists, otherwise use the first price
                    variant.calculated_price = variant.prices.length > 1 ? variant.prices[1].amount : variant.prices[0].amount;

                    // Set calculated_price_type based on whether there's a second price and if it's lower
                    variant.calculated_price_type = variant.prices.length > 1 && variant.prices[1].amount < variant.prices[0].amount ? "sale" : "default";
                  }
                  return variant;
                });
              }

              return product;
            }
          }

          console.error("Product not found in fallback data")
          throw error
        } catch (fallbackError) {
          console.error("Error using fallback data:", fallbackError)
          throw error
        }
      }
    }),

  /**
   * Get products by ID with cart information
   */
  getWithCart: publicProcedure
    .input(z.object({ 
      id: z.string(),
      cart_id: z.string().optional()
    }))
    .query(async ({ input }) => {
      try {
        const { products } = await medusaClient.products.list({
          id: input.id,
          cart_id: input.cart_id,
        })
        return products
      } catch (error) {
        console.error("Error retrieving products with cart:", error)

        // Fallback to local data for testing
        try {
          const dataPath = path.resolve(process.cwd(), 'data', 'category_products.json')
          const fileData = fs.readFileSync(dataPath, 'utf8')
          const data = JSON.parse(fileData)

          // Search for the product in all collections
          const matchingProducts = []
          for (const collection of data.collections) {
            const product = collection.products.find(prod => prod.id === input.id)
            if (product) {
              console.log(`Using fallback data for product ${input.id} in getWithCart`)

              // Transform the product data to match what the frontend expects
              if (product.variants) {
                product.variants = product.variants.map(variant => {
                  if (variant.prices && variant.prices.length > 0) {
                    // Set original_price to the first price amount
                    variant.original_price = variant.prices[0].amount;

                    // Set calculated_price to the second price amount if it exists, otherwise use the first price
                    variant.calculated_price = variant.prices.length > 1 ? variant.prices[1].amount : variant.prices[0].amount;

                    // Set calculated_price_type based on whether there's a second price and if it's lower
                    variant.calculated_price_type = variant.prices.length > 1 && variant.prices[1].amount < variant.prices[0].amount ? "sale" : "default";
                  }
                  return variant;
                });
              }

              matchingProducts.push(product)
            }
          }

          if (matchingProducts.length > 0) {
            return matchingProducts
          }

          console.error("Product not found in fallback data for getWithCart")
          throw error
        } catch (fallbackError) {
          console.error("Error using fallback data in getWithCart:", fallbackError)
          throw error
        }
      }
    }),

  /**
   * Get products by collection ID
   */
  getByCollection: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const { products } = await medusaClient.products.list({
          collection_id: [input.id],
          currency_code: "uah",
          limit: 1000,
        })

        return products
      } catch (error) {
        console.error("Error listing products by collection:", error)

        // Fallback to local data for testing
        try {
          const dataPath = path.resolve(process.cwd(), 'data', 'category_products.json')
          const fileData = fs.readFileSync(dataPath, 'utf8')
          const data = JSON.parse(fileData)

          // Find the collection with the matching ID
          const collection = data.collections.find(col => col.id === input.id)

          if (collection && collection.products) {
            console.log(`Using fallback data for collection ${input.id}`)

            // Transform the product data to match what the frontend expects
            const transformedProducts = collection.products.map(product => {
              if (product.variants) {
                product.variants = product.variants.map(variant => {
                  if (variant.prices && variant.prices.length > 0) {
                    // Set original_price to the first price amount
                    variant.original_price = variant.prices[0].amount;

                    // Set calculated_price to the second price amount if it exists, otherwise use the first price
                    variant.calculated_price = variant.prices.length > 1 ? variant.prices[1].amount : variant.prices[0].amount;

                    // Set calculated_price_type based on whether there's a second price and if it's lower
                    variant.calculated_price_type = variant.prices.length > 1 && variant.prices[1].amount < variant.prices[0].amount ? "sale" : "default";
                  }
                  return variant;
                });
              }
              return product;
            });

            return transformedProducts;
          }

          console.error("Collection not found in fallback data")
          throw error
        } catch (fallbackError) {
          console.error("Error using fallback data:", fallbackError)
          throw error
        }
      }
    }),
})
