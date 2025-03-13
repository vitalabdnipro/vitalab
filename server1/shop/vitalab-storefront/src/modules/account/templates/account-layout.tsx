import React, { useEffect } from "react"
import { Breadcrumbs, Card, Section } from "@components/ui"
import { useAccount } from "@lib/context/account-context"
import UnderlineLink from "@modules/common/components/underline-link"
import Spinner from "@modules/common/icons/spinner"

import AccountNav from "../components/account-nav"

const AccountLayout: React.FC = ({ children }) => {
  const { customer, retrievingCustomer, checkSession } = useAccount()

  useEffect(() => {
    checkSession()
  }, [checkSession])

  // if (retrievingCustomer || !customer) {
  //   return (
  //     <div className="flex h-full min-h-[640px] w-full items-center justify-center bg-red-600 text-gray-900">
  //       <Spinner size={36} />
  //     </div>
  //   )
  // }

  return (
    <Section>
      <div className="min-h-max pb-32">
        <div
          className="section__row-layout"
          style={
            {
              "--row-layout-gap": `var(--row-layout-gap-large)`,
            } as React.CSSProperties
          }
        >
          <Breadcrumbs title="Особистий кабінет" />
          {!retrievingCustomer || customer ? (
            <div>
              <div className="grid items-start gap-y-8 md:grid-cols-[1fr_minmax(0,_3fr)]">
                <AccountNav />
                {/* box-shadow: 0 2px 4px rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.08),0 0 0 1px rgba(0,0,0,.04); */}
                {/* <section className="relative top-0 flex w-full flex-col items-center overflow-hidden rounded-md bg-white shadow-[0_2px_4px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]"> */}
                  {children}
                {/* </section> */}
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <Spinner size={36} />
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

export default AccountLayout
