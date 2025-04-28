import type { CheckoutFormValues } from "@lib/context/checkout-context";
import { emailRegex } from "@lib/util/regex";
import ConnectForm from "@modules/common/components/connect-form";
import Input from "@modules/common/components/input";
import { useMeCustomer } from "medusa-react";
import { useState } from "react";
import AddressSelect from "../address-select";
import CountrySelect from "../country-select";
import DatePicker from "react-datepicker";
import { PatternFormat } from "react-number-format";
import { Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

const SelectMonth = () => {
  return (
    <div className="relative z-0 w-full">
      <select
        id="location"
        name="location"
        className="peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder-transparent invalid:text-gray-400 focus:border-gray-500 focus:outline-none"
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
  );
};

const ShippingAddress = () => {
  const { customer } = useMeCustomer();
  const [startDate, setStartDate] = useState(null);

  return (
    <div>
      {customer && (customer.shipping_addresses?.length || 0) > 0 && (
        <div className="mb-6 flex flex-col gap-y-4 bg-amber-100 p-4">
          <p className="text-small-regular">
            {`Hi ${customer.first_name}, do you want to use one of your saved addresses?`}
          </p>
          <AddressSelect addresses={customer.shipping_addresses} />
        </div>
      )}
      <ConnectForm<CheckoutFormValues>>
        {({ register, control, formState: { errors, touchedFields } }) => (
          <div className="grid grid-cols-1 gap-y-2">
            <Input
              label="Електронна пошта"
              {...register("email", {
                required: "Необхідно вказати адресу електронної пошти",
                pattern: emailRegex,
              })}
              autoComplete="email"
              errors={errors}
              touched={touchedFields}
            />
            <div className="mt-4 grid grid-cols-3 gap-x-2">
              <Input
                label="Прізвище"
                {...register("shipping_address.last_name", {
                  required: "Прізвище обов’язкове",
                })}
                autoComplete="family-name"
                errors={errors}
                touched={touchedFields}
              />
              <Input
                label="Ім'я"
                {...register("shipping_address.first_name", {
                  required: "Ім'я обов'язкове",
                })}
                autoComplete="given-name"
                errors={errors}
                touched={touchedFields}
              />
              {/* <Input
                label="По-батькові"
                {...register("shipping_address.middle_name", {
                  required: "По-батькові обов'язкове",
                })}
                autoComplete="middle_name"
                errors={errors}
                touched={touchedFields}
              /> */}
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
            <div className="mt-4 grid grid-cols-2 gap-x-2">
              <div className="relative w-full">
                <label className="absolute left-2.5 -top-2.5 w-full origin-[0] scale-75 bg-white pl-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-gray-400">
                  День народження (ДД/ММ/ГГГГ)
                </label>
                <PatternFormat
                  format="## / ## / ####"
                  mask="_"
                  allowEmptyFormatting
                  placeholder="test"
                  className="without-ring peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder-transparent focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div className="relative z-0 w-full transition-all">
                <select
                  id="location"
                  name="location"
                  className="without-ring peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder-transparent invalid:text-gray-400 focus:border-gray-500 focus:outline-none"
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
                  <option>Жінка</option>
                  <option>Чоловік</option>
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
                  {/* {required && <span className="text-rose-500">*</span>} */}
                </label>
              </div>
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
            {/* <Controller
              control={control}
              name="test"
              render={({
                field: { onChange, onBlur, value, name, ref },
                // fieldState: { invalid, isTouched, isDirty, error },
                // formState,
              }) => (
                // <Checkbox
                //   onBlur={onBlur} // notify when input is touched
                //   onChange={onChange} // send value to hook form
                //   checked={value}
                //   inputRef={ref}
                // />
                <div className="relative mt-4 w-full">
                  <label className="absolute left-2.5 -top-2.5 origin-[0] scale-75 bg-white px-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-gray-400">
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
                    className="without-ring peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder-transparent focus:border-gray-500 focus:outline-none"
                  />
                </div>
              )}
            /> */}
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
  );
};

export default ShippingAddress;
