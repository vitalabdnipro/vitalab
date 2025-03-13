import type { ReactElement } from "react"
import type { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Section } from "@components/ui"
import { medusaClient } from "@lib/config"
import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
// import Layout from "@modules/layout/templates";
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import SkeletonOrderConfirmed from "@modules/skeletons/templates/skeleton-order-confirmed"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import { Info } from "lucide-react"
import type { NextPageWithLayout } from "types/global"

const fetchOrder = async (id: string) => {
  return await medusaClient.orders.retrieve(id).then(({ order }) => order)
}

const Confirmed: NextPageWithLayout = () => {
  const router = useRouter()

  const id = typeof router.query?.id === "string" ? router.query.id : ""

  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_order_confirmed", id],
    () => fetchOrder(id),
    {
      enabled: id.length > 0,
      staleTime: Infinity,
    }
  )

  if (isLoading) {
    return <SkeletonOrderConfirmed />
  }

  if (isError) {
    if (IS_BROWSER) {
      router.replace("/404")
    }

    return <SkeletonOrderConfirmed />
  }

  if (isSuccess) {
    return (
      <>
        <Head title="Помилка" description="..." />
        <Section>
          <div className="pb-20">
            <div
              className="section__row-layout"
              style={
                {
                  "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
                } as React.CSSProperties
              }
            >
              <Breadcrumbs title="" />
              <div className="mt-8 grid md:mt-0 md:grid-cols-4">
                <div className="col-span-2 col-start-2 min-h-[450px]">
                  <Card shadow="medium" className="bg-white">
                    {/* <OrderCompletedTemplate order={data} /> */}
                    <div className="p-4">
                      <div className="flex">
                        <Info className="text-red-600" />
                        <h2 className="ml-2">
                          Виникли проблеми при оплаті і тому Ваше замовлення не
                          завершене.
                        </h2>
                      </div>
                      <div className="mt-4 text-sm">
                        Будь ласка, зв&apos;яжіться з нами для отримання
                        додаткової інформації:
                        <ul className="mt-2 font-semibold">
                          <li>
                            <a href="tel:+380503607575">+38 (050) 360-75-75</a>
                          </li>
                          <li>
                            <a href="tel:+380632510338">+38 (063) 251-03-38</a>
                          </li>
                          <li>
                            <a href="tel:+380673105227">+38 (067) 310-52-27</a>
                          </li>
                          <li>
                            <a href="mailto:info@vitalab.com.ua">
                              info@vitalab.com.ua
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </>
    )
  }

  return <></>
}

Confirmed.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [],
//     fallback: "blocking",
//   }
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   const id = context.params?.id as string
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery(["get_order_confirmed", id], () =>
//     fetchOrder(id)
//   )

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

export default Confirmed
