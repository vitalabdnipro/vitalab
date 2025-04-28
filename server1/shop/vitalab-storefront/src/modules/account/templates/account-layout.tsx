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
                  {children}
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
