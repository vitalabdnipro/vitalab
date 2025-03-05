import Input, { type Props } from "react-phone-number-input/input"
import { cn } from "~/utils/cn"

export type PhoneInputProps = Props<{
  value?: string
  id?: string
  placeholder?: string
  required?: boolean
  className?: string
  name?: string
}>

export function PhoneInput({
  name,
  className = "",
  onChange,
  ...rest
}: PhoneInputProps) {
  return (
    <Input
      {...rest}
      placeholder="Enter phone number"
      country="UA"
      international
      withCountryCallingCode
      //   defaultCountry="UA"
      name={name}
      onChange={onChange}
      className={cn(
        "inline-flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm text-black transition-colors placeholder:text-opacity-40 focus:border-stone-500 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50",
        className
      )}
      //   countrySelectProps={{ className: "text-black" }}
      //   numberInputProps={{
      //     className:
      //       "border-0 text-sm focus:ring-0 dark:bg-darkgray-100 dark:placeholder:text-darkgray-600",
      //   }}
      //   className={`${className} focus-within:border-brand dark:bg-darkgray-100 dark:border-darkgray-300 block w-full rounded-md rounded-sm border border border-gray-300 py-px pl-3 ring-black focus-within:ring-1 disabled:text-gray-500 disabled:opacity-50 dark:text-white dark:selection:bg-green-500 disabled:dark:text-gray-500`}
    />
  )
}
