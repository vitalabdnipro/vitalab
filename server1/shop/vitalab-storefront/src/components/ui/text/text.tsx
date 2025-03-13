import React, {
  FunctionComponent,
  JSXElementConstructor,
  CSSProperties,
} from "react"
import cn from "clsx"
import s from "./text.module.css"

interface TextProps {
  variant?: Variant
  className?: string
  style?: CSSProperties
  children?: React.ReactNode | any
  html?: string
  onClick?: () => any
}

type Variant =
  | "heading"
  | "body"
  | "pageHeading"
  | "sectionHeading"
  | "accentedHeading"

const Text: FunctionComponent<TextProps> = ({
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
    heading: "h2",
    pageHeading: "h2",
    sectionHeading: "h3",
    accentedHeading: "h3",
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
      className={cn(
        s.root,
        {
          [s.body]: variant === "body",
          [s.heading]: variant === "heading",
          [s.pageHeading]: variant === "pageHeading",
          [s.sectionHeading]: variant === "sectionHeading",
          [s.accentedHeading]: variant === "accentedHeading",
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

export default Text
