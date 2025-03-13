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
              29 жовтня - Всесвітній день боротьби з інсультом.
            </Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 31 вересня 2023 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              26 жовтня 2023 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Метою цього дня є привернення уваги до проблеми інсультів:
                питань профілактики, своєчасної діагностики, звернення за
                медичною допомогою та нових можливостей лікування.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Інсульт - це гостре порушення мозкового кровообігу, що спричиняє
                ушкодження тканин мозку і розлади його функцій
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                За даними Всесвітньої організації охорони здоров'я, щороку в
                Україні фіксують близько 150 тисяч інсультів. 90% випадків
                обумовлені певними факторами ризику, на які можна впливати.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Робимо свій внесок у боротьбу з інсультом! З 27.10 до 05.11
                пропонуємо знижку 20% на три показники:{" "}
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 180 «D-димер»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 225 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 180 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQWPTW60TQ6Z8QTM2M99" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 103 «Коагулограма»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 360 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 288 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQHZT87AMP82MQV8XR2T" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Код 370 «Підрахунок числа тромбоцитів (по Фоніо)»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 110 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 88 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQAA4GTANDJZWXKNY311" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-sm">
              Додатково до замовлення цих показників кожен пацієнт отримує у
              ПОДАРУНОК* аналіз на загальний холестерин.
              <br />
              Не дамо інсульту жодного шансу!
            </p>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення досліджень на сайті з 27 жовтня до
              05 листопада 2023 р. Під подарунком мається на увазі виконання
              дослідження за 1 грн.
              <br /> Акційна ціна не враховує вартість забору біоматеріалу.
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
