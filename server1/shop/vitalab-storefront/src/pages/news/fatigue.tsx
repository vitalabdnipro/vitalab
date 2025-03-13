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
              НЕМАЄ СИЛ? ПЕРЕВІРТЕ, ЧИ ВСЬОГО ВИСТАЧАЄ
            </Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 01.04.2024 р. по 31.05.2024 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              01.03.2025
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Відчуваєте апатію, виснаженість або емоційні гойдалки? Вам
                складно зосередитись? Шкіра суха, а волосся ламке? Часто
                хворієте? Все це може бути симптомами зниження імунітету і
                нестачі в організмі важливих вітамінів та мікроелементів. На
                фоні стресу та після зими дуже важливо контролювати показники,
                дефіцит яких критично впливає на Ваше самопочуття та роботу усіх
                систем організму. Пропонуємо у березні доступну комплексну
                перевірку на причини хронічної втоми та дефіцитні стани із
                привабливою знижкою 20%!
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02151 Пакет "Хронічна втома"</span>
                <ul>
                  <li>
                    • Вітамін D (25-ОН-D), залізо, магній, глюкоза, тиреотропний
                    гормон (TSH, ТТГ), феритин, цинк, аналіз крові загальний,
                    кальцій іонізований
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 2362 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 1890 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01J8FC281HRZ6WF4X5H5ARRD3E" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02178 Check-up "Дефіцитні стани"</span>
                <ul>
                  <li>
                    • Вітамін D (25-ОН-D), аналіз крові загальний, вітамін B12,
                    загальний білок, кальцій іонізований, тиреотропний гормон
                    (TSH, ТТГ), феритин
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 2040 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 1632 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01JKGBCMMC85NWB8Z4TN5PJWR9" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02099 Пакет "Вітаміни та мінерали"</span>
                <ul>
                  <li>
                    • Вітамін D (25-ОН-D), вітамін B12, вітамін B9, залізо,
                    кальцій іонізований, магній, мідь, феритин, фосфор, цинк
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 2745 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 2196 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BSDVQ8B9TWVVJE15WPF0" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення досліджень на сайті з 01.03.2025 р.
              по 31.03.2025 р. Акційна ціна не враховує вартість забору
              біоматеріалу. Знижки за різними акційними пропозиціями не
              підсумовуються.
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
