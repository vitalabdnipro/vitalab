import React, {
  FunctionComponent,
  JSXElementConstructor,
  CSSProperties,
} from "react"
import clsx from "clsx"
import s from "./heading.module.css"

interface TextProps {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children?: React.ReactNode | any
  html?: string
  onClick?: () => any
}

type Variant = "heading" | "body" | "pageHeading" | "sectionHeading"

const Heading: FunctionComponent<TextProps> = ({
  style,
  className = "",
  variant = "body",
  children,
  html,
  onClick,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string
  } = {
    body: "div",
    heading: "h1",
    pageHeading: "h1",
    sectionHeading: "h2",
  }

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!]

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {}

  return (
    <Component
      className={clsx(
        s.root,
        {
          [s.body]: variant === "body",
          "px-4 text-4xl text-gray-900 font-bold leading-tight sm:pr-8": variant === "heading",
          "text-3xl font-medium text-slate-900 md:text-4xl":
            variant === "pageHeading",
          [s.sectionHeading]: variant === "sectionHeading",
        },
        className
      )}
      onClick={onClick}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  )
}

export default Heading
