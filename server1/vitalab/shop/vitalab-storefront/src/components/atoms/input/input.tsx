import * as React from "react"
import { cn } from "@utils/cn"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <>
        {label ? (
          <label>
            <div className="mb-2 max-w-full text-xs font-medium capitalize text-gray-900">{label}</div>
            <input
              className={cn(
                "flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
                className
              )}
              ref={ref}
              {...props}
            />
          </label>
        ) : (
          <input
            className={cn(
              "flex h-10 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
        )}
      </>
    )
  }
)
Input.displayName = "Input"

export { Input }
