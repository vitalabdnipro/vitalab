import React from "react"
import { Button } from "@components/atoms/button"
import { Label } from "@components/atoms/label"
import { PhoneInput } from "@components/atoms/phone-input"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@utils/api"
import { useAtom, useSetAtom } from "jotai"
import { Controller, useForm } from "react-hook-form"
import { otpAtom, userPhoneAtom } from "stores/user-data-store"
import { z } from "zod"

const schema = z.object({
  phone: z.string(),
})

const UserPhone = (props) => {
  const setUserPhone = useSetAtom(userPhoneAtom)
  const setOtp = useSetAtom(otpAtom)
  const mutation = api.auth.otp.useMutation({
    onSuccess: (data) => {
      console.log("data resp", data)
      setUserPhone({ phone: data.phone })
      nextStep()
    },
    onError: (error) => {
      console.log(error.message)
    },
  })

  const {
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const { step, nextStep } = props

  const generateOTP = () => {
    const length = 4
    const chars = "0123456789"
    let otp = ""

    for (let i = 0; i < length; i++) {
      otp += chars[Math.floor(Math.random() * chars.length)]
    }

    return otp
  }

  const onSubmit = (data) => {
    console.log("data otp",data)
    const otp: string = generateOTP()
    setOtp(otp)
    mutation.mutate({ phone: data.phone, otp })
    // setFormValues(values)
  }

  return (
    <form
      className="flex w-full flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-base font-semibold">Підтвердьте номер телефону</h1>
      <h3 className="text-s my-6">
        З міркувань безпеки ми хочемо підтвердити вашу особу, тому надішлемо вам
        текстове повідомлення із чотиризначним кодом підтвердження.
      </h3>
      <div className="flex w-full flex-col">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="phone">Телефон</Label>
          <Controller
            control={control}
            name="phone"
            // rules={{
            //   pattern: {
            //     value:
            //     // ^\+38\s\d{3}\s\d{3}\s\d{2}\s\d{2}$

            //       /^(?:\+38)[" "](\(?\d{3}\)[" "][0-9]{3}[-][0-9]{2}[-][0-9]{2})$/i,
            //     message: "Введіть номер телефону",
            //   },
            // }}
            render={({ field }) => <PhoneInput id="phone" {...field} />}
          />
        </div>
      </div>
      <Button className="mt-6 w-full">Продовжити</Button>
    </form>
  )
}

export { UserPhone }
