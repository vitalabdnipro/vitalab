import { useState } from "react"
import { Input } from "@components/atoms/input"
import type { CheckoutFormValues } from "@lib/context/checkout-context"
import { emailRegex } from "@lib/util/regex"
import ConnectForm from "@modules/common/components/connect-form"
import { useMeCustomer } from "medusa-react"
import DatePicker from "react-datepicker"
import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"

import AddressSelect from "../address-select"
import CountrySelect from "../country-select"
import "react-datepicker/dist/react-datepicker.css"
import { InputPhone } from "@components/atoms/input-phone"
import { Label } from "@components/atoms/label"
import { PhoneInput } from "@components/atoms/phone-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"
import { BirthdayPicker } from "@components/molecules/birthday-picker"
import { ProfileSelect } from "@features/checkout/components/profile-select"
import clsx from "clsx"

const SelectMonth = () => {
  return (
    <div className="relative z-0 w-full">
      <select
        id="location"
        name="location"
        className="peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder:text-transparent invalid:text-gray-400 focus:border-gray-500 focus:outline-none"
        required
      >
        <option className="text-black" value="" disabled selected hidden>
          Місяць
        </option>
        <option>Січень</option>
        <option>Лютий</option>
        <option>Березень</option>
        <option>Квітень</option>
        <option>Травень</option>
        <option>Червень</option>
        <option>Липень</option>
        <option>Серпень</option>
        <option>Вересень</option>
        <option>Жовтень</option>
        <option>Листопад</option>
        <option>Грудень</option>
      </select>
      <label
        className={clsx(
          "absolute left-2.5 -top-2.5 origin-[0] scale-75 bg-white px-2 text-sm text-gray-500 transition-all peer-invalid:hidden",
          {
            // "!text-rose-500": hasError,
          }
        )}
      >
        Місяць
      </label>
    </div>
  )
}

const ShippingAddress = () => {
  const { customer } = useMeCustomer()
  const [startDate, setStartDate] = useState(null)

  const handleOnChange = (index: any, e: any) => {
    console.log(e.target.value, "e")
  }
  console.log(customer)
  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-7 flex flex-col gap-y-4">
          <div className="grid w-full items-center">
            <Label htmlFor="profile" className="mb-2">Вкажіть члена родини на якого оформлюється замовлення</Label>
            <ProfileSelect addresses={customer.shipping_addresses} />
          </div>
        </div>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, control, formState: { errors, touchedFields } }) => (
          <div className="grid grid-cols-1 gap-y-7">
            <Input
              id="email"
              label="Електронна пошта"
              {...register("email", {
                required: "Необхідно вказати адресу електронної пошти",
                pattern: emailRegex,
              })}
              autoComplete="email"
              errors={errors}
              touched={touchedFields}
            />
            <div className="grid gap-x-4 gap-y-7 md:grid-cols-3">
              <Input
                id="last_name"
                label="Прізвище"
                {...register("shipping_address.last_name", {
                  required: "Прізвище обов’язкове",
                })}
                autoComplete="family-name"
                errors={errors}
                touched={touchedFields}
              />

              <Input
                id="first_name"
                label="Ім'я"
                {...register("shipping_address.first_name", {
                  required: "Ім'я обов'язкове",
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                id="middle_name"
                label="По-батькові"
                {...register("middle_name", {
                  required: "По-батькові обов'язкове",
                })}
                autoComplete="middle_name"
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="birthday">День народження</Label>
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                    <BirthdayPicker {...field} id="birthday" />
                  )}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
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
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="phone">Телефон</Label>
              <Controller
                control={control}
                name="shipping_address.phone"
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
        )}
      </ConnectForm>
    </div>
  )
}

export default ShippingAddress
