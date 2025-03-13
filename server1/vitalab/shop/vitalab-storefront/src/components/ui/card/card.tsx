import type { FC} from "react";
import { ReactNode, Component, Children } from "react"
import cn from "clsx"

import s from "./card.module.css"
import Link from "next/link"

interface Props {
  children?: any
  className?: string
  shadow?: "default" | "small" | "medium" | "large" |"xlarge"
}

const Card: FC<Props> = ({ children, className, shadow = "default" }) => {
  const rootClassName = cn(
    s.root,
    {      
      [s.shadowSmall]: shadow === "small",
      [s.shadowMedium]: shadow === "medium",
      [s.shadowLarge]: shadow === "large",
      [s.shadowXLarge]: shadow === "xlarge",
    },
    className
  )

  return <div className={rootClassName}>{children}</div>
}

export default Card
