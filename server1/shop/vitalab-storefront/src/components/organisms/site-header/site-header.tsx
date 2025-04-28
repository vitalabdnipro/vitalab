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
        <div className="flex min-h-[60px] items-center justify-between px-4 py-3 md:pt-3">
          {/* SiteHeader__logo */}
          <div className={s.logo}>
            {/* SiteHeader__logoLink */}
            <Link href="/" aria-label="Logo">
              <Logo width={112}/>
            </Link>
          </div>

          {/* SiteHeaderNav */}
          <MainNav />
          <CartDropdown />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }
