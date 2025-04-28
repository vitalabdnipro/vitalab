import type { ReactElement } from "react"
import Image from "next/image"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Section } from "@components/ui"
import Head from "@modules/common/components/head"

import a15 from "../../public/img/A15.jpg"
import ba400 from "../../public/img/BA400.jpg"
import dynexDs2 from "../../public/img/DynexDS2.jpg"
import elite3 from "../../public/img/ELite3.jpg"
import humaclot from "../../public/img/humaclot.jpg"
import immulite2000xpi from "../../public/img/immulite-2000xpi.png"
import microscope from "../../public/img/microscope.jpg"
import sysmexXN550 from "../../public/img/sysmex_XN_550.jpg"
import terraLab from "../../public/img/terralab.png"
import makagon from "../../public/makagon_i.jpg"

const About = () => {
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
            <Breadcrumbs title="Обладнання" />
            <div>
              <h2 className="mb-6 px-4 text-xl font-normal leading-tight text-gray-900">
                Устаткування, яке використовується в лабораторії Vitalab
              </h2>

              <div
                id="equipment"
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
              >
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src={sysmexXN550}
                      alt=""
                      height={220}
                      className="absolute left-[50%] top-[45%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор гематологічний Sysmex XN-550 (SYSMEX, Японія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/elite-5.png"
                      alt=""
                      height={220}
                      width={220}
                      className="absolute left-[50%] top-[35%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор гематологічний Elite5 (Erba Lachema / Чехія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/alifax.jpg"
                      alt=""
                      height={180}
                      width={180}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Автоматичний аналізатор ШОЕ Alifax Roller 20 pn (Alifax,
                      Італія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/urised.png"
                      alt=""
                      height={250}
                      width={250}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор осаду сечі UriSed mini (Elektronika, Венгрія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/ismart.jpg"
                      alt=""
                      height={150}
                      width={150}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор електролітів i-Smart 30 PRO (i-SENS, Корея)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/coag.jpg"
                      alt=""
                      height={200}
                      width={200}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Автоматичний коагулометр COAG M (Diagon, Угорщина)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/Immulite.jpg"
                      alt=""
                      height={230}
                      width={230}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Аналізатор імунохемілюмінесцентний автоматичний Immulite
                      2000 XPi (Siemens, США)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/cobas.png"
                      alt=""
                      height={220}
                      width={220}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Імунохімічний аналізатор Roche Cobas e 411 (Roche,
                      Франція)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/exl.png"
                      alt=""
                      height={230}
                      width={230}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Біохімічний аналізатор Dimension EXL 200 (Siemens, США)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/BA400.jpg"
                      alt=""
                      height={150}
                      width={150}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Автоматичний біохімічний аналізатор ВА 400 (Biosystems,
                      Іспанія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/qb.png"
                      alt=""
                      height={300}
                      width={300}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Імунохроматографічний аналізатор Quantum Blue® (BÜHLMANN,
                      Швейцарія)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/aspect.png"
                      alt=""
                      height={270}
                      width={270}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Експрес-аналізатор ASPECT Plus ST2 (Critical Diagnostics
                      (USA)
                    </div>
                  </div>
                </div>
                <div className="relative flex h-[290px] min-w-full items-center justify-center overflow-hidden rounded-lg bg-white text-white shadow-md">
                  <div className="h-full w-full p-6">
                    <Image
                      src="/i/star.png"
                      alt=""
                      height={270}
                      width={270}
                      className="absolute left-[50%] top-[42%] -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className="absolute bottom-6 left-6 text-s font-medium text-slate-900">
                      Мікроскоп Primo Star (Carl Zeiss, Німеччина)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

About.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default About
