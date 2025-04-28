import Link from "next/link"
import { CartDropdown } from "@components/cart"
import { Card, Logo, Menu2 } from "@components/ui"

import s from "./navbar.module.css"

const Navbar = () => {
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
          {/* SiteHeader__logo */}
          <div className={s.logo}>
            {/* SiteHeader__logoLink */}
            <Link href="/" aria-label="Logo">
              <Logo />
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
          {/* <NavigationMenu /> */}
          {/* <Menu2 /> */}
          {/* SiteHeader__ctaNav */}
          <CartDropdown />
          {/* <div className="h-full">
            // rgba(66, 71, 112, 0.06)
            <Card className="h-[56px] !min-h-full max-w-[290px] cursor-pointer rounded-lg shadow-[0_0_0_1px_rgb(229,231,235)] transition ease-hover hover:shadow-card-small">
              // <div className="grid py-2 px-6 text-s">
              //  <div className="font-semibold">Оформити замовлення</div>
              //  <div>test</div>
              // </div>
              <div className="relative flex items-center py-2 pl-4 pr-6 text-s">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  // className="h-6 w-6 after:absolute after:left-0 after:bottom-2 after:w-px after:bg-slate-900"
                  className="mr-5 h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                  />
                </svg>
                <div className="text-right before:absolute before:top-2 before:left-12 before:bottom-2 before:w-px before:bg-[rgba(66,71,112,0.06)]">
                  <div className="font-semibold">Оформити замовлення</div>
                  <div>0 аналізів на 0 грн</div>
                </div>
              </div>
            </Card>
          </div> */}
        </div>
      </div>
    </header>
  )
}

export default Navbar
