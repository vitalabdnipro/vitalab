import type { ReactElement } from "react"
import Image from "next/image"
import Link from "next/link"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Section } from "@components/ui"
import { Button, buttonVariants } from "@components/v2/button"
import Head from "@modules/common/components/head"
import { cn } from "@utils/cn"
import { FaTelegram, FaViber } from "react-icons/fa"

const QrCode = () => {
  return (
    <>
      <Head
        title="Про лабораторію - українська медична лабораторія VitaLab"
        description="Медичні лабораторні дослідження у Дніпрі. Понад 400 аналізів. Європейське обладнання та стандарти якості."
      />
      <Section>
        <div className="pb-20 md:pb-32">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-large)`,
              } as React.CSSProperties
            }
          >
            <Breadcrumbs />

            <div>
              <h2 className="mb-8 px-4 text-center text-xl font-normal leading-tight text-gray-900">
                Оберіть мессенджер
              </h2>
              <div
                id="equipment"
                className="grid gap-4 sm:grid-cols-1 md:grid-cols-4"
              >
                <a href="https://t.me/VitaLab_results_bot" className="relative col-start-1 flex min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-black shadow-md md:col-start-2">
                  <div className="flex flex-col items-center p-4">
                    <FaTelegram size={100} className=" w-100 fill-blue-500" />
                    <div className="mt-4 text-xl">Telegram</div>
                  </div>
                </a>
                <a href="viber://pa?chatURI=vitalab_results_bot_chat_bot" className="relative col-start-1 flex min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-black shadow-md md:col-start-3">
                  <div className="flex flex-col items-center p-4">
                    <FaViber size={100} className=" fill-purple-500" />
                    <div className="mt-4 text-xl">Viber</div>
                  </div>
                </a>
                <div className="relative mt-8 flex min-w-full items-center justify-center md:col-span-2 md:col-start-2">
                  <Link
                    href="/faq?id=1"
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    Інструкція
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

QrCode.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default QrCode
