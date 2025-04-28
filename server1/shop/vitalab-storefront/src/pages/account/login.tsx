import Link from "next/link"
import { Layout } from "@components/common"
import { Card, Section } from "@components/ui"
import { Alert, AlertDescription, AlertTitle } from "@components/v2/alert"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import LoginTemplate from "@modules/account/templates/login-template"
import Head from "@modules/common/components/head"
import { AlertCircle, Terminal } from "lucide-react"
import type { NextPageWithLayout } from "types/global"

const Login: NextPageWithLayout = () => {
  const { loginView, customer, retrievingCustomer } = useAccount()
  const [currentView, setCurrentView] = loginView

  return (
    <>
      <Head title="Sign in" description="Sign in to your ACME account." />
      <Section>
        <div className="pb-16">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-small)`,
              } as React.CSSProperties
            }
          >
            <div className="mt-14 grid grid-cols-1 sm:mt-20 md:grid-cols-4">
              <div className="col-span-2 col-start-2 md:min-h-[530px]">
                {!customer && currentView === LOGIN_VIEW.SIGN_IN && (
                  <Alert className="mb-20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="font-semibold">Увага!</AlertTitle>
                    <AlertDescription>
                      Якщо Ви були зареєстровані на vitalab.dp.ua - перейдіть
                      <button
                        // href="/reset"
                        type="button"
                        onClick={() => {
                          setCurrentView(LOGIN_VIEW.RESET_PASSWORD)
                        }}
                        className="mx-1 font-semibold underline"
                      >
                        сюди
                      </button>
                      та відновіть свій пароль.
                    </AlertDescription>
                  </Alert>
                )}
                <Card shadow="medium" className="bg-white">
                  <LoginTemplate />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

Login.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Login
