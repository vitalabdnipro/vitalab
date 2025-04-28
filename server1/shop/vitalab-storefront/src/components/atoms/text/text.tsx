import React from "react"
import { cn } from "@utils/cn"

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
type Wight = "default" | "bold" | "semibold" | "light" | "thin"

type TextProps = {
  as?: React.ElementType
  size?: Size //   size?: TextSize
  weight?: Wight //   variant?: TextVariant
  className?: string
  children?: React.ReactNode
}

const forwardRefWithAs = <P, T extends React.ElementType = React.ElementType>(
  Component: React.ForwardRefRenderFunction<React.ElementRef<T>, P & { as?: T }>
) => {
  return React.forwardRef(Component)
}

//export const Text = forwardRefWithAs<TextProps, "div">(function Text(
export const Text = forwardRefWithAs<TextProps>(function Text(
  { as = "p", size = "md", weight = "default", className, ...props },
  forwardedRef
) {
  const Component = as

  return (
    <Component
      ref={forwardedRef}
      className={cn(
        "text-slate-9000",
        {
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "text-base": size === "md",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
          "text-2xl": size === "2xl",
          "text-3xl": size === "3xl",
          // "text-4xl": size === "4xl",
          // "text-5xl": size === "5xl",
          // "text-6xl": size === "6xl",
          // "text-7xl": size === "7xl",
          // "text-8xl": size === "8xl",
          // "text-9xl": size === "9xl",
        },
        {
          "font-normal": weight === "default",
          // "font-medium": weight === "medium",
          "font-semibold": weight === "semibold",
          "font-bold": weight === "bold",
          // "font-black": weight === "black",
        },
        className
      )}
      {...props}
    />
  )
})
Text.displayName = "Text"

// const forwardRefWithAs = <P, T extends React.ElementType = React.ElementType>(
//   Component: React.ForwardRefRenderFunction<React.ElementRef<T>, P & { as?: T }>
// ) => {
//   return React.forwardRef(Component)
// }

// const forwardRefWithAs = <P, T extends React.ElementType = React.ElementType>(
//     Component: React.ForwardRefRenderFunction<React.ElementRef<T>, P & { as?: T }>
// )

// type TextProps = {
//     // as?: React.ElementType

//     // size?: TextSize
//     // variant?: TextVariant
//     // className?: string
//     }

// export function forwardRefWithAs<Props, ComponentType extends As = "div">(
//     comp: (
//       props: PropsFromAs<ComponentType, Props>,
//       ref: React.RefObject<any>
//     ) => React.ReactElement | null
//   ) {
//     return (React.forwardRef(comp as any) as unknown) as ComponentWithAs<
//       ComponentType,
//       Props
//     >;
//   }

// export const Text = forwardRefWithAs<TextProps, "div">(function Text(
//   { as = "div", size = "md", variant = "default", className, ...props },
//   forwardedRef
// ) {
//   const Component = as

//   console.log("Component", props)
//   return (
//     <Component
//       ref={forwardedRef}
//       className={cn(
//         "text-slate-900 dark:text-slate-50",
//         {
//           "text-xs": size === "xs",
//           "text-sm": size === "sm",
//           "text-base": size === "md",
//           "text-lg": size === "lg",
//           "text-xl": size === "xl",
//           "text-2xl": size === "2xl",
//           "text-3xl": size === "3xl",
//           "text-4xl": size === "4xl",
//           "text-5xl": size === "5xl",
//           "text-6xl": size === "6xl",
//           "text-7xl": size === "7xl",
//           "text-8xl": size === "8xl",
//           "text-9xl": size === "9xl",
//           "font-normal": variant === "default",
//           "font-medium": variant === "medium",
//           "font-semibold": variant === "semibold",
//           "font-bold": variant === "bold",
//           "font-black": variant === "black",
//         },
//         className
//       )}
//       {...props}
//     />
//   )
// })
