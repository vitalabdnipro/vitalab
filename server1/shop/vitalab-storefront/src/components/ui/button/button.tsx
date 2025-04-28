import cn from "clsx"
import type {
  ButtonHTMLAttributes,
  JSXElementConstructor} from "react";
import React, {
  forwardRef,
  useRef,
} from "react"
import { mergeRefs } from "react-merge-refs"
import s from "./button.module.css"
// import { LoadingDots } from '@components/ui'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: "flat" | "slim" | "ghost" | "naked" | "solid" | "link"
  active?: boolean
  type?: "submit" | "reset" | "button"
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = "solid",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = "button",
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)

  const rootClassName = cn(
    s.root,
    {
      [s.solid]: variant === "solid",
      "hover:opacity-60": variant === "link",
      [s.ghost]: variant === "ghost",
      [s.slim]: variant === "slim",
      [s.naked]: variant === "naked",
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  )

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      <svg
        className={s.arrow}
        width="10"
        height="10"
        viewBox="0 0 10 10"
        aria-hidden="true"
      >
        <g fillRule="evenodd">
          <path className={s.arrow__linePath} d="M0 5h7"></path>
          <path className={s.arrow__tipPath} d="M1 1l4 4-4 4"></path>
        </g>
      </svg>
      {/* {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )} */}
    </Component>
  )
})

export default Button
