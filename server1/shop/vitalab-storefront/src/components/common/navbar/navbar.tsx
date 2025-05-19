import Link from "next/link"
import { CartDropdown } from "@components/cart"
import { Card, Logo, Menu2 } from "@components/ui"

import s from "./navbar.module.css"

const Navbar = () => {
  return (
    <header className={s.root}>
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full px-4">
          <div className={s.guides__container}>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
          </div>
        </div>
      </div>
      <div className={s.header__container}>
        <div
          className="flex w-full justify-center bg-green-200 hover:text-blue-600"
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
        >
          Режим розробки. Очистити кеш.
        </div>
        <div className="flex min-h-[56px] items-center justify-between px-4 pb-3 pt-8 md:pt-3">
          <div className={s.logo}>
            <Link href="/" aria-label="Logo">
              <Logo />
            </Link>
          </div>
          <CartDropdown />
        </div>
      </div>
    </header>
  )
}

export default Navbar
