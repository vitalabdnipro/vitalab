// import React from "react"
// import { cn } from "@utils/cn"

// type OrderStatusDotProps = {
//   status: "fulfilled" | "processing" | "cancelled"
//   className?: string
// }

// export const forwardRefWithAs = <
//   P,
//   T extends React.ElementType = React.ElementType
// >(
//   Component: React.ForwardRefRenderFunction<React.ElementRef<T>, P & { as?: T }>
// ) => {
//   return React.forwardRef(Component)
// }

// export const OrderStatusDot = forwardRefWithAs<OrderStatusDotProps>(
//   function OrderStatusDot({ status, className, ...props }, forwardedRef) {
//     return (
//       <div
//         ref={forwardedRef}
//         className={cn(
//           "h-2 w-2 rounded-full",
//           {
//             "bg-green-500": status === "fulfilled",
//             "bg-yellow-500": status === "processing",
//             "bg-gray-500": status === "cancelled",
//           },
//           className
//         )}
//         {...props}
//       />
//     )
//   }
// )
// OrderStatusDot.displayName = "OrderStatusDot"

import React, { Ref } from "react"
import { cn } from "@utils/cn"

interface OrderStatusDotProps {
  state: "ready" | "processing" | "cancelled"
  className?: string
  [key: string]: any
}

export const OrderStatusDot = React.forwardRef(
  (
    { state, className, ...props }: OrderStatusDotProps,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div ref={ref} className={cn("absolute flex", className)} {...props}>
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75",
            {
              "bg-green-500": state === "ready",
              "bg-yellow-500": state === "processing",
              "bg-gray-500": state === "cancelled",
            }
          )}
        ></span>
        <span
          className={cn(
            "relative inline-flex h-3 w-3 rounded-full bg-green-500",
            {
              "bg-green-500": state === "ready",
              "bg-yellow-500": state === "processing",
              "bg-gray-500": state === "cancelled",
            }
          )}
        ></span>
      </div>
    )
  }
)
OrderStatusDot.displayName = "OrderStatusDot"

{
  /* <span className="absolute left-2 top-2 flex h-3 w-3">
<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
<span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
</span> */
}
