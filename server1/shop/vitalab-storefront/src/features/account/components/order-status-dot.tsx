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

