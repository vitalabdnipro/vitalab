import React from "react"
import { cn } from "@utils/cn"

type Props = {
  className?: string
  props?: any
}

export const Spinner = ({ className, ...props }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      role="status"
      aria-label="Loading"
      className={cn(
        "sn-oe4ja9 rule-l6mge0 h-6 w-6 animate-spin text-gray-400",
        className
      )}
    >
      <g transform="translate(1 1)" fillRule="nonzero" fill="none">
        <circle cx="11" cy="11" r="11"></circle>
        <path
          d="M10.998 22a.846.846 0 0 1 0-1.692 9.308 9.308 0 0 0 0-18.616 9.286 9.286 0 0 0-7.205 3.416.846.846 0 1 1-1.31-1.072A10.978 10.978 0 0 1 10.998 0c6.075 0 11 4.925 11 11s-4.925 11-11 11z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  )
  // return (
  //   <svg
  //     //   className={`-ml-1 mr-3 h-5 w-5 animate-spin ${color} ${props.extraClasses}`}
  //     className={`-ml-1 h-5 w-5 animate-spin`}
  //     xmlns="http://www.w3.org/2000/svg"
  //     fill="none"
  //     viewBox="0 0 24 24"
  //   >
  //     <circle
  //       className="opacity-25"
  //       cx="12"
  //       cy="12"
  //       r="10"
  //       stroke="currentColor"
  //       strokeWidth="4"
  //     ></circle>
  //     <path
  //       className="opacity-75"
  //       fill="currentColor"
  //       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  //     ></path>
  //   </svg>
  // )
}
