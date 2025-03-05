import React, { useEffect } from "react"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import { PasswordInput } from "@components/atoms/password-input"
import { ShieldCheckIcon } from "@heroicons/react/24/solid"
import { medusaClient } from "@lib/config"
import type { Customer } from "@medusajs/medusa"
// import Input from "@modules/common/components/input";
import { useUpdateMe } from "medusa-react"
import { useForm } from "react-hook-form"

import AccountInfo from "../account-info"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

type UpdateCustomerPasswordFormData = {
  old_password: string
  new_password: string
  confirm_password: string
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<UpdateCustomerPasswordFormData>()

  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe()

  useEffect(() => {
    reset()
  }, [customer, reset])

  const updatePassword = async (data: UpdateCustomerPasswordFormData) => {
    const isValid = await medusaClient.auth
      .authenticate({
        email: customer.email,
        password: data.old_password,
      })
      .then(() => true)
      .catch(() => false)

    if (!isValid) {
      setError("old_password", {
        type: "validate",
        message: "Old password is incorrect",
      })
      setErrorMessage("Old password is incorrect")

      return
    }

    if (data.new_password !== data.confirm_password) {
      setError("confirm_password", {
        type: "validate",
        message: "Passwords do not match",
      })
      setErrorMessage("Passwords do not match")

      return
    }

    return update({
      id: customer.id,
      password: data.new_password,
    })
  }

  return (
    <form
      onSubmit={handleSubmit(updatePassword)}
      onReset={() => reset()}
      className="w-full"
    >
      <AccountInfo
        label="Пароль"
        currentInfo={
          <div className="flex items-center gap-x-1">
            <span>Пароль не відображається з міркувань безпеки</span>
            <ShieldCheckIcon className="h-5 w-5 text-green-600" />
          </div>
        }
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        errorMessage={errorMessage}
        clearState={clearState}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="middle-name">Старый пароль</Label>
            {/* <Input
              {...register("old_password", {
                required: true,
              })}
              type="password"
              errors={errors}
            /> */}
            <PasswordInput
              {...register("old_password", {
                required: true,
              })}
              errors={errors}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="middle-name">Новий пароль</Label>
            {/* <Input
              type="password"
              {...register("new_password", { required: true })}
              errors={errors}
            /> */}
            <PasswordInput
              {...register("new_password", { required: true })}
              errors={errors}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="middle-name">Підтвердити пароль</Label>
            {/* <Input
              type="password"
              {...register("confirm_password", { required: true })}
              errors={errors}
            /> */}
            <PasswordInput
              {...register("confirm_password", { required: true })}
              errors={errors}
            />
          </div>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
