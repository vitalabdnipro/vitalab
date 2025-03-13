"use client"

import React, { useRef, useState } from "react"
// import script from "next/script"
import { zodResolver } from "@hookform/resolvers/zod"
import { Turnstile } from "@marsidev/react-turnstile"
import { useAtom, useSetAtom } from "jotai"
import { Controller, useForm } from "react-hook-form"
import { isPossiblePhoneNumber } from "react-phone-number-input"
import z from "zod"
import { orderAtom, otpAtom, phoneAtom } from "~/atoms"
import { generateOTP } from "~/utils/generate-otp"

import { OtpDialog } from "~/components/otp-dialog"
import { Button, Input } from "./ui"
import { Error } from "./ui/error"
import { GeistContainer } from "./ui/geist-container"
import { Label } from "./ui/label"
import { PhoneInput } from "./ui/phone-input"

interface ITurnstile {
  success: boolean
  error_codes: string[]
  error_messages: string[]
}

const schema = z
  .object({
    phone: z
      .string({ required_error: "Невірно вказано номер телефона" })
      .min(1),
    order: z.string().min(1, { message: "Невірно вказано номер замовлення" }),
  })
  .refine((data) => isPossiblePhoneNumber(data.phone), {
    message: "Невірно вказано номер телефона",
    path: ["phone"],
  })

export function AuthForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) })

  const [phone, setPhone] = useAtom(phoneAtom)
  const [order, setOrder] = useAtom(orderAtom)
  const setOtp = useSetAtom(otpAtom)
  const [open, setOpen] = useState(false)
  const [token, setToken] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const formRef = useRef(null)

  const onSubmit = async (data: any) => {
    //const formData = new FormData(formRef?.current)
    //const token = formData.get("cf-turnstile-response")

    if (token === "") {
      console.log("token", token)
      return
    }

    const responseTurnstile = await fetch("/api/turnstile", {
      body: JSON.stringify({
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })

    const turnstile = await responseTurnstile.json()

    if (turnstile.success) {
      setPhone({ phone: data.phone, verified: false })
      setOrder(data.order)
      setIsFetching(true)

      const otp = generateOTP()
      setOtp(otp)

      const response = await fetch("/api/otp", {
        body: JSON.stringify({
          phone: data.phone,
          otp,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })

      const result = await response.json()

      if (result.state.value === "Accepted") {
        setIsFetching(false)
        setOpen(true)
      } else {
        console.log("error")
        setIsFetching(false)
      }
    }

    //{
    //   "state": {
    //       "value": "Accepted"
    //   },
    //   "id": 6617169475603,
    //   "date": "Sun, 19 Mar 2023 11:31:59 +0200",
    //   "execTime": 293
    // }
  }

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 pt-16 pb-8 px-4 md:px-0"
      >
        <GeistContainer className="flex-1 items-stretch justify-start">
          <Label htmlFor="phone" className="mb-2 text-xs">
            Телефон
          </Label>
          <Controller
            name="phone"
            control={control}
            // rules={{
            //   validate: {
            //     required: (value) =>
            //       value.length > 10 || "Невірно вказано номер телефона",
            //   },
            // }}
            render={({ field: { value, onChange } }) => (
              <PhoneInput
                placeholder="Телефон"
                className="h-12 bg-white"
                required
                value={value}
                onChange={(val) => {
                  // const isAlreadyVerified = !!verifiedNumbers
                  //   ?.concat([])
                  //   .find(
                  //     (number) =>
                  //       number ===
                  //       form.getValues(`steps.${step.stepNumber - 1}.sendTo`)
                  //   );
                  // setNumberVerified(isAlreadyVerified);
                  onChange(val)
                }}
              />
            )}
          />
          {errors?.phone && (
            <Error className="mt-2">{errors?.phone?.message}</Error>
          )}
        </GeistContainer>
        <div className="geist-container flex-1 items-stretch justify-start">
          <Label htmlFor="order" className="mb-2 text-xs">
            Номер замовлення
          </Label>
          <Input
            id="order"
            className="h-12 bg-white"
            type="order"
            {...register("order")}
          />
          {errors?.order && (
            <Error className="mt-2">{errors?.order?.message}</Error>
          )}
        </div>
        <div className="w-full">
          <Turnstile
            className="mx-auto md:mx-0"
            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
            onSuccess={setToken}
          />
        </div>
        <Button
          disabled={isFetching || token === ""}
          className="hover:bg-white"
        >
          Отримати результати
        </Button>
      </form>

      <OtpDialog open={open} setOpen={setOpen} />
    </>
  )
}
