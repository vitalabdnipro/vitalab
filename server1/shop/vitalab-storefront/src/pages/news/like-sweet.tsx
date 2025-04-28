import type { ReactElement } from "react"
import { AddCartButton } from "@components/atoms/add-cart-button"
import { ContactInfo, Layout } from "@components/common"
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
              ПЕРЕВІРТЕ СВІЙ ВУГЛЕВОДНИЙ ОБМІН
            </Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 01.04.2024 р. по 31.05.2024 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              01.04.2024
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Вуглеводний обмін - це ланцюжок процесів в організмі, завдяки
                якому клітини забезпечуються енергією, відбувається синтез та
                розпад глікогену, формуються структури, що виконують захисні та
                інші специфічні функції.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Збій метаболізму вуглеводів негативно впливає на весь організм і
                може призводити до цукрового діабету, серйозних ендокринних
                захворювань, патологій печінки та нирок, порушення роботи
                нервової, імунної, серцево-судинної системи.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Перевірте основні показники вуглеводного обміну зі знижкою 25%!
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Код 02138 Пакет "Скринінг вуглеводного обміну"
                </span>
                <ul>
                  <li>• Глюкоза </li>
                  <li>• Інсулін </li>
                  <li>• Глікозильований гемоглобін (HbA1c) </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 670 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 503 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01HT5DASZ3SDR8TY9ABXKVAWA9" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення пакету досліджень на сайті з
              01.04.2024 р. по 31.05.2024 р. Акційна ціна не враховує вартість
              забору біоматеріалу. Знижки за різними акційними пропозиціями не
              підсумовуються.
            </p>
            <ContactInfo />
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
