import { Suspense, useRef, type ReactElement } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import AnalyzesSidebar from "@components/analyzes/analyzes-sidebar"
import ProductList from "@components/analyzes/product-list"
import AnalyzesLayout from "@components/common/layouts/analyzes-layout"
import { Button, Card } from "@components/ui"
import { Skeleton } from "@components/v2/skeleton"
import { medusaClient } from "@lib/config"
import { useStore } from "@lib/context/store-context"
import { fetchProductsList } from "@lib/data"
import { QueryClient, useQuery } from "@tanstack/react-query"
import { api } from "@utils/api"
import type { CalculatedVariant } from "types/medusa"
import { z } from "zod"

type Analyzes = {
  code: string
  name: string
}

type Category = {
  id: number
  name: string
  slug: string
}

// ];

// const querySchema = z.object({
//   id: z.string(),
// });

let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL
}

const fetchCategories = async () => {
  const response = await fetch(`${MEDUSA_BACKEND_URL}/store/categories`)
  const data = await response.json()
  return data
}

const Slug = (props) => {
  const router = useRouter()
  const { slug } = router.query
  const scrollRef = useRef(null)

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    select: (data) => {
      return data.filter((c) => c.id !== 14 && c.id !== 200)
    },
  })

  // if (!slug || !categories.data) {
  //   return <div>loading</div>
  // }
  const isLoading = !slug || !categories.data
  // if (isLoading || !data) {
  //   return <div>loading...</div>
  // }

  // console.log("data", data)
  // const analyzes = data
  //   .map((product) => {
  //     return {
  //       product: product,
  //       calculated_price: product.variants[0].calculated_price,
  //       original_price: product.variants[0].original_price,
  //       price_type: product.variants[0].calculated_price_type,
  //       percentage_diff: getPercentageDiff(
  //         product.variants[0].calculated_price,
  //         product.variants[0].original_price
  //       ),
  //     }
  //   })
  //   .sort((a, b) => a.product.mid_code - b.product.mid_code)

  console.log("analyzes", categories)
  return (
    // <div className="grid grid-cols-[360px_1fr] gap-x-16 p-1">
    //   <div className="my-4">
    //     <AnalyzesSidebar />
    //   </div>
    //   <div className="">
    //     <div className="grid gap-y-2">
    //       <ListAnalyzes analyzes={analyzes} />
    //     </div>
    //   </div>
    // </div>
    <div className="grid gap-x-16 p-1 md:grid-cols-[360px_1fr]">
      <div className="my-4">
        {!isLoading ? (
          <AnalyzesSidebar data={categories.data} scrollRef={scrollRef} />
        ) : (
          <div className="flex flex-col px-4">
            <div>
              <h4 className="mb-5 text-lg font-semibold text-gray-900">
                Аналізи
              </h4>
              <div className="flex flex-col gap-y-4">
                <Skeleton className="h-5 w-[300px]" />
                <Skeleton className="h-5 w-[300px]" />
                <Skeleton className="h-5 w-[300px]" />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="">
        <div className="grid gap-y-4" ref={scrollRef}>
          {isLoading ? (
            <div className="grid gap-y-4">
              <Card className="min-h-[20px] border border-gray-200 bg-white bg-gradient-to-r from-[hsla(0,0%,100%,.8)] to-[hsla(0,0%,100%,.8)] bg-clip-padding transition ease-hover md:h-[125px]">
                <div className="grid h-full gap-x-6 md:grid-cols-[1fr_150px]">
                  <div className="flex-col items-center gap-x-2 p-4">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="mt-2 h-5 w-[250px]" />
                  </div>
                  <div className="flex h-full items-center p-1">
                    <Skeleton className="m-auto h-24 w-24 rounded-3xl" />
                  </div>
                </div>
              </Card>
              <Card className="min-h-[20px] border border-gray-200 bg-white bg-gradient-to-r from-[hsla(0,0%,100%,.8)] to-[hsla(0,0%,100%,.8)] bg-clip-padding transition ease-hover md:h-[125px]">
                <div className="grid h-full gap-x-6 md:grid-cols-[1fr_150px]">
                  <div className="flex-col items-center gap-x-2 p-4">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="mt-2 h-5 w-[250px]" />
                  </div>
                  <div className="flex h-full items-center p-1">
                    <Skeleton className="m-auto h-24 w-24 rounded-3xl" />
                  </div>
                </div>
              </Card>
              <Card className="min-h-[20px] border border-gray-200 bg-white bg-gradient-to-r from-[hsla(0,0%,100%,.8)] to-[hsla(0,0%,100%,.8)] bg-clip-padding transition ease-hover md:h-[125px]">
                <div className="grid h-full gap-x-6 md:grid-cols-[1fr_150px]">
                  <div className="flex-col items-center gap-x-2 p-4">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="mt-2 h-5 w-[250px]" />
                  </div>
                  <div className="flex h-full items-center p-1">
                    <Skeleton className="m-auto h-24 w-24 rounded-3xl" />
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <ProductList categories={categories.data} slug={slug} />
          )}
        </div>
      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   const { id } = querySchema.parse(context.query);

//   return {
//     props: { id }, // will be passed to the page component as props
//   };
// }

// const getPercentageDiff = (original: number, calculated: number) => {
//   const diff = calculated - original
//   const decrease = (diff / original) * 100
//   const fixed = Math.round(decrease * 1) / 1

//   return fixed
// }

// export async function getServerSideProps() {
//   const categoriesResponse = await fetch(
//     `${MEDUSA_BACKEND_URL}/store/categories`
//   )

//   const response = await categoriesResponse.json()
//   const categoriesData = await response.filter((obj) => obj.id !== 14)

//   // Pass data to the page via props
//   return { props: { categoriesData } }
// }

// export async function getStaticPaths() {
//   const response = await fetch(`${MEDUSA_BACKEND_URL}/store/categories`)
//   const categories = await response.json()

//   return {
//     paths: categories.map((c: Category) => ({
//       params: { slug: c.id.toString() },
//     })),
//     fallback: false, // can also be true or 'blocking'
//   }
// }

// export async function getStaticProps({ params }) {
//   const categoriesResponse = await fetch(
//     `${MEDUSA_BACKEND_URL}/store/categories`
//   )
//   const { products } = await medusaClient.products.list({
//     limit: 1000,
//     currency_code: "uah",
//   })

//   const response = await categoriesResponse.json()
//   const categoriesData = await response
//     .filter((obj) => obj.id !== 14)
//     .map((obj) => {
//       const count = products.filter(
//         (a) => a.metadata?.category?.code === obj.id
//       ).length
//       return { ...obj, count: count }
//     })
//   // console.log("categoriesData", categoriesData)

//   // console.log(params);
//   // получаем все анализы в категории

//   const analyzes = products
//     .filter((analysis: any) => {
//       return analysis.metadata?.category?.code === +params.slug
//     })
//     .map((p, _, array) => {
//       return {
//         product: p,
//         calculated_price: p.variants[0].calculated_price,
//         original_price: p.variants[0].original_price,
//         price_type: p.variants[0].calculated_price_type,
//         percentage_diff: getPercentageDiff(
//           p.variants[0].calculated_price,
//           p.variants[0].original_price
//         ),
//       }
//     })
//     .sort((a, b) => a.product.mid_code - b.product.mid_code)

//   return {
//     props: { analyzes, categoriesData },
//   }
// }

Slug.getLayout = (page: ReactElement) => {
  return <AnalyzesLayout>{page}</AnalyzesLayout>
}

export default Slug
