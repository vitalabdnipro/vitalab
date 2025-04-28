import Image from "next/image"
import Link from "next/link"
import { Logo, Section } from "@components/ui"
import CountrySelect from "@modules/layout/components/country-select"
import { cn } from "@utils/cn"

import s from "./footer.module.css"

const Footer = () => {
  return (
    // TODO: Check overflow hidden/visible difference for footer section
    <Section className="grow text-slate-900">
      <div className="py-20 md:py-32">
        {/* SiteFooterSection__layout */}
        <nav className={s.root}>
          {/* SiteFooterSection__column--locale SiteFooterSection__column 1 */}
          <div className={cn(s.column, "col-span-2 md:col-span-1")}>
            {/* SiteFooterSection__localeContainer */}
            <div>
              {/* SiteFooterSection__logo */}
              <div className="mx-4 h-6 w-20 pl-0.5 transition-[color,opacity] ease-hover hover:text-slate-900 hover:opacity-60">
                <Logo />
              </div>
              {/* SiteFooterSection__localeControls */}
              <div className="mt-4 px-4">
                <ul className="mb-1.5 grid list-none grid-flow-col justify-start gap-4">
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=100088703920767"
                      className="link"
                    >
                      <svg
                        className="fill-gray-400 transition ease-hover hover:fill-slate-900"
                        width="24px"
                        height="24px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 12.067C0 18.0335 4.33333 22.9944 10 24V15.3333H7V12H10V9.33332C10 6.33332 11.9333 4.66666 14.6667 4.66666C15.5333 4.66666 16.4667 4.79999 17.3333 4.93332V7.99999H15.8C14.3333 7.99999 14 8.73332 14 9.66666V12H17.2L16.6667 15.3333H14V24C19.6667 22.9944 24 18.0335 24 12.067C24 5.43017 18.6 0 12 0C5.4 0 0 5.43017 0 12.067Z"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/vitalabcompany/"
                      className="link"
                    >
                      <svg
                        className="fill-gray-400 transition ease-hover hover:fill-slate-900"
                        width="24px"
                        height="24px"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16 0c-4.349 0-4.891 0.021-6.593 0.093-1.709 0.084-2.865 0.349-3.885 0.745-1.052 0.412-1.948 0.959-2.833 1.849-0.891 0.885-1.443 1.781-1.849 2.833-0.396 1.020-0.661 2.176-0.745 3.885-0.077 1.703-0.093 2.244-0.093 6.593s0.021 4.891 0.093 6.593c0.084 1.704 0.349 2.865 0.745 3.885 0.412 1.052 0.959 1.948 1.849 2.833 0.885 0.891 1.781 1.443 2.833 1.849 1.020 0.391 2.181 0.661 3.885 0.745 1.703 0.077 2.244 0.093 6.593 0.093s4.891-0.021 6.593-0.093c1.704-0.084 2.865-0.355 3.885-0.745 1.052-0.412 1.948-0.959 2.833-1.849 0.891-0.885 1.443-1.776 1.849-2.833 0.391-1.020 0.661-2.181 0.745-3.885 0.077-1.703 0.093-2.244 0.093-6.593s-0.021-4.891-0.093-6.593c-0.084-1.704-0.355-2.871-0.745-3.885-0.412-1.052-0.959-1.948-1.849-2.833-0.885-0.891-1.776-1.443-2.833-1.849-1.020-0.396-2.181-0.661-3.885-0.745-1.703-0.077-2.244-0.093-6.593-0.093zM16 2.88c4.271 0 4.781 0.021 6.469 0.093 1.557 0.073 2.405 0.333 2.968 0.553 0.751 0.291 1.276 0.635 1.844 1.197 0.557 0.557 0.901 1.088 1.192 1.839 0.22 0.563 0.48 1.411 0.553 2.968 0.072 1.688 0.093 2.199 0.093 6.469s-0.021 4.781-0.099 6.469c-0.084 1.557-0.344 2.405-0.563 2.968-0.303 0.751-0.641 1.276-1.199 1.844-0.563 0.557-1.099 0.901-1.844 1.192-0.556 0.22-1.416 0.48-2.979 0.553-1.697 0.072-2.197 0.093-6.479 0.093s-4.781-0.021-6.48-0.099c-1.557-0.084-2.416-0.344-2.979-0.563-0.76-0.303-1.281-0.641-1.839-1.199-0.563-0.563-0.921-1.099-1.197-1.844-0.224-0.556-0.48-1.416-0.563-2.979-0.057-1.677-0.084-2.197-0.084-6.459 0-4.26 0.027-4.781 0.084-6.479 0.083-1.563 0.339-2.421 0.563-2.979 0.276-0.761 0.635-1.281 1.197-1.844 0.557-0.557 1.079-0.917 1.839-1.199 0.563-0.219 1.401-0.479 2.964-0.557 1.697-0.061 2.197-0.083 6.473-0.083zM16 7.787c-4.541 0-8.213 3.677-8.213 8.213 0 4.541 3.677 8.213 8.213 8.213 4.541 0 8.213-3.677 8.213-8.213 0-4.541-3.677-8.213-8.213-8.213zM16 21.333c-2.948 0-5.333-2.385-5.333-5.333s2.385-5.333 5.333-5.333c2.948 0 5.333 2.385 5.333 5.333s-2.385 5.333-5.333 5.333zM26.464 7.459c0 1.063-0.865 1.921-1.923 1.921-1.063 0-1.921-0.859-1.921-1.921 0-1.057 0.864-1.917 1.921-1.917s1.923 0.86 1.923 1.917z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* SiteFooterSection__copyright */}
            <div className="px-4 text-m font-medium tracking-[0.2px] text-[#364657]">
              <ul className="m-0 list-none p-0">
                <li className="flex">
                  <Image
                    src="/logo/v2/visa-logo.svg"
                    alt="Vitalab"
                    width={70}
                    height={70}
                  />
                  <Image
                    src="/logo/v2/mastercard-logo.svg"
                    alt="Vitalab"
                    width={70}
                    height={70}
                  />
                </li>
                <li className="relative my-1">© 2024 Vitalab</li>
              </ul>
            </div>
          </div>
          {/* SiteFooterSection__column 2 */}
          <div className={cn(s.column, "order-2 md:order-1")}>
            {/* List--hasTitle */}
            <div className="px-4 text-m font-normal tracking-[0.2px]">
              <h3 className="mb-2 font-semibold leading-[1.6] text-slate-900">
                Послуги для пацієнтів
              </h3>
              {/* List__list */}
              <ul
                className="list-none"
                style={
                  {
                    "--link-color": "currentColor",
                    "--link-hover-opacity": "0.6",
                    "--link-weight": "400",
                  } as React.CSSProperties
                }
              >
                <li className="relative my-1">
                  <Link href="/analyzes/11" className="link">
                    Перелік аналізів
                  </Link>
                </li>
                <li className="relative my-1">
                  <Link href="/laboratories" className="link">
                    Де здати аналіз?
                  </Link>
                </li>
                <li className="relative my-1">
                  <Link href="/preparation" className="link">
                    Підготовка до аналізів
                  </Link>
                </li>
                <li className="relative my-1">
                  <Link href="/faq" className="link">
                    Часті запитання
                  </Link>
                </li>
                <li className="relative my-1">
                  <Link href="/faq" className="link">
                    Оплата послуг
                  </Link>
                </li>
                <li className="relative my-1">
                  <a href="https://results.vitalab.com.ua/" target="_blank" className="link">
                    Отримати результат
                  </a>
                </li>
                <li className="relative my-1">
                  <Link href="/home" className="link">
                    Виклик додому
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* SiteFooterSection__column 3 */}
          <div className={cn(s.column, "order-2 md:order-1")}>
            {/* List--hasTitle */}
            <div className="px-4 text-m font-normal tracking-[0.2px]">
              <h3 className="mb-2 font-semibold leading-[1.6] text-slate-900">
                Про Vitalab
              </h3>
              {/* List__list */}
              <ul
                className="list-none"
                style={
                  {
                    "--link-color": "currentColor",
                    "--link-hover-opacity": "0.6",
                    "--link-weight": "400",
                  } as React.CSSProperties
                }
              >
                <li className="relative my-1">
                  <Link href="/about">Лабораторія</Link>
                </li>
                <li className="relative my-1">
                  <Link href="/equipment">Обладнання</Link>
                </li>
                <li className="relative my-1">
                  <Link href="/partners">Партнери</Link>
                </li>
                <li className="relative my-1">
                  <Link href="/licenses">Ліцензіі та свідоцтва</Link>
                </li>
                <li className="relative my-1">
                  <a href="/privacy-policy.pdf">Політика конфіденційності</a>
                </li>
                <li className="relative my-1">
                  <a href="/offer.pdf">Угода користувача</a>
                </li>
              </ul>
            </div>
          </div>
          {/* SiteFooterSection__column 4 */}
          <div className={cn(s.column, "order-1 col-span-2 md:col-span-1")}>
            {/* List--hasTitle */}
            <div className="px-4 text-m font-normal tracking-[0.2px]">
              {/* <CountrySelect /> */}
              <h3 className="mb-2 font-semibold leading-[1.6] text-slate-900">
                Контакти
              </h3>
              {/* List__list */}
              <ul
                className="list-none"
                style={
                  {
                    "--link-color": "currentColor",
                    "--link-hover-opacity": "0.6",
                    "--link-weight": "400",
                  } as React.CSSProperties
                }
              >
                <li className="relative">
                  <div className="m-1 flex items-center pl-6">
                    <svg
                      className="absolute left-0 top-[5px]"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M3.54 8.04h4.42v4.43c0 .57.76.75 1.01.24l4.96-9.93a.54.54 0 0 0-.72-.72L3.3 7.03c-.5.25-.33 1.01.24 1.01"
                        fill="#0A2540"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                    <span className="font-normal leading-[1.65]">
                      вул. Херсонська, 10а (Медичний центр), 3 поверх, Дніпро
                    </span>
                  </div>
                </li>
                <li className="relative">
                  <div className="m-1 flex items-center pl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width="16"
                      height="16"
                      className="absolute left-0 top-[3px]"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-normal">(050) 360-75-75</span>
                  </div>
                </li>
                <li className="relative">
                  <div className="m-1 flex items-center pl-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="absolute left-0 top-[3px] h-4 w-4"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                    <a href="mailto:info@vitalab.com.ua"><span className="font-normal">info@vitalab.com.ua</span></a>
                  </div>
                </li>
              </ul>
              {/* <li className="relative my-1">
                <Link href={"/"}>
                  Лабораторія</a>
                </Link>
              </li>
              <li className="relative my-1">
                <Link href={"/"}>
                  Обладнання</a>
                </Link>
              </li> */}
            </div>
          </div>
        </nav>
      </div>
    </Section>
  )
}

export default Footer
