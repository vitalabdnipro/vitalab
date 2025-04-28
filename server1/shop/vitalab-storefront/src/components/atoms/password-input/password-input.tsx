import * as React from "react"
import { cn } from "@utils/cn"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [typeState, setTypeState] = React.useState<string>("password")

    return (
      // <label>
      //   <div className="mb-2 max-w-full text-xs font-medium capitalize text-gray-900">
      //     {label}
      //   </div>
      <div className="relative">
        <input
          type={typeState}
          className={cn(
            "flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:border-gray-200 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute bottom-0 right-0 flex h-10 w-11 items-center justify-center">
          <button
            className="h-fit w-fit rounded-sm outline-none transition-all"
            type="button"
            onClick={() => {
              setTypeState(typeState === "password" ? "text" : "password")
            }}
          >
            <span className="sr-only">
              {typeState === "password" ? "Show password" : "Hide password"}
            </span>
            {typeState === "password" ? <EyeIcon className="h-5 w-5"/> : <EyeOffIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      // </label>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
