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

  const isLoading = !slug || !categories.data

  console.log("analyzes", categories)
  return (
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

Slug.getLayout = (page: ReactElement) => {
  return <AnalyzesLayout>{page}</AnalyzesLayout>
}

export default Slug
