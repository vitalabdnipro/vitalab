import React, { type ReactElement } from "react"
import Image from "next/image"
import { Layout } from "@components/common"
import { Breadcrumbs, Section } from "@components/ui"
import Head from "@modules/common/components/head"

const Partners = () => {
  return (
    <>
      <Head
        title="Партнери - українська медична лабораторія VitaLab"
        description="Медичні лабораторні дослідження у Дніпрі. Понад 400 аналізів. Європейське обладнання та стандарти якості."
      />
      <Section>
        <div className="pb-20 md:mt-0 md:pb-32">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-small)`,
              } as React.CSSProperties
            }
          >
            <Breadcrumbs title="Партнери" />
            <div className="relative md:mt-20">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="relative flex min-w-full items-center justify-center overflow-hidden rounded-lg bg-white p-8 text-white shadow-md transition hover:-translate-y-2 hover:shadow-xl">
                  <div className="m-1">
                    <Image src="/partners/arx.jpg" fill={true} alt="ARX" />
                  </div>
                </div>
                <div className="relative flex min-w-full items-center justify-center overflow-hidden rounded-lg bg-white p-8 text-white shadow-md transition hover:-translate-y-2 hover:shadow-xl">
                  <div className="m-1">
                    <Image
                      src="/partners/vuso.png"
                      alt="VUSO"
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
                <div className="relative flex min-w-full items-center justify-center overflow-hidden rounded-lg bg-white p-8 text-white shadow-md transition hover:-translate-y-2 hover:shadow-xl">
                  <Image
                    src="/partners/lg.png"
                    width={190}
                    height={300}
                    alt="LG"
                  />
                </div>
                <div className="relative flex min-w-full items-center justify-center overflow-hidden rounded-lg bg-white p-8 text-white shadow-md transition hover:-translate-y-2 hover:shadow-xl">
                  <Image
                    src="/partners/universalna.png"
                    alt="Universalna"
                    height={300}
                    width={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

Partners.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Partners
