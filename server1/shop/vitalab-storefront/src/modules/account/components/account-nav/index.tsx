import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "@components/atoms/button"
import { useAccount } from "@lib/context/account-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import { cn } from "@utils/cn"
import clsx from "clsx"
import { LogOut } from "lucide-react"

const AccountNav = () => {
  const { route } = useRouter()
  const { handleLogout } = useAccount()

  return (
    <div className="pt-10">
      <div className="hidden w-[500px] overflow-auto sm:hidden">
        <ul className="flex w-full gap-36">
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
        </ul>
        {/* {route !== "/account" && (
          <Link href="/account" legacyBehavior>
            <a className="text-small-regular flex items-center gap-x-2 py-2">
              <ChevronDown className="rotate-90" />
              <span>Account</span>
            </a>
          </Link>
        )} */}
      </div>
      <div className="sm:block">
        <div>
          {/* <div className="py-4">
            <h3 className="text-base-semi">Обліковий запис</h3>
          </div> */}
          <div className="text-sm">
            <ul className="mb-0 flex flex-col items-start justify-start gap-y-4">
              <li className="pl-4">
                <AccountNavLink href="/account/orders" route={route}>
                  Замовлення та результати
                </AccountNavLink>
              </li>
              <li className="pl-4">
                <AccountNavLink href="/account" route={route}>
                  Обліковий запис
                </AccountNavLink>
              </li>
              <li className="pl-4">
                <AccountNavLink href="/account/family" route={route}>
                  Родина
                </AccountNavLink>
              </li>
              {/* <li>
                <AccountNavLink href="/account/addresses" route={route}>
                  Addresses
                </AccountNavLink>
              </li> */}
              <li className="text-grey-700 mt-5 pl-4 sm:block">
                <button type="button" onClick={handleLogout} className="flex items-center">
                  Вийти
                  <LogOut size={18} className="ml-2" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <Link
      href={href}
      className={cn("relative text-[15px] leading-6", {
        "font-semibold before:absolute before:-left-4 before:top-[2px] before:h-[15px] before:w-px before:bg-orange-500":
          active,
      })}
    >
      {children}
    </Link>
  )
}

export default AccountNav
