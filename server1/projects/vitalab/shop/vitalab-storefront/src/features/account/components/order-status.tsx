import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"
import { pdfMerge } from "@utils/pdf-merge"
import { Download, ExternalLink } from "lucide-react"

export const OrderStatus = ({
  order,
  isReady,
}: {
  order: any
  isReady: boolean
}) => {
  //   const isReady = order?.data[0]?.forms.every(
  //     (form: any) => form.status === "created"
  //   )

  const handleOpenPdf = async () => {
    const mergedPdfBlob = await pdfMerge(order?.data[0]?.forms) // assuming forms is an array of PDF forms
    const url = URL.createObjectURL(mergedPdfBlob)

    const link = document.createElement("a")
    link.href = url
    link.target = "_blank"
    link.rel = "noopener noreferrer" // required for security
    // link.download = `${number}-vitalab.pdf`
    link.click()
  }

  return isReady ? (
    <button
      className="initial:border-none group relative inline-flex h-8 w-full shrink-0 transform-gpu touch-none select-none items-center justify-center rounded-md bg-white px-4 text-[13.01px] font-semibold text-gray-900 shadow-[0px_1px_1px_-1px_rgb(0_0_0_/_0.08),_0px_2px_2px_-1px_rgb(0_0_0_/_0.08),_0px_0px_0px_1px_rgb(0_0_0_/_0.06),_inset_0px_1px_0px_#fff,_inset_0px_1px_2px_1px_#fff,_inset_0px_1px_2px_rgb(0_0_0_/_.06),_inset_0px_-4px_8px_-4px_rgb(0_0_0_/_0.04)] outline-none transition before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded before:bg-gradient-to-b before:from-white/[0.08] before:opacity-0 before:transition-opacity after:pointer-events-none after:absolute after:inset-[-3px] after:rounded-lg after:border after:border-blue-500 after:opacity-0 after:ring-2 after:ring-blue-500/20 after:transition-opacity hover:before:opacity-100 focus:!outline-none focus:!ring-0 focus-visible:after:opacity-100 active:!outline-none active:!ring-0 active:after:opacity-0 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_0px_0.5px_rgb(0_0_0_/_0.40),_0px_1px_1px_-1px_rgb(0_0_0_/_0.12),_0px_2px_2px_-1px_rgb(0_0_0_/_0.12),_inset_0px_0.5px_0px_rgb(255_255_255_/_0.06),_inset_0px_0px_1px_0px_rgb(255_255_255_/_0.16),_inset_0px_-6px_12px_-4px_rgb(0_0_0_/_0.16)] dark:hover:before:opacity-50 [&>span]:drop-shadow-[0px_1px_0px_rgb(255_255_255)] dark:[&>span]:drop-shadow-[0px_1px_1px_rgb(0_0_0_/_0.6)]"
      data-state="closed"
      onClick={handleOpenPdf}
    >
      <span className="relative z-[2] flex items-center gap-1.5">
        {/* <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </span> */}
        Переглянути результати <ExternalLink className="h-4 w-4" />
      </span>
    </button>
  ) : (
    <div className="initial:border-none relative inline-flex h-8 w-full shrink-0 transform-gpu touch-none select-none items-center justify-center rounded-md bg-white px-4 text-[13.01px] font-semibold text-gray-900 shadow-[0px_1px_1px_-1px_rgb(0_0_0_/_0.08),_0px_2px_2px_-1px_rgb(0_0_0_/_0.08),_0px_0px_0px_1px_rgb(0_0_0_/_0.06),_inset_0px_1px_0px_#fff,_inset_0px_1px_2px_1px_#fff,_inset_0px_1px_2px_rgb(0_0_0_/_.06),_inset_0px_-4px_8px_-4px_rgb(0_0_0_/_0.04)] outline-none transition before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:rounded before:bg-gradient-to-b before:from-white/[0.08] before:opacity-0 before:transition-opacity after:pointer-events-none after:absolute after:inset-[-3px] after:rounded-lg after:border after:border-blue-500 after:opacity-0 after:ring-2 after:ring-blue-500/20 after:transition-opacity hover:before:opacity-100 focus:!outline-none focus:!ring-0 focus-visible:after:opacity-100 active:!outline-none active:!ring-0 active:after:opacity-0 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_0px_0.5px_rgb(0_0_0_/_0.40),_0px_1px_1px_-1px_rgb(0_0_0_/_0.12),_0px_2px_2px_-1px_rgb(0_0_0_/_0.12),_inset_0px_0.5px_0px_rgb(255_255_255_/_0.06),_inset_0px_0px_1px_0px_rgb(255_255_255_/_0.16),_inset_0px_-6px_12px_-4px_rgb(0_0_0_/_0.16)] dark:hover:before:opacity-50 [&>span]:drop-shadow-[0px_1px_0px_rgb(255_255_255)] dark:[&>span]:drop-shadow-[0px_1px_1px_rgb(0_0_0_/_0.6)]">
      Дослідження обробляється
    </div>
  )
}
