"use client"

import { Suspense } from "react"
import Image from "next/image"
import { notFound, useSearchParams } from "next/navigation"
import { Phone } from "lucide-react"

import { Results } from "~/components/results"
import logo from "/public/vitalab-logo.svg"

export default function Order({ params }: { params: { order: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {/* <Results2 /> */}

      <div className="m-auto w-full py-4 md:w-3/6 md:py-9">
        <div className="flex flex-col">
          <Image
            src={logo}
            alt="Logo"
            className="mx-auto mb-4 h-[30px] w-fit md:h-[40px]"
          />
          <h2 className="text-center text-sm md:mb-16 md:block md:text-base">
            Результати досліджень зберігаються протягом 30 днів після виконання
          </h2>
        </div>
        <Results />
        <div className="mt-16 flex flex-col items-center justify-center text-xs">
          <div className="font-semibold">Для отримання архівних результатів зателефонуйте</div>
          <div className="flex gap-2">
            <div className="flex items-center gap-2">              
              <a href="tel:+380673105227">(067) 310-52-27</a>
            </div>
            <div className="flex items-center gap-2">             
              <a href="tel:+380632510338">(063) 251-03-38</a>
            </div>
            <div className="flex items-center gap-2">             
              <a href="tel:+380503607575">(050) 360-75-75</a>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  )
}
