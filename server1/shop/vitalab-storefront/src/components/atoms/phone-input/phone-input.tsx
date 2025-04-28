import { Controller } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { cn } from "utils/cn"

const PhoneInput = (props) => {
  const { className } = props
  return (
    <PatternFormat
      {...props}
      format="+38 (0##) ###-##-##"
      mask="_"
      allowEmptyFormatting
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    />
  )
}

export { PhoneInput }
