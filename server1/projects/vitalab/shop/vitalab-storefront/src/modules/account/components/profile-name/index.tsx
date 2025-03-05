import React, { useEffect } from "react"
import { BirthdayInput } from "@components/atoms/birthday-input"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"
import { BirthdayPicker } from "@components/molecules/birthday-picker"
import { useAccount } from "@lib/context/account-context"
import type { Customer } from "@medusajs/medusa"
import { format, parse } from "date-fns"
// import Input from "@modules/common/components/input";
import { useUpdateMe } from "medusa-react"
import { Controller, useForm, useWatch } from "react-hook-form"

import AccountInfo from "../account-info"

type MyInformationProps = {
  customer: Omit<Customer, "password_hash">
}

type Metadata = {
  middle_name: string
  gender: string
  birthday: string
}

type UpdateCustomerNameFormData = {
  first_name: string
  last_name: string
  middle_name: string
  metadata: Metadata
}

const ProfileName: React.FC<MyInformationProps> = ({ customer }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerNameFormData>({
    defaultValues: {
      first_name: customer.first_name,
      last_name: customer.last_name,
      metadata: {
        middle_name: customer.metadata.middle_name as string,
        gender: customer.metadata.gender as string,
        birthday: customer.metadata.birthday as string,
      },
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
      first_name: customer.first_name,
      last_name: customer.last_name,
      metadata: customer.metadata,
    })
  }, [customer, reset])

  const firstName = useWatch({
    control,
    name: "first_name",
  })
  const lastName = useWatch({
    control,
    name: "last_name",
  })
  const middleName = useWatch({
    control,
    name: "metadata.middle_name",
  })
  const gender = useWatch({
    control,
    name: "metadata.gender",
  })
  const birthday = useWatch({
    control,
    name: "metadata.birthday",
  })

  const updateName = (data: UpdateCustomerNameFormData) => {
    console.log(data)
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
    <form onSubmit={handleSubmit(updateName)} className="w-full">
      <AccountInfo
        label="Персональні дані"
        currentInfo={`${customer.last_name} ${customer.first_name} ${customer.metadata.middle_name}`}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        clearState={clearState}
      >
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="first-name">Ім'я</Label>
            <Input
              {...register("first_name", {
                required: true,
              })}
              id="first-name"
              defaultValue={firstName}
              errors={errors}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="last-name">Прізвище</Label>
            <Input
              {...register("last_name", { required: true })}
              id="last-name"
              defaultValue={lastName}
              errors={errors}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="middle-name">По-батькові</Label>
            <Input
              {...register("metadata.middle_name", { required: true })}
              id="middle-name"
              defaultValue={middleName}
              errors={errors}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="birthday">День народження (ДД.ММ.РРРР)</Label>
            {/* <Input
              {...register("metadata.birthday", { required: true })}
              id="birthday"
              defaultValue={birthday}
              errors={errors}
            /> */}
            <Controller
              control={control}
              name="metadata.birthday"
              render={({ field }) => (
                // <BirthdayPicker
                //   {...field}
                //   id="birthday"
                //   onSelect={(date: Date) =>
                //     field.onChange(format(date, "dd.MM.yyyy"))
                //   }
                //   selected={parse(field.value, "dd.MM.yyyy", new Date())}
                // />
                <BirthdayInput
                  {...field}
                  mask="_"
                  id="birthday"
                  // placeholder="LL.01.2021"
                  // value="01.01.2021"
                  allowEmptyFormatting
                  // onValueChange={(values, sourceInfo) => {
                  //   const { formattedValue } = values
                  //   setValuesObj(values)
                  // }}
                  required
                />
              )}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="gender">Стать</Label>
            {/* <Input
              {...register("metadata.gender", { required: true })}
              id="gender"
              defaultValue={gender}
              errors={errors}
            /> */}
            <Controller
              control={control}
              name="metadata.gender"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select
                  onValueChange={onChange}
                  value={value}
                  ref={ref}
                  defaultValue={gender}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Оберіть стать..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Жінка</SelectItem>
                    <SelectItem value="male">Чоловік</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </AccountInfo>
    </form>
  )
}

export default ProfileName
