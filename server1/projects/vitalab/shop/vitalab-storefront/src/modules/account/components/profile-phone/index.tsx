import React, { useEffect } from "react"
import { Input } from "@components/atoms/input"
import { useAccount } from "@lib/context/account-context"
import type { Customer } from "@medusajs/medusa"
import { useUpdateMe } from "medusa-react"
import { Controller, useForm, useWatch } from "react-hook-form"

import AccountInfo from "../account-info"
import { PhoneInput } from "@components/atoms/phone-input"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

type UpdateCustomerPhoneFormData = {
  phone: string
}

const ProfilePhone: React.FC<MyInformationProps> = ({ customer }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerPhoneFormData>({
    defaultValues: {
      phone: customer.phone,
    },
  })

  const { refetchCustomer } = useAccount()

  const {
    mutate: update,
    isLoading,
    isSuccess,
    isError,
    reset: clearState,
  } = useUpdateMe()

  useEffect(() => {
    reset({
      phone: customer.phone,
    })
  }, [customer, reset])

  const phone = useWatch({
    control,
    name: "phone",
  })

  const updatePhone = (data: UpdateCustomerPhoneFormData) => {
    return update(
      {
        id: customer.id,
        ...data,
      },
      {
        onSuccess: () => {
          refetchCustomer()
        },
      }
    )
  }

  return (
    <form onSubmit={handleSubmit(updatePhone)} className="w-full">
      <AccountInfo
        label="Телефон"
        currentInfo={`${customer.phone}`}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        clearState={clearState}
      >
        <div className="grid grid-cols-1 gap-y-2">
          {/* <Input
            label="Phone"
            {...register("phone", {
              required: true,
            })}
            defaultValue={phone}
            errors={errors}
          /> */}
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
      </AccountInfo>
    </form>
  )
}

export default ProfilePhone
