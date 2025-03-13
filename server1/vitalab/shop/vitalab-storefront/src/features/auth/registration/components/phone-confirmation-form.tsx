import React, { useState } from "react"
import { useRouter } from "next/router"
import { Button } from "@components/atoms/button"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import { trpc } from "@utils/trpc"
import { useAtomValue } from "jotai"
import { useForm } from "react-hook-form"
import { otpAtom, userDataAtom, userPhoneAtom } from "stores/user-data-store"

import { TermsModal } from "./terms-modal"

const PhoneConfirmationForm = (props) => {
  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
    setError,
  } = useForm()

  const { step, nextStep } = props
  const userData = useAtomValue(userDataAtom)
  const otp = useAtomValue(otpAtom)
  const [openTerms, setOpenTerms] = useState(false)

  const onSubmit = (data) => {
    if (data.otp !== otp) {
      setError("otp", {
        type: "validate",
        message: "Паролі не співпадають",
      })
      return
    }

    setOpenTerms(true)
  }

  return (
    <form
      className="flex w-full flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <h1 className="text-base font-semibold">Підтвердьте номер телефону</h1> */}
      <h3 className="text-s mb-6">
        Для підтвердження Вашого телефону <b>{userData.phone}</b> ми надіслали <b>SMS</b> повідомлення з чотирьох значним кодом підтвердження.
      </h3>
      <div className="flex w-full flex-col">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="otp">Введіть код підтвердження</Label>
          <Input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            id="otp"
            {...register("otp", { required: "OTP" })}
          />
        </div>
      </div>
      <Button
        className="mt-6 w-full"
        // onClick={async () => {
        //   // setOpen(true)
        //   // const promise = await trigger()
        //   console.log(userPhone)
        // }}
      >
        Підтвердити та зареєструватися
      </Button>
      <TermsModal
        openTerms={openTerms}
        setOpenTerms={setOpenTerms}
      />
    </form>
  )
}

export { PhoneConfirmationForm }
