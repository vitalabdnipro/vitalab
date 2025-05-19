import { medusaClient, MEDUSA_BACKEND_URL } from "@lib/config"
import { TRPCError } from "@trpc/server"
import { z } from "zod"

// import { router, publicProcedure } from "../trpc";
import { createTRPCRouter, publicProcedure } from "../trpc"

export const customerRouter = createTRPCRouter({
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        // first_name: z.string(),
        // email: z.string(),
        // // middle_name: z.string(),
        // password: z.string(),
        // phone: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await fetch(`${MEDUSA_BACKEND_URL}/customer`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: input.id,
          data: {
            metadata: { middle_name: "test" },
          },
        }),
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        lastName: z.string(),
        firstName: z.string(),
        email: z.string(),
        middleName: z.string(),
        birthday: z.string(),
        gender: z.string(),
        password: z.string(),
        phone: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { customer } = await medusaClient.customers.create({
          first_name: input.firstName,
          last_name: input.lastName,
          email: input.email,
          phone: input.phone,
          password: input.password,
        })

        if (customer) {
          await fetch(`${MEDUSA_BACKEND_URL}/customer`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: customer.id,
              data: {
                metadata: {
                  middle_name: input.middleName,
                  birthday: input.birthday,
                  gender: input.gender,
                },
              },
            }),
          })
        }

        console.log(customer)
        return { email: input.email, password: input.password }
      } catch (error) {
        console.log(typeof error)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "URL Slug already exists for given user.",
        })
      }

      // const rawResponse = await fetch("http://localhost:9000/customer", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: customer.id,
      //     data: { metadata: { name: "gg22", surname: "tee11" } },
      //   }),
      // });

      // const content = await rawResponse.json();

      // console.log("tessssssssssst", customer);
      // return {
      //   // greeting: `Hello ${input?.text ?? "world"}`,
      // };
    }),
  generatePasswordToken: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log(input.email)
      await medusaClient.customers.generatePasswordToken({
        email: input.email,
      })
      // console.log(response)
      // console.log(data)
    }),
})
