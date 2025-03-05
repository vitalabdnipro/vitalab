import { useState } from "react"
// import Input from "@modules/common/components/input"
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
        // defaultValue=""
        // placeholder="Місяць"
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
      {/* <input
        type={inputType}
        name={name}
        placeholder=" "
        className={clsx(
          "peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder-transparent focus:border-gray-500 focus:outline-none",
          {
            "border-rose-500 focus:border-rose-500": hasError,
          }
        )}
        {...props}
        ref={inputRef}
      /> */}
      <label
        // htmlFor={name}
        // onClick={() => inputRef.current?.focus()}
        className={clsx(
          "absolute left-2.5 -top-2.5 origin-[0] scale-75 bg-white px-2 text-sm text-gray-500 transition-all peer-invalid:hidden",
          {
            // "!text-rose-500": hasError,
          }
        )}
      >
        Місяць
        {/* {required && <span className="text-rose-500">*</span>} */}
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
            {/* <AddressSelect addresses={customer.shipping_addresses} /> */}
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
            {/* <Input
              label="Company"
              {...register("shipping_address.company")}
              autoComplete="organization"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Address"
              {...register("shipping_address.address_1", {
                required: "Address is required",
              })}
              autoComplete="address-line1"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="Apartments, suite, etc."
              {...register("shipping_address.address_2")}
              autoComplete="address-line2"
              errors={errors}
              touched={touchedFields}
            /> */}
            {/* <div className="grid grid-cols-[122px_1fr] gap-x-2">
              <Input
                label="Postal code"
                {...register("shipping_address.postal_code", {
                  required: "Postal code is required",
                })}
                autoComplete="postal-code"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="City"
                {...register("shipping_address.city", {
                  required: "City is required",
                })}
                autoComplete="address-level2"
                errors={errors}
                touched={touchedFields}
              />
            </div>
            <CountrySelect
              {...register("shipping_address.country_code", {
                required: "Country is required",
              })}
              autoComplete="country"
              errors={errors}
              touched={touchedFields}
            />
            <Input
              label="State / Province"
              {...register("shipping_address.province")}
              autoComplete="address-level1"
              errors={errors}
              touched={touchedFields}
            /> */}
            {/* <div className="mt-4 grid grid-cols-3 gap-x-2">
              <div className="flex items-center justify-center text-m">
                День народження:
              </div>
              <div className="col-span-2 grid grid-cols-[calc(100%-75%),1fr,calc(100%-75%)] gap-x-2">
                <Input
                  label="День"
                  {...register("shipping_address.last_name", {
                    required: "Прізвище обов’язкове",
                  })}
                  autoComplete="family-name"
                  errors={errors}
                  touched={touchedFields}
                />
                <SelectMonth />
                <Input
                  label="Рік"
                  {...register("shipping_address.middle_name", {
                    required: "По-батькові обов'язкове",
                  })}
                  autoComplete="middle_name"
                  errors={errors}
                  touched={touchedFields}
                />
              </div>
            </div> */}
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
              {/* <div className="relative z-0 w-full transition-all">
                <select
                  {...register("gender")}
                  id="gender"
                  name="gender"
                  className="without-ring peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder:text-transparent invalid:text-gray-400 focus:border-gray-500 focus:outline-none"
                  // defaultValue=""
                  // placeholder="Місяць"
                  required
                >
                  <option
                    className="text-black"
                    value=""
                    disabled
                    selected
                    hidden
                  >
                    Стать
                  </option>
                  <option value="female" className="text-black">
                    Жінка
                  </option>
                  <option value="male" className="text-black">
                    Чоловік
                  </option>
                </select>

                <label
                  // htmlFor={name}
                  // onClick={() => inputRef.current?.focus()}
                  className={clsx(
                    "absolute left-2.5 -top-2.5 origin-[0] scale-75 bg-white px-2 text-sm text-gray-500 transition-all peer-invalid:hidden",
                    {
                      // "!text-rose-500": hasError,
                    }
                  )}
                >
                  Стать
                  
                </label>
              </div> */}
            </div>
            {/* <div className="w-56">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd.MM.yyyy"
                placeholderText="День рождения"
                customInput={<PatternFormat format="##.##.####" mask="_" />}
              />
            </div> */}
            {/* <div className="mt-4">
              <Input
                label="Phone"
                {...register("shipping_address.phone")}
                autoComplete="tel"
                errors={errors}
                touched={touchedFields}
              />
            </div> */}
            {/* <div className="relative mt-4 w-full">
              <label className="absolute left-2.5 -top-2.5 origin-[0] scale-75 bg-white px-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-gray-400">
                Телефон
              </label>
              <PatternFormat
                format="+38 (###) ###-##-##"
                mask="_"
                allowEmptyFormatting
                placeholder="test"
                className="without-ring peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder-transparent focus:border-gray-500 focus:outline-none"
              />
            </div> */}
            {/* <div>
              <Controller
                control={control}
                name="shipping_address.phone"
                rules={{
                  pattern: {
                    value:
                      /^(?:\+38)[" "](\(?\d{3}\)[" "][0-9]{3}[-][0-9]{2}[-][0-9]{2})$/i,
                    message: "Введіть номер телефону",
                  },
                }}
                render={({
                  field: { onChange, value, name, ref },
                  // fieldState: { invalid, isTouched, isDirty, error },
                  // formState,
                }) => (
                  // <Checkbox
                  //   onBlur={onBlur} // notify when input is touched
                  //   onChange={onChange} // send value to hook form
                  //   checked={value}
                  //   inputRef={ref}
                  // />
                  <div className="relative w-full">
                    <label
                      className={clsx(
                        "absolute left-2.5 -top-2.5 origin-[0] scale-75 bg-white px-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-gray-400",
                        {
                          "!text-rose-500": errors?.shipping_address?.phone,
                        }
                      )}
                    >
                      Телефон
                    </label>
                    <PatternFormat
                      format="+38 (###) ###-##-##"
                      mask="_"
                      allowEmptyFormatting
                      name={name}
                      value={value}
                      onChange={onChange}
                      placeholder="test"
                      className={clsx(
                        "without-ring peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder-transparent focus:border-gray-500 focus:outline-none",
                        {
                          "border-rose-500 !text-rose-500 focus:border-rose-500":
                            errors?.shipping_address?.phone,
                        }
                      )}
                    />
                  </div>
                )}
              />
              {errors?.shipping_address?.phone && (
                <div className="pt-1 text-xs text-rose-500">
                  <span>{errors?.shipping_address?.phone.message}</span>
                </div>
              )}
            </div> */}
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
            {/* <label className="flex w-full">
              <span className="mt-1 mr-4 flex basis-40 flex-col justify-center">
                <span className="text-m font-medium text-slate-900">Фамилия</span>
              </span>
              <div className="flex flex-1 items-start">
                <div className="relative flex w-full flex-col">
                  <input className="w-full rounded-[4px] bg-slate-100 px-3 pt-[5px] pb-[7px] text-m text-slate-900"></input>
                </div>
              </div>
            </label>
            <label className="flex w-full">
              <span className="mt-1 mr-4 flex basis-40 flex-col">
                <span className="text-m text-slate-900">Фамилия</span>
              </span>
              <div className="flex flex-1 items-start">
                <div className="relative flex w-full flex-col">
                  <input className="w-full rounded-[4px] bg-slate-100 px-3 pt-[5px] pb-[7px] text-m text-slate-900"></input>
                </div>
              </div>
            </label>
            <label className="flex w-full">
              <span className="mt-1 mr-4 flex basis-40 flex-col">
                <span className="text-m text-slate-900">Фамилия</span>
              </span>
              <div className="flex flex-1 items-start">
                <div className="relative flex w-full flex-col">
                  <input className="w-full rounded-[4px] bg-slate-100 px-3 pt-[5px] pb-[7px] text-m text-slate-900"></input>
                </div>
              </div>
            </label> */}
          </div>
        )}
      </ConnectForm>
    </div>
  )
}

export default ShippingAddress
