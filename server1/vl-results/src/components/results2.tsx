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

// import { fetcher } from "~/utils/fetcher";

// // const sendRequest = async (args) => {
// //   // console.log("11s",args)
// //   const [url, obj] = args
// //   console.log ("a", obj)

// //   // console.log("args", arg);
// //   const response = await fetch(
// //     "http://mirthOUT.vitalab.com.ua:55080/results/get_by_order_num",
// //     {
// //       method: "POST",
// //       headers: {
// //         token: "3cf9db27be144476b963e54889c1f127",
// //         "Content-Type": "application/json",
// //         // Accept: "application/json",
// //       },
// //       body: JSON.stringify({
// //         num: "555000000131",
// //         phone: null,
// //       }),
// //     }
// //   );

async function fetcher(key) {
  const [url, params] = key

  const queryParams = new URLSearchParams(params)
  const urlWithParams = `${url}?${queryParams.toString()}`

  const res = await fetch(urlWithParams)

  return res.json()
}

export function Results2() {
  const { phone } = useAtomValue(phoneAtom)
  const number = useAtomValue(orderAtom)
  const [isForms, setIsForms] = useState(false)  
  const { data, error, isLoading } = useSWR(
    ["/api/order", { phone: phone, num: number }],
    // ["/api/order", { phone: "+380958493258", num: "555000009053" }],
    fetcher
  )

  /* if (!number) {
    notFound()
  }*/
  
  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  if (data.status === "failed") {
    console.log("frms",data)
    return <div>Результати досліджень по замовленню #{number} не знайдено.</div>
  }

  const forms = data.data[0].forms.filter((form) => form.status === "created")

  console.log("rms", data.data[0])

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
    link.download = `${number}-vitalab.pdf`
    link.click()
  }

  return (
    <div className="px-1">
      <div className="mb-4 flex h-16 flex-col items-center justify-between sm:h-10 sm:flex-row">
        <div className="font-semibold">Замовлення #{number}</div>
        <div className="w-full sm:w-fit">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleDownloadPdf}
            disabled={forms.length <= 0}
          >
            <span className="text-xss relative z-[1] flex items-center justify-center space-x-1.5">
              <Download className="h-4 w-4" />
              <span>Завантажити результати</span>
            </span>
          </Button>
        </div>
      </div>
      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="rounded-l-md border-y border-l border-gray-200 bg-gray-100 px-4 py-2 text-left text-xs text-black">
                Код
              </th>
              <th className="border-y border-gray-200 bg-gray-100 px-4 py-2 text-left text-xs text-black">
                Назва
              </th>
              <th className="rounded-r-md border-y border-r border-gray-200 bg-gray-100 px-4 py-2 text-left text-xs text-black">
                Статус
              </th>
            </tr>
          </thead>
          <tbody>
            {flattenedArray.map((form) => (
              // <div
              //   key={form.test.code}
              //   className="grid grid-cols-[50px_1fr_100px] items-center text-xs"
              // >
              //   <div className="text-neutral-400">{form.test.code}.</div>
              //   <div
              //     className={cn("mr-6 text-xs text-black", {
              //       "line-through": form.status === "no file",
              //     })}
              //   >
              //     {form.test.name}
              //   </div>
              //   <div className="relative mr-1 flex min-w-[1px] max-w-full flex-1 flex-col items-end justify-start">
              //     <StatusDot status={form.test.status} label />
              //   </div>
              // </div>
              <tr key={form.test.code} className="text-xs">
                <td
                  className={cn("w-[5%] whitespace-nowrap rounded-l p-0", {
                    "line-through": form.status === "no file",
                  })}
                >
                  <div className="relative flex items-center space-x-1 py-2 pl-4">
                    {form.test.code}
                  </div>
                </td>
                <td
                  className={cn(
                    "w-4/5 whitespace-nowrap p-0 sm:whitespace-normal",
                    {
                      "line-through": form.status === "no file",
                    }
                  )}
                >
                  <div className="px-4 py-3">{form.test.name}</div>
                </td>
                <td className="w-[15%] rounded-r">
                  <div className="px-4 py-3">
                    <StatusDot
                      status={
                        form.status === "no file" ? "no file" : form.test.status
                      }
                      label
                    />
                  </div>
                </td>
              </tr>
            ))}
            {/* <td className="w-1/6 whitespace-nowrap rounded-l p-0">
              <div className="relative flex items-center space-x-1 py-2 pl-4 text-sm">
                test
              </div>
            </td>
            <td className="w-1/2 whitespace-nowrap p-0">test</td>
            <td className="w-1/6 rounded-r text-right">test</td> */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
