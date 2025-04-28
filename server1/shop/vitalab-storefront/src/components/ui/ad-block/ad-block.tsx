import Image from "next/image"
import Link from "next/link"
import { Button, Card, Section } from "@components/ui"

// import s from "./ad-block.module.css"
import qrCode from "/public/qr-code.svg"

export function AdBlock() {
  return (
    <Section>
      <div className="pb-20 pt-16">
        <div
          className="section__row-layout"
          style={
            {
              "--row-layout-gap": `var(--row-layout-gap-normal)`,
            } as React.CSSProperties
          }
        >
          {/* AlignedSideBySideLayout */}
          <div className="grid gap-y-8 sm:grid-cols-2 sm:gap-y-12">
            {/* AlignedSideBySideLayout__block AlignedSideBySideLayout__block--left */}
            <Card className="h-full bg-white sm:mr-4" shadow="medium">
              <div className="grid h-full sm:grid-cols-auto-fit">
                <div className="flex flex-col items-start justify-center gap-y-2.5 p-8">
                  <p className="leading-[1.3846153846] text-gray-900">
                    Отримай знижку, замовляючи онлайн
                  </p>
                  <Link href="/analyzes/11">
                    <Button variant="link" className="text-[#0a2540]">
                      Замовити
                    </Button>
                  </Link>
                </div>
                <div className="grid items-stretch justify-items-stretch gap-1 p-1 sm:pl-0">
                  <div className="relative flex min-h-[180px] items-center justify-center rounded bg-gray-100 p-3 text-slate-900">
                    <div className="grid justify-items-center gap-y-1 text-center">
                      <h2 className="text-3xl font-bold">-10%</h2>
                      <span className="text-m leading-[1.5]">
                        на всі дослідження
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="h-full bg-white sm:ml-4" shadow="medium">
              <div className="grid h-full sm:grid-cols-auto-fit">
                <div className="flex flex-col items-start justify-center gap-y-2.5 p-8">
                  <h2 className="text-[16px] font-bold leading-[1.3846153846] tracking-normal text-gray-900">
                    Результати у смартфоні
                  </h2>
                  <div className="text-s font-normal leading-[1.6] text-[#425466]">
                    Отримуй результати аналізів у Viber або Telegram
                  </div>
                  <Link
                    href={{
                      pathname: "/faq",
                      query: {
                        id: "1",
                      },
                    }}
                  >
                    <Button variant="link" className="text-[#0a2540]">
                      Інструкція
                    </Button>
                  </Link>
                </div>
                <div className="grid items-stretch justify-items-stretch gap-1 p-1 sm:pl-0">
                  <div className="relative flex max-h-[180px] min-h-[180px] items-center justify-center rounded bg-gray-100 p-3 text-slate-900">
                    <div className="grid justify-items-center gap-y-1 text-center">
                      {/* <Image src={qrCode} alt="qr-code" height={165} /> */}
                      <Image src="/qr-code.png" alt="qr-code" height={165} width={165}/>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Section>
  )
}
