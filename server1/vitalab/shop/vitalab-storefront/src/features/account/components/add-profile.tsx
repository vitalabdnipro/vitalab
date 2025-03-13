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
import { Plus, UserPlus } from "lucide-react"
import { useMeCustomer } from "medusa-react"
import DatePicker from "react-date-picker"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

import "react-date-picker/dist/DatePicker.css"

const schema = z.object({
  firstName: z.string().nonempty({ message: "Обов'язкове поле" }),
  lastName: z.string().nonempty({ message: "Обов'язкове поле" }),
  middleName: z.string().nonempty({ message: "Обов'язкове поле" }),
  birthday: z.string({ required_error: "Заповніть дату народження" }),
  gender: z.enum(["female", "male"], {
    required_error: "Оберіть стать",
  }),
})

export const AddProfile = ({ customer }) => {
  const [active, open, close] = useModal()
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
  })
  const { refetchCustomer } = useAccount()
  // const { customer } = useMeCustomer()
  const [submitting, setSubmitting] = useState(false)

  const handleClose = () => {
    reset({
      firstName: "",
      lastName: "",
      middleName: "",
      city: "",
      country_code: "",
      postal_code: "",
      address_1: "",
      address_2: "",
      company: "",
      phone: "",
      gender: "",
      birthday: "",
      province: "",
    })
    close()
  }

  const onSubmit = async (data) => {
    console.log("data:", data)
    setSubmitting(true)
    // setError(undefined)

    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      address_1: "",
      city: "",
      country_code: "UA",
      postal_code: "",
      province: "",
      phone: customer.phone,
      company: "",
      address_2: "",
      metadata: {
        middleName: data.middleName,
        birthday: data.birthday,
        gender: data.gender,
      },
    }

    if (customer.shipping_addresses.length === 0) {
      const promise1 = medusaClient.customers.addresses.addAddress({
        address: {
          first_name: customer.first_name,
          last_name: customer.last_name,
          address_1: "",
          city: "",
          country_code: "UA",
          postal_code: "",
          phone: customer.phone,
          company: "",
          address_2: "",
          province: "",
          metadata: {
            middleName: customer.metadata.middle_name,
            birthday: customer.metadata.birthday,
            gender: customer.metadata.gender,
            main: 1,
          },
        },
      })
      // .then(() => {
      //   setSubmitting(false)
      //   refetchCustomer()
      //   handleClose()
      // })
      // .catch(() => {
      //   setSubmitting(false)
      //   // setError("Failed to add address, please try again.")
      // })
      const promise2 = medusaClient.customers.addresses.addAddress({
        address: payload,
      })
      // .then(() => {
      //   setSubmitting(false)
      //   refetchCustomer()
      //   handleClose()
      // })
      // .catch(() => {
      //   setSubmitting(false)
      //   // setError("Failed to add address, please try again.")
      // })

      try {
        const results = await Promise.all([promise1, promise2])
        console.log("All promises resolved successfully:", results)
        setSubmitting(false)
        refetchCustomer()
        handleClose()
      } catch (error) {
        // setError("Failed to add address, please try again.")
        setSubmitting(false)
        console.error("Error in one or more promises:", error)
      }
    } else {
      medusaClient.customers.addresses
        .addAddress({ address: payload })
        .then(() => {
          setSubmitting(false)
          refetchCustomer()
          handleClose()
        })
        .catch(() => {
          setSubmitting(false)
          // setError("Failed to add address, please try again.")
        })
    }
  }

  console.log("customer:", errors)
  return (
    <>
      {/* <div className="flex flex-1 items-stretch">
        <button
          className="flex min-h-[180px] w-full max-w-full flex-col justify-end rounded-[5px] bg-white py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] transition-shadow duration-200 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_16px_24px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.08)]"
          onClick={open}
        >
          <svg aria-hidden="true" height="24" width="24">
            <defs>
              <linearGradient
                gradientTransform="rotate(37.28)"
                id="moniotoring-icon-fill_24"
              >
                <stop offset="23%" stop-color="rgb(71, 71, 71)"></stop>
                <stop offset="110%" stop-color="rgb(217, 217, 217)"></stop>
              </linearGradient>
            </defs>
            <mask id="monitoring-icon_24">
              <svg
                data-testid="geist-icon"
                fill="none"
                height="24"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
                className="text-white"
              >
                <path d="M18 20V10"></path>
                <path d="M12 20V4"></path>
                <path d="M6 20v-6"></path>
              </svg>
            </mask>
            <rect
              fill="url(#moniotoring-icon-fill_24)"
              height="24"
              mask="url(#monitoring-icon_24)"
              width="24"
              x="0"
              y="0"
            ></rect>
          </svg>
          <div className="mx-4 mb-3 mt-2 flex h-20 flex-initial flex-col items-stretch justify-start gap-1">
            <Text as="p" size="md" weight="semibold">
              Створити профіль
            </Text>
          </div>
        </button>
      </div> */}
      <Button type="secondary" onClick={open}>
        Додати профіль <Plus size={20} className="ml-2" />
      </Button>
      <Modal.Root active={active} onClickOutside={close}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Body>
            <Modal.Header>
              <Modal.Title>Створити профіль</Modal.Title>
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
                  <Input {...register("middleName")} label="По-батькові" />
                  <p className="mt-1 text-xs text-red-500">
                    {errors.middleName?.message}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="flex flex-1 flex-col gap-1.5">
                  <Label htmlFor="birthday">День народження</Label>
                  <Controller
                    control={control}
                    name="birthday"
                    render={({ field }) => (
                      <BirthdayPicker
                        {...field}
                        id="birthday"
                        onSelect={(date: Date) =>
                          field.onChange(format(date, "dd.MM.yyyy"))
                        }
                        selected={parse(field.value, "dd.MM.yyyy", new Date())}
                      />
                      // <DatePicker
                      //   {...field}
                      //   disableCalendar
                      //   value={field.value}
                      //   dayPlaceholder="ДД"
                      //   monthPlaceholder="ММ"
                      //   yearPlaceholder="РРРР"
                      //   // showLeadingZeros={true}
                      //   className=""
                      //   format="dd.MM.yyyy"
                      //   // onInvalidChange={() => {
                      //   //   setError("birthday", {
                      //   //     type: "manual",
                      //   //     message: "Заповніть дату народження",
                      //   //   })
                      //   // }}
                      //   // onChange={(data) => {
                      //   //   clearErrors("birthday")
                      //   //   field.onChange(data)
                      //   // }}
                      // />
                    )}
                  />
                  <p className="text-xs text-red-500">
                    {errors.birthday?.message}
                  </p>
                </div>
                <div className="flex w-full flex-1 flex-col gap-1.5">
                  <Label htmlFor="gender">Стать</Label>
                  <Controller
                    control={control}
                    name="gender"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Select
                        onValueChange={onChange}
                        value={value}
                        ref={ref}
                        // defaultValue="female"
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
                    {errors.gender?.message}
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
              <Button disabled={submitting}>Створити</Button>
            </div>
          </Modal.Actions>
        </form>
      </Modal.Root>
    </>
  )
}
