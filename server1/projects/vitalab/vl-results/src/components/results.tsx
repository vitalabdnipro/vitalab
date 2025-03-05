"use client"

import { useState } from "react"
import { notFound } from "next/navigation"
import { useAtom, useAtomValue } from "jotai"
import { Download } from "lucide-react"
import PDFMerger from "pdf-merger-js/browser"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { orderAtom, phoneAtom } from "~/atoms"
import { cn } from "~/utils/cn"
import { pdfMerge } from "~/utils/pdf-merge"

import { StatusDot } from "~/components/status"
import { Button } from "./ui"

async function fetcher(key) {
  const [url, params] = key

  const queryParams = new URLSearchParams(params)
  const urlWithParams = `${url}?${queryParams.toString()}`

  const res = await fetch(urlWithParams)

  return res.json()
}

export function Results() {
  const { phone } = useAtomValue(phoneAtom)
  const number = useAtomValue(orderAtom)
  const [isForms, setIsForms] = useState(false)
  const { data, error, isLoading } = useSWR(
    ["/api/order", { phone: phone, num: number }],
    // ["/api/order", { phone: "+380958493258", num: "555000009053" }],
    fetcher
  )

  if (!number) {
    notFound()
  }

  if (isLoading || !data) {
    return <div>Завантаження...</div>
  }

  if (data.status === "failed") {
    console.log("frms", data)
    return <div>Результати досліджень по замовленню #{number} не знайдено.</div>
  }

  const forms = data.data[0].forms.filter((form) => form.status === "created")

  console.log("forms", data.data[0])

  const flattenedArray = data.data[0].forms.reduce((acc, curr) => {
    const form = curr

    return acc.concat(
      curr.tests.map((test) => ({
        test,
        // content: form.content,
        status: form.status,
      }))
    )
  }, [])

  const handleDownloadPdf = async () => {
    const mergedPdfBlob = await pdfMerge(forms) // assuming forms is an array of PDF forms
    const url = URL.createObjectURL(mergedPdfBlob)

    const link = document.createElement("a")
    link.href = url
    link.target = "_blank"
    link.rel = "noopener noreferrer" // required for security
    // link.download = `${number}-vitalab.pdf`
    link.click()
  }

  return (
    <>
      <div className="my-4 flex h-16 flex-col items-center justify-between sm:h-10 sm:flex-row">
        <div>
          Замовлення <span className="font-semibold">#{number}</span>
        </div>
        <div className="w-full sm:w-fit">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleDownloadPdf}
            disabled={forms.length <= 0}
          >
            <span className="text-xs relative z-[1] flex items-center justify-center space-x-1.5">
              <Download className="h-4 w-4" />
              <span>Завантажити результати</span>
            </span>
          </Button>
        </div>
      </div>
      <div className="mb-2 hidden w-full grid-cols-[50px_1fr_100px] gap-4 rounded-md bg-gray-50 px-4 py-3 text-sm font-semibold shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] md:grid">
        <div>Код</div>
        <div>Назва</div>
        <div>Статус</div>
      </div>
      {flattenedArray.map((form) => {
        return (
          <div
            key={form.test.code}
            className="ml-2 grid w-full grid-cols-[10px_1fr] items-center gap-2 py-3 text-xs md:ml-0 md:grid md:grid-cols-[50px_1fr_100px] md:gap-4 md:px-4 md:text-sm"
          >
            <div
              className={cn("hidden md:inline", {
                "line-through": form.status === "no file",
              })}
            >
              {form.test.code}
            </div>
            <div
              className={cn("order-2 flex items-end", {
                "line-through": form.status === "no file",
              })}
            >
              <p className="line-clamp-2">{form.test.name}</p>
              <span className="ml-2 text-gray-500 md:hidden">
                #{form.test.code}
              </span>
            </div>
            <div className="order-1 flex items-center md:order-3">
              <StatusDot
                status={ form.status }
                label
              />
            </div>
          </div>
        )
      })}
    </>
  )
}
