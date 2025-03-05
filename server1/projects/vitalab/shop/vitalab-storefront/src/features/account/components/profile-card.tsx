import { useState } from "react"
import { Button } from "@components/atoms/button"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import * as Modal from "@components/atoms/modal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"
import { Text } from "@components/atoms/text/text"
import { BirthdayPicker } from "@components/molecules/birthday-picker"
import { zodResolver } from "@hookform/resolvers/zod"
import { useModal } from "@hooks/use-modal"
import { medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import { format, parse, parseISO } from "date-fns"
import { X } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import { AddProfileModal } from "./add-profile-modal-new"

// import { AddProfileModal } from "./add-profile-modal"

type FormValues = {
  firstName: string
  lastName: string
  city: string
  country_code: string
  postal_code: string
  province?: string
  address_1: string
  address_2?: string
  phone?: string
  company?: string
  metadata: {
    middleName: string
    birthday: string
    gender: string
  }
}

const schema = z.object({
  firstName: z.string().nonempty({ message: "Обов'язкове поле" }),
  lastName: z.string().nonempty({ message: "Обов'язкове поле" }),
  metadata: z.object({
    middleName: z.string().nonempty({ message: "Обов'язкове поле" }),
    birthday: z.string({ required_error: "Заповніть дату народження" }),
    // gender: z.enum(["female", "male"], {
    //   required_error: "Оберіть стать",
    // }),
    gender: z.string().nonempty({ message: "Обов'язкове поле" }),
  }),
})

export function ProfileCard({ customer, address }) {
  const [active, open, close] = useModal()
  const { refetchCustomer, customer: currentCustomer } = useAccount()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: address.first_name || undefined,
      lastName: address.last_name || undefined,
      metadata: {
        middleName: address.metadata.middleName || undefined,
        birthday: address.metadata.birthday || undefined,
        gender: address.metadata.gender || undefined,
      },
    },
  })

  const onSubmit = (data: FormValues) => {
    setSubmitting(true)
    // setError(undefined)
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      metadata: {
        middleName: data.metadata.middleName || undefined,
        birthday: data.metadata.birthday || undefined,
        gender: data.metadata.gender || undefined,
      },
    }
console.log("payload", payload  )
    medusaClient.customers.addresses
      .updateAddress(address.id, payload)
      .then(() => {
        setSubmitting(false)
        refetchCustomer()
        close()
      })
      .catch(() => {
        setSubmitting(false)
        // setError("Failed to update address, please try again.")
      })
  }

  const removeAddress = () => {
    medusaClient.customers.addresses.deleteAddress(address.id).then(() => {
      refetchCustomer()
    })
  }
  // console.log(customer)

  const findIndexById = (array, id) =>
    array.findIndex((element) => element.id === id)

  console.log("currentCustomer", address)
  return (
    <>
      <div className="flex flex-1 items-stretch">
        <div className="relative flex min-h-[180px] w-full max-w-full flex-col justify-end rounded-[5px] bg-white pt-3 shadow-[0_0_0_1px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] transition-shadow duration-200">
          {/* {findIndexById(customer.shipping_addresses, address.id) !== 0 && ( */}
          {address.metadata.main !== 1 && (
            <button className="absolute right-2 top-2" onClick={removeAddress}>
              <X className="h-4 w-4" />
            </button>
          )}
          <div className="h-[calc(100%-57px)] p-6">
            <Text as="p" size="md" weight="semibold">
              {address.last_name} {address.first_name}
            </Text>
          </div>
          <div className="relative flex min-h-[57px] items-center justify-between gap-3 rounded-b-[5px] border-t bg-gray-50 px-3">
            {/* <Button variant="ghost" size="sm" >
              Видалити
            </Button> */}
            <Button
              type="secondary"
              size="sm"
              onClick={open}
              className="w-full bg-white"
            >
              Редагувати
            </Button>
            {/* <AddProfileModal active={active} onClickOutside={close} /> */}
            <AddProfileModal
              active={active}
              close={close}
              onClickOutside={close}
            />
          </div>
        </div>
      </div>
      <Modal.Root active={active} onClickOutside={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Modal.Header>
              <Modal.Title>Оновити профіль</Modal.Title>
            </Modal.Header>
            <div className="flex flex-col items-stretch justify-start gap-y-3 md:gap-y-7">
              <div className="flex flex-col gap-3 md:flex-row">
                <div>
                  <Input {...register("lastName")} label="Прізвище" />
                  <p className="mt-1 text-xs text-red-500">
                    {errors.lastName?.message}
                  </p>
                </div>
                <div>
                  <Input {...register("firstName")} label="Ім'я" />
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName?.message}
                  </p>
                </div>
                <div>
                  <Input
                    {...register("metadata.middleName")}
                    label="По-батькові"
                  />
                  <p className="mt-1 text-xs text-red-500">
                    {errors.metadata?.middleName?.message}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex flex-1 flex-col gap-1.5">
                  <Label htmlFor="birthday">День народження</Label>
                  <Controller
                    control={control}
                    name="metadata.birthday"
                    render={({ field }) => (
                      // <BirthdayPicker {...field} id="birthday" />
                      <BirthdayPicker
                        {...field}
                        id="birthday"
                        onSelect={(date: Date) =>
                          field.onChange(format(date, "dd.MM.yyyy"))
                        }
                        selected={parse(field.value, "dd.MM.yyyy", new Date())}
                      />
                    )}
                  />
                  <p className="text-xs text-red-500">
                    {errors.metadata?.birthday?.message}
                  </p>
                </div>
                <div className="flex w-full flex-1 flex-col gap-1.5">
                  <Label htmlFor="gender">Стать</Label>
                  <Controller
                    control={control}
                    name="metadata.gender"
                    // render={({ field: { onChange, value, ref, ...field } }) => (
                    render={({ field }) => (
                      <Select
                        // {...field}
                        // onValueChange={onChange}
                        // value={value}
                        // ref={ref}
                        // defaultValue="female"
                        {...field}
                        onValueChange={(data) => {
                          console.log(data)
                          field.onChange(data)
                        }}
                        value={field.value}
                        defaultValue={field.value}
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
                  <p className="text-xs text-red-500">
                    {errors.metadata?.birthday?.message}
                  </p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Actions>
            <div>
              <Button type="secondary" onClick={close} className="bg-white">
                Скасувати
              </Button>
            </div>
            <div>
              <Button disabled={submitting}>Оновити</Button>
            </div>
          </Modal.Actions>
        </form>
      </Modal.Root>
    </>
  )
}
