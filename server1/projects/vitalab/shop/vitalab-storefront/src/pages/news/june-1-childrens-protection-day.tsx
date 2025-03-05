import type { ReactElement } from "react"
import { AddCartButton } from "@components/atoms/add-cart-button"
import { Layout } from "@components/common"
import { Breadcrumbs, Button, Card, Heading, Section } from "@components/ui"

const PostPage = ({ data }) => {
  console.log("data", data)
  return (
    <Section>
      <div className="pb-32">
        <Breadcrumbs />
        <div className="gap-y-6 md:grid md:grid-cols-4 md:gap-y-12 md:grid-areas-newsLayout">
          {/* <div
          className="section__row-layout"
          style={
            {
              "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
            } as React.CSSProperties
          }
        > */}

          <header className="col-span-3 mt-12 grid w-full max-w-[810px] gap-y-6 md:grid-in-hero">
            <Heading variant="heading">1 червня – День захисту дітей</Heading>
            <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 30 червня 2023 р.</p>
            </div>
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              31 травня 2023 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Спеціальна пропозиція від VitaLab до міжнародного дня захисту
                дітей – знижка 15% на комплекси лабораторних досліджень для
                малюків і школярів. Нехай Ваші діти ростуть здоровими!
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Пакет 02037 «Здорова дитина» (загальний аналіз крові,
                  загальний аналіз сечі, глюкоза, зішкріб на ентеробіоз,
                  дослідження калу на яйця глистів)
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 625 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету - 531 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSD7PB8Y59B0AHD641FG" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Пакет 02129 «Залишайся здоровим – для дітей» (загальний аналіз
                  крові, глюкоза, кальцій іонізований, С-реактивний білок,
                  загальний вітамін D)
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 855 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету - 727 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSD9FQ5M7SZ9Y89YKS13" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Пакет 02107 «Надлишкова вага (дитячий)» (загальний аналіз
                  крові, загальний аналіз сечі, глюкоза, глікований гемоглобін,
                  Т4, ТТГ, пролактин, лептин)
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1513 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету - 1286 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSD4K5WXPXWWTRJFFBSW" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Пакет 02094 «До школи – без ризику (базовий)» (загальний
                  аналіз крові, загальний аналіз сечі, С-реактивний білок,
                  антиген лямблії у калі, дослідження калу на яйця глистів)
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 830 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету - 706 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSD6RVCNTPXKN7J1F2S2" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Пакет 02093 «Сімпл-Дімпл» (загальний аналіз крові, загальний
                  аналіз сечі, кальцій, залізо, С-реактивний білок, ТТГ,
                  загальний вітамін D, антиген лямблії у калі, дослідження калу
                  на яйця глистів)
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1540 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету - 1309 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSD2MTRG4702NSVYFDA5" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акційна ціна не враховує вартість забору біоматеріалу.
            </p>
            <p className="px-4 text-m">
              Додаткова інформація за телефонами:
              <a
                className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
                href="tel:+380673105227"
              >
                (067) 310-52-27,
              </a>
              <a
                className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
                href="tel:+3800503607575"
              >
                (050) 360-75-75
              </a>
              ,
              <a
                className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
                href="tel:+380632510338"
              >
                (063) 251-03-38
              </a>
            </p>
          </section>
        </div>
      </div>
    </Section>
  )
}

PostPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default PostPage
