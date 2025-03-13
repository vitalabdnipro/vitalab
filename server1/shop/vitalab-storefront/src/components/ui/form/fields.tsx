import clsx from "clsx"
import { forwardRef, ReactNode, useId } from "react"

type InputProps = JSX.IntrinsicElements["input"]

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={clsx(
        "inline-flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 font-normal text-black outline-none transition placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 focus:border-gray-800",
        props.className
      )}
    />
  )
})
Input.displayName = "Input"

export const Label = (props: JSX.IntrinsicElements["label"]) => {
  return (
    <label
      {...props}
      className={clsx(
        "mb-2 block max-w-full text-m font-medium text-[#666]",
        props.className
      )}
    >
      {props.children}
    </label>
  )
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const id = useId()

    const {
      label,
      placeholder,
      className,
      containerClassName,
      ...passThrough
    } = props

    return (
      <div className={clsx(containerClassName)}>
        <Label htmlFor={id}>{label}</Label>
        <div className="flex max-w-full items-center text-sm">
          <Input
            id={id}
            placeholder={placeholder}
            className={className}
            {...passThrough}
            ref={ref}
          />
        </div>
      </div>
    )
  }
)
InputField.displayName = "InputField"

export const TextField = forwardRef<HTMLInputElement, InputFieldProps>(
  function TextField(props, ref) {
    return <InputField ref={ref} {...props} />
  }
)

type TextAreaProps = JSX.IntrinsicElements["textarea"]

// "inline-flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 font-normal text-black outline-none transition placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 focus:border-gray-800",

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextAreaInput(props, ref) {
    return (
      <textarea
        ref={ref}
        {...props}
        className={clsx(
          "block w-full rounded-md border border-gray-200 py-2 px-3 outline-none transition hover:border-gray-800 focus:border-gray-800 sm:text-sm",
          props.className
        )}
      />
    )
  }
)

type TextAreaFieldProps = {
  label?: ReactNode
} & React.ComponentProps<typeof TextArea> & {
    // name: string
    labelProps?: React.ComponentProps<typeof Label>
  }

export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(function TextField(props, ref) {
  const id = useId()
  const { label, labelProps, placeholder, ...passThrough } = props
  return (
    <div>
      {label && (
        <Label htmlFor={id} {...labelProps}>
          {label}
        </Label>
      )}
      <TextArea ref={ref} placeholder={placeholder} {...passThrough} />
    </div>
  )
})
