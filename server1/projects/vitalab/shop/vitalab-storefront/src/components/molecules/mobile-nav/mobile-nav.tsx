import React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import Logo from "@components/ui/logo"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@components/ui/sheet"
import { useLockBody } from "@hooks/use-lock-body"
import { useStore } from "@lib/context/store-context"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import * as Accordion from "@radix-ui/react-accordion"
import { cn } from "@utils/cn"
import {
  AlignJustify,
  ChevronDown,
  ClipboardList,
  Heart,
  Minus,
  Phone,
  Search,
  X,
} from "lucide-react"
import { useCart } from "medusa-react"

const Menu = () => {
  useLockBody()

  return (
    <nav
      className={cn(
        // "fixed inset-0 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
        "fixed inset-x-0 bottom-0 top-16 z-50 w-full max-w-full overflow-y-scroll bg-white px-6 pb-6"
      )}
    >
      <ul className="">
        <Link href="/">
          <li>Аналізи</li>
        </Link>
        <Link href="/">
          <li>Пункти</li>
        </Link>
        <Link href="/">
          <li>Як здавати</li>
        </Link>
        <Link href="/">
          <li>Кар&apos;єра</li>
        </Link>
      </ul>
    </nav>
  )
}

const Menu1 = () => {
  return (
    <nav
      className={cn(
        // "fixed inset-0 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
        "fixed inset-x-0 bottom-0 top-16 z-50 w-full max-w-full overflow-y-scroll bg-white px-6 pb-6"
      )}
    >
      <ul className="">
        <Link href="/">
          <li>Аналізи</li>
        </Link>
        <Link href="/">
          <li>Пункти</li>
        </Link>
        <Link href="/">
          <li>Як здавати</li>
        </Link>
        <Link href="/">
          <li>Кар&apos;єра</li>
        </Link>
      </ul>
    </nav>
  )
}

const Menu2 = ({ setShowMobileMenu }) => {
  return (
    <div className="absolute left-0 top-0 flex w-full">
      <nav className={cn("w-full p-4")}>
        <div className="relative z-10 min-h-[672px] overflow-hidden rounded-lg bg-white shadow-card-xlarge ">
          <div className="relative min-h-[60px]">
            <div className="absolute left-4 top-4">
              <Logo />
            </div>
            <button
              onClick={() => setShowMobileMenu(false)}
              className="absolute right-2 top-[12px] h-10 w-10"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        {/* <div className="min-h-[32px]">test</div>
        <div className="">
          <ul className="">
            <Link href="/">
              <li>Аналізи</li>
            </Link>
            <Link href="/">
              <li>Пункти</li>
            </Link>
            <Link href="/">
              <li>Як здавати</li>
            </Link>
            <Link href="/">
              <li>Кар&apos;єра</li>
            </Link>
          </ul>
        </div> */}
      </nav>
    </div>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

const MobileLink = ({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) => {
  const router = useRouter()
  return (
    <a
      // href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </a>
  )
}

function MobileNav() {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const { cart } = useCart()
  const [open, setOpen] = React.useState(false)
  const { countAnalysis } = useStore()
  const router = useRouter()

  let totalItems = 0

  if (cart && cart.items.length) {
    totalItems = countAnalysis(cart.items)
  }

  return (
    <div className="flex space-x-4 md:hidden">
      {/* <div className="">
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? "X" : "O"}
          <span className="font-bold">Menu</span>
        </button>
        {showMobileMenu && <Menu2 setShowMobileMenu={setShowMobileMenu} />}
      </div> */}

      <DesktopSearchModal />
      <Link className="relative" href="/cart">
        <div className="absolute left-[17px] top-[13px] text-[10px] font-semibold">
          {totalItems}
        </div>
        <svg
          height="40"
          viewBox="0 7 14 29"
          width="40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
        </svg>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="top-4">
          <button>
            <AlignJustify />
          </button>
        </SheetTrigger>
        <SheetContent size="xl" position="right" className="px-[30px] pt-14">
          <SheetClose asChild className="absolute right-4 top-4">
            <X className="h-6 w-6" />
            {/* <span className="sr-only">Close</span> */}
          </SheetClose>
          <nav className="w-full">
            <ul>
              <MobileLink onOpenChange={setOpen} href="/analyzes/11">
                <li className="py-3 text-lg font-medium">Аналізи</li>
              </MobileLink>
              <MobileLink onOpenChange={setOpen} href="/laboratories">
                <li className="py-3 text-lg font-medium">Пункти</li>
              </MobileLink>
              <MobileLink onOpenChange={setOpen} href="/preparation">
                <li className="py-3 text-lg font-medium">Як здавати</li>
              </MobileLink>
              <a
                href="https://results.vitalab.com.ua/"
                target="_blank"
                onClick={() => setOpen(false)}
              >
                <li className="py-3 text-lg font-medium">Результати</li>
              </a>
              <Accordion.Root collapsible type="single">
                <Accordion.Item value="about">
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-3 text-lg font-medium">
                    Про нас
                    <ChevronDown
                      className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
                      aria-hidden
                    />
                  </Accordion.Trigger>
                  <Accordion.Content className="ml-1 border-l border-gray-100 pl-[18px]">
                    <MobileLink onOpenChange={setOpen} href="/careers">
                      <li className="py-3 text-lg font-medium">Кар&apos;єра</li>
                    </MobileLink>
                    <MobileLink onOpenChange={setOpen} href="/contacts">
                      <li className="py-3 text-lg font-medium">Контакти</li>
                    </MobileLink>
                    <MobileLink onOpenChange={setOpen} href="/about">
                      <li className="py-3 text-lg font-medium">
                        Про лабораторію
                      </li>
                    </MobileLink>
                    <MobileLink onOpenChange={setOpen} href="/partners">
                      <li className="py-3 text-lg font-medium">Партнери</li>
                    </MobileLink>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion.Root>
            </ul>
          </nav>
          <div className="mt-8 flex">
            {/* <button className="group inline-flex items-center rounded-full border border-gray-400 bg-transparent px-4 py-1.5 text-sm font-medium text-black transition hover:bg-slate-700">
              Увійти
              <svg
                className="-mr-1 ml-2 mt-0.5 stroke-black stroke-2"
                fill="none"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
              >
                <path
                  className="opacity-0 transition group-hover:opacity-100"
                  d="M0 5h7"
                ></path>
                <path
                  className="transition group-hover:translate-x-[3px]"
                  d="M1 1l4 4-4 4"
                ></path>
              </svg>
            </button> */}
            <Link
              className="group inline-flex items-center rounded-full bg-[#00754a] px-4 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
              onClick={() => {
                // router.push("/login")
                setOpen(false)
              }}
              href="/account/orders"
            >
              Увійти
              <svg
                className="-mr-1 ml-2 mt-0.5 stroke-white stroke-2"
                fill="none"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
              >
                <path
                  className="opacity-0 transition group-hover:opacity-100"
                  d="M0 5h7"
                ></path>
                <path
                  className="transition group-hover:translate-x-[3px]"
                  d="M1 1l4 4-4 4"
                ></path>
              </svg>
            </Link>
          </div>
          {/* <div className="mt-12">
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <Heart className="mr-2 h-5 w-5 fill-red-500 text-red-500" />
                Оформити замовлення
              </li>
              <li className="flex items-center">
                <ClipboardList className="mr-2 h-5 w-5" />
                Переглянути результати
              </li>
            </ul>
          </div> */}
          {/* <div className="mt-8">
            <ul className="space-y-4 text-sm">
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                (067) 310-52-27
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                (067) 310-52-27
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                (067) 310-52-27
              </li>
              <li className="flex items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                >
                  <path d="M444 49.9C431.3 38.2 379.9.9 265.3.4c0 0-135.1-8.1-200.9 52.3C27.8 89.3 14.9 143 13.5 209.5c-1.4 66.5-3.1 191.1 117 224.9h.1l-.1 51.6s-.8 20.9 13 25.1c16.6 5.2 26.4-10.7 42.3-27.8 8.7-9.4 20.7-23.2 29.8-33.7 82.2 6.9 145.3-8.9 152.5-11.2 16.6-5.4 110.5-17.4 125.7-142 15.8-128.6-7.6-209.8-49.8-246.5zM457.9 287c-12.9 104-89 110.6-103 115.1-6 1.9-61.5 15.7-131.2 11.2 0 0-52 62.7-68.2 79-5.3 5.3-11.1 4.8-11-5.7 0-6.9.4-85.7.4-85.7-.1 0-.1 0 0 0-101.8-28.2-95.8-134.3-94.7-189.8 1.1-55.5 11.6-101 42.6-131.6 55.7-50.5 170.4-43 170.4-43 96.9.4 143.3 29.6 154.1 39.4 35.7 30.6 53.9 103.8 40.6 211.1zm-139-80.8c.4 8.6-12.5 9.2-12.9.6-1.1-22-11.4-32.7-32.6-33.9-8.6-.5-7.8-13.4.7-12.9 27.9 1.5 43.4 17.5 44.8 46.2zm20.3 11.3c1-42.4-25.5-75.6-75.8-79.3-8.5-.6-7.6-13.5.9-12.9 58 4.2 88.9 44.1 87.8 92.5-.1 8.6-13.1 8.2-12.9-.3zm47 13.4c.1 8.6-12.9 8.7-12.9.1-.6-81.5-54.9-125.9-120.8-126.4-8.5-.1-8.5-12.9 0-12.9 73.7.5 133 51.4 133.7 139.2zM374.9 329v.2c-10.8 19-31 40-51.8 33.3l-.2-.3c-21.1-5.9-70.8-31.5-102.2-56.5-16.2-12.8-31-27.9-42.4-42.4-10.3-12.9-20.7-28.2-30.8-46.6-21.3-38.5-26-55.7-26-55.7-6.7-20.8 14.2-41 33.3-51.8h.2c9.2-4.8 18-3.2 23.9 3.9 0 0 12.4 14.8 17.7 22.1 5 6.8 11.7 17.7 15.2 23.8 6.1 10.9 2.3 22-3.7 26.6l-12 9.6c-6.1 4.9-5.3 14-5.3 14s17.8 67.3 84.3 84.3c0 0 9.1.8 14-5.3l9.6-12c4.6-6 15.7-9.8 26.6-3.7 14.7 8.3 33.4 21.2 45.8 32.9 7 5.7 8.6 14.4 3.8 23.6z"></path>
                </svg>
                Viber
              </li>
              <li className="flex items-center">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 496 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-5 w-5"
                >
                  <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"></path>
                </svg>
                Telegram
              </li>
            </ul>
          </div> */}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export { MobileNav }
