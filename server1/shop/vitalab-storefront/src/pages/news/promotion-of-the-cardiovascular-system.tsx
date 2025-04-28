import type { ReactElement } from "react"
import { AddCartButton } from "@components/atoms/add-cart-button"
import { Layout } from "@components/common"
import { Breadcrumbs, Button, Card, Heading, Section } from "@components/ui"

const PostPage = () => {
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
            <Heading variant="heading">
              З’ясуйте стан серця та судин зі знижкою 15%!
            </Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 31 вересня 2023 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              16 жовтня 2023 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Скажений ритм, постійні стреси, поганий сон, шкідливі звички,
                перекуси та малорухливий спосіб життя – це все чинники, які
                можуть провокувати порушення в роботі серця.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Пройдіть обстеження стану серцево-судинної системи – здайте
                аналізи зі знижкою -15%:
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card className="bg-white" shadow="small">
                <div className="flex h-full w-full flex-col justify-between p-6">
                  <p className="text-center">
                    Аналіз крові загальний (автоматизований з лейкоформулою)
                  </p>
                  <div className="mt-10 grid items-center gap-6 md:grid-cols-[1fr]">
                    <div className="flex justify-end">
                      <AddCartButton id="prod_01H3C3BQAT3DTXWMYWPJ74PJYX" />
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="bg-white" shadow="small">
                <div className="flex h-full w-full flex-col justify-between p-6">
                  <p className="text-center">Глюкоза</p>
                  <div className="mt-10 grid items-center gap-6 md:grid-cols-[1fr]">
                    <div className="flex justify-end">
                      <AddCartButton id="prod_01H3C3BR5ED9NN8GY3Z8JTTJ56" />
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="bg-white" shadow="small">
                <div className="flex h-full w-full flex-col justify-between p-6">
                  <p className="text-center">Гомоцистеїн</p>
                  <div className="mt-10 grid items-center gap-6 md:grid-cols-[1fr]">
                    <div className="flex justify-end">
                      <AddCartButton id="prod_01H3C3BQX1NCQAB3ZPDHAHRW0H" />
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="bg-white" shadow="small">
                <div className="flex h-full w-full flex-col justify-between p-6">
                  <p className="text-center">С-реактивний білок (CRP)</p>
                  <div className="mt-10 grid items-center gap-6 md:grid-cols-[1fr]">
                    <div className="flex justify-end">
                      <AddCartButton id="prod_01H3C3BR514HF2261K6G6YXPP2" />
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="bg-white" shadow="small">
                <div className="flex h-full w-full flex-col justify-between p-6">
                  <p className="text-center">Магній</p>
                  <div className="mt-10 grid items-center gap-6 md:grid-cols-[1fr]">
                    <div className="flex justify-end">
                      <AddCartButton id="prod_01H3C3BRVP0S2TC47RFAK4CN8V" />
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="bg-white" shadow="small">
                <div className="flex h-full w-full flex-col justify-between p-6">
                  <p className="text-center">Вітамін B12 (ціанокобаламін)</p>
                  <div className="mt-10 grid items-center gap-6 md:grid-cols-[1fr]">
                    <div className="flex justify-end">
                      <AddCartButton id="prod_01H3C3BQ91VAPKP0WNTQEHJTG6" />
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="bg-white" shadow="small">
                <div className="flex h-full w-full flex-col justify-between p-6">
                  <p className="text-center">
                    Ліпідограма (холестерин загальний, тригліцериди, ЛПВЩ, ЛПНЩ,
                    ЛПДНЩ, коефіцієнт атерогенності)
                  </p>
                  <div className="mt-10 grid items-center gap-6 md:grid-cols-[1fr]">
                    <div className="flex justify-end">
                      <AddCartButton id="prod_01H3C3BQWAFHT838AGNZZVKJM9" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <p className="px-4 text-s">
              Акція діє за умови замовлення дослідження на сайті до 31 жовтня
              2023 р. <br /> Акційна ціна не враховує вартість забору
              біоматеріалу.
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
            <p className="px-4 text-m">
              Піклуйтеся про своє здоров’я разом із VitaLab!
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
