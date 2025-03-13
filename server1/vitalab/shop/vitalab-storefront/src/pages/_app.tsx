import { type AppType } from "next/app"
import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { StoreProvider } from "@lib/context/store-context"
import { Inter } from "@next/font/google"
import { Hydrate } from "@tanstack/react-query"
import { CartProvider, MedusaProvider } from "medusa-react"
import { AppPropsWithLayout } from "types/global"
import { cn } from "utils/cn"

import { api } from "../utils/api"
import "../styles/globals.css"
import { useEffect } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import Script from "next/script"
import { Toaster } from "@components/atoms/toast"
import { GTM_ID, pageview } from "@lib/gtm"

const inter = Inter({
  subsets: ["cyrillic"],
  variable: "--font-inter",
  display: "swap",
})

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  const router = useRouter()

  useEffect(() => {
    router.events.on("routeChangeComplete", pageview)
    return () => {
      router.events.off("routeChangeComplete", pageview)
    }
  }, [router.events])

  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      {/* Google Tag Manager - Global base code */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `,
        }}
      />
      <MedusaProvider
        baseUrl={MEDUSA_BACKEND_URL}
        queryClientProviderProps={{
          client: queryClient,
        }}
      >
        <Hydrate state={pageProps.dehydratedState}>
          <CartDropdownProvider>
            <MobileMenuProvider>
              <CartProvider>
                <StoreProvider>
                  <AccountProvider>
                    {/* <SessionProvider session={session}> */}
                    {/* <div className={`${inter.variable} font-sans`}> */}
                    <div
                      className={cn(
                        "h-full min-h-screen bg-alice-blue font-sans text-slate-900 antialiased",
                        inter.variable
                      )}
                    >
                      {getLayout(<Component {...pageProps} />)}
                      <Toaster />
                    </div>
                    {/* </SessionProvider> */}
                  </AccountProvider>
                </StoreProvider>
              </CartProvider>
            </MobileMenuProvider>
          </CartDropdownProvider>
        </Hydrate>
      </MedusaProvider>
      <Script src="https://crm.streamtele.com/widget/getwidget/55e7491e0a05e08cdda457d7ee24f164" />
    </>
  )
}

export default api.withTRPC(MyApp)
