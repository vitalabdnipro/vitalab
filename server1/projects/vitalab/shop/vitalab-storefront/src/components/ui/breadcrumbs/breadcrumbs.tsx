import { useState } from "react"
import Link from "next/link"
import { Button } from "@components/atoms/button"
import { ContactsDropdownMenu } from "@components/molecules/contacts-dropdown-menu"
import {
  ChatBubbleBottomCenterTextIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import { ClipboardList, PhoneIncoming, User } from "lucide-react"
import { useMeCustomer } from "medusa-react"
import { FaTelegram, FaViber } from "react-icons/fa"

import PhoneIncomingIcon from "../icons/phone-incoming-icon"
import PhoneDropdown from "../phone-dropdown"

const Phone = () => {
  const phones = ["(063) 251-03-38", "(067) 310-52-27", "(050) 360-75-75"]
  const randomIndex = Math.floor(Math.random() * phones.length)
  const phone = phones[randomIndex]

  return (
    <div>
      <a href={`tel:+38${phone?.replace(/[\(\)\s-]/g, "")}`} className="flex">
        {phone}
      </a>
    </div>
  )
}

const Breadcrumbs = (props) => {
  const { customer } = useMeCustomer()
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false)

  return (
    <nav className="flex">
      <div className="hidden w-full items-center justify-between py-4 pl-4 text-gray-900 md:flex">
        <header className="mr-4 flex h-7 items-center">
          <h1 className="inline-flex items-center text-lg font-semibold text-orange-600">
            {props.title}
          </h1>
        </header>
        <div className="flex items-center overflow-hidden">
          <div className="relative flex px-4">
            <ul className="flex">
              <li className="inline-flex pr-4 text-s font-medium leading-[1.6]">
                <PhoneDropdown />
              </li>
              <li className="inline-flex items-center px-3 text-s font-medium leading-[1.6]">
                <ContactsDropdownMenu />
              </li>
              <li className="inline-flex items-center px-3 text-s font-medium leading-[1.6]">
                <DesktopSearchModal />
              </li>
              <li className="inline-flex items-center px-3 text-s font-medium leading-[1.6]">
                {/* <ClipboardDocumentListIcon className="h-6 w-6" /> */}
                <button
                  onClick={() => {
                    if (typeof window === "undefined") {
                      return null
                    }
                    window.streamTelecomWidgetModalHandler()
                  }}
                >
                  {/* <ClipboardList className="" /> */}
                  <PhoneIncomingIcon className="h-5 w-5" />
                </button>
              </li>
              {customer?.first_name ? (
                <li className="inline-flex items-center pl-10 pr-4 text-s font-medium leading-[1.6]">
                  <Link href="/account/orders/" className="flex">
                    <User className="mr-2 h-5 w-5" />
                    {customer?.last_name} {customer?.first_name[0]}.
                  </Link>
                  {/* <Button variant="arrow" className="ml-2 flex h-8">
                  <User className="mr-2 h-5 w-5" />
                  Николичя Т.
                  <svg
                    class="-mr-1 ml-2 mt-0.5 stroke-white stroke-2"
                    fill="none"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    aria-hidden="true"
                  >
                    <path
                      class="opacity-0 transition group-hover:opacity-100"
                      d="M0 5h7"
                    ></path>
                    <path
                      class="transition group-hover:translate-x-[3px]"
                      d="M1 1l4 4-4 4"
                    ></path>
                  </svg>
                </Button> */}
                </li>
              ) : (
                <li className="inline-flex items-center pl-10 pr-4 text-s font-medium leading-[1.6]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                  >
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  <Link href="/account/orders/">Увійти</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="my-4 flex w-full items-center justify-end pr-4 text-gray-900 md:hidden">
        <ul className="flex items-center">
          <li className="mr-6 text-sm">
            <PhoneDropdown />
          </li>
          <li className="mr-6 flex items-center">
            <ContactsDropdownMenu />
          </li>
          <li className="mr-6 flex items-center">
            <PhoneIncoming
              className="h-5 w-5"
              onClick={() => {
                if (typeof window === "undefined") {
                  return null
                }
                window.streamTelecomWidgetModalHandler()
              }}
            />
          </li>
          <li className="flex items-center">
            <Link href="/account/orders">
              <User className="h-5 w-5" />
            </Link>
          </li>
          {/* <li className="flex items-center">
            <a href="https://t.me/VitaLab_results_bot" target="_blank">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 496 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-6 h-5 w-5 text-blue-500"
              >
                <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"></path>
              </svg>
            </a>
          </li>
          <li className="flex items-center">
            <a
              href="viber://pa?chatURI=vitalab_results_bot_chat_bot"
              target="_blank"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-0 h-5 w-5 text-purple-800"
              >
                <path d="M444 49.9C431.3 38.2 379.9.9 265.3.4c0 0-135.1-8.1-200.9 52.3C27.8 89.3 14.9 143 13.5 209.5c-1.4 66.5-3.1 191.1 117 224.9h.1l-.1 51.6s-.8 20.9 13 25.1c16.6 5.2 26.4-10.7 42.3-27.8 8.7-9.4 20.7-23.2 29.8-33.7 82.2 6.9 145.3-8.9 152.5-11.2 16.6-5.4 110.5-17.4 125.7-142 15.8-128.6-7.6-209.8-49.8-246.5zM457.9 287c-12.9 104-89 110.6-103 115.1-6 1.9-61.5 15.7-131.2 11.2 0 0-52 62.7-68.2 79-5.3 5.3-11.1 4.8-11-5.7 0-6.9.4-85.7.4-85.7-.1 0-.1 0 0 0-101.8-28.2-95.8-134.3-94.7-189.8 1.1-55.5 11.6-101 42.6-131.6 55.7-50.5 170.4-43 170.4-43 96.9.4 143.3 29.6 154.1 39.4 35.7 30.6 53.9 103.8 40.6 211.1zm-139-80.8c.4 8.6-12.5 9.2-12.9.6-1.1-22-11.4-32.7-32.6-33.9-8.6-.5-7.8-13.4.7-12.9 27.9 1.5 43.4 17.5 44.8 46.2zm20.3 11.3c1-42.4-25.5-75.6-75.8-79.3-8.5-.6-7.6-13.5.9-12.9 58 4.2 88.9 44.1 87.8 92.5-.1 8.6-13.1 8.2-12.9-.3zm47 13.4c.1 8.6-12.9 8.7-12.9.1-.6-81.5-54.9-125.9-120.8-126.4-8.5-.1-8.5-12.9 0-12.9 73.7.5 133 51.4 133.7 139.2zM374.9 329v.2c-10.8 19-31 40-51.8 33.3l-.2-.3c-21.1-5.9-70.8-31.5-102.2-56.5-16.2-12.8-31-27.9-42.4-42.4-10.3-12.9-20.7-28.2-30.8-46.6-21.3-38.5-26-55.7-26-55.7-6.7-20.8 14.2-41 33.3-51.8h.2c9.2-4.8 18-3.2 23.9 3.9 0 0 12.4 14.8 17.7 22.1 5 6.8 11.7 17.7 15.2 23.8 6.1 10.9 2.3 22-3.7 26.6l-12 9.6c-6.1 4.9-5.3 14-5.3 14s17.8 67.3 84.3 84.3c0 0 9.1.8 14-5.3l9.6-12c4.6-6 15.7-9.8 26.6-3.7 14.7 8.3 33.4 21.2 45.8 32.9 7 5.7 8.6 14.4 3.8 23.6z"></path>
              </svg>
            </a>
          </li> */}
        </ul>
      </div>
    </nav>
  )
}

export default Breadcrumbs
