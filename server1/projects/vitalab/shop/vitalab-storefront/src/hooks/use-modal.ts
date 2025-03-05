import { useState } from "react"

export interface IModal {
  active: boolean
  open?: () => void
  close: () => void
  toggle?: () => void
}

export const useModal = () => {
  const [active, setActive] = useState(false)

  const open = () => setActive(true)
  const close = () => setActive(false)
  const toggle = () => setActive(!active)

  return [active, open, close, toggle] as const
}
