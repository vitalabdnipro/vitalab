import Link from "next/link"
import { CartDropdown } from "@components/cart"
import { MainNav } from "@components/molecules/main-nav"
import { MobileNav } from "@components/molecules/mobile-nav"
import { Logo } from "@components/ui"

import s from "./navbar.module.css"
import { cn } from "@utils/cn"

function SiteHeader() {
  return (
    // SiteHeader theme--Light accent--Blurple SiteHeader--hasGuides
    <header className={s.root}>
      {/* SiteHeader__guidesContainer */}
      <div className="absolute left-0 top-0 h-full w-full overflow-hidden">
        {/* Guides SiteHeader__guides */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full px-4">
          {/* Guides__container */}
          <div className={s.guides__container}>
            {/* Guides__guide */}
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
            <div className={s.guides__guide}></div>
          </div>
        </div>
      </div>
      {/* SiteHeader__container */}
      <div className={s.header__container}>
        {/* SiteHeader__navContainer */}
        {/* <div
          className="flex w-full justify-center bg-green-200 hover:text-blue-600"
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
        >
          Режим розробки. Очистити кеш.
        </div> */}
        {/* <div className="flex min-h-[56px] items-center justify-between px-4 pb-3 pt-8 md:pt-3"> */}
        <div className="flex min-h-[60px] items-center justify-between px-4 py-3 md:pt-3">
          {/* SiteHeader__logo */}
          <div className={s.logo}>
            {/* SiteHeader__logoLink */}
            <Link href="/" aria-label="Logo">
              <Logo width={112}/>
            </Link>
          </div>

          {/* SiteHeaderNav */}
          {/* <nav>
            SiteHeaderNav__list
            <ul className="hidden items-center m-0 p-0 list-none md:flex">
              SiteHeaderNavItem
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <a className={s.link}>{link.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav> */}
          <MainNav />
          <CartDropdown />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
