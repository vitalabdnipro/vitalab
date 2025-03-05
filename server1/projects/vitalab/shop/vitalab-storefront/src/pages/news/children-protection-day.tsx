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
              1 ЧЕРВНЯ – МІЖНАРОДНИЙ ДЕНЬ ЗАХИСТУ ДІТЕЙ
            </Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 01.04.2024 р. по 31.05.2024 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              31.05.2024
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                1 червня - чудове свято радості та надії.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Діти - наше майбутнє. Вони - здійснення наших мрій та очікувань.
                Немає більшого щастя у світі, ніж посмішка дитини.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Ми хочемо, щоб діти росли здоровими і щасливими!
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Саме тому, з турботою про зростаюче покоління, ми розробили
                комплексні обстеження спеціально для малечі та підлітків, і
                пропонуємо протягом всього червня перевірити здоров’я вашої
                дитини зі знижкою -25%
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02037 Пакет "Здорова дитина"</span>
                <ul>
                  <li>
                    • Аналіз крові загальний (автоматизований з лейкоформулою)
                  </li>
                  <li>• Загальний аналіз сечі (з мікроскопією осаду)</li>
                  <li>• Глюкоза </li>
                  <li>• Зішкріб на ентеробіоз</li>
                  <li>• Глюкоза </li>
                  <li>• Дослідження калу на яйця глистів</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 806 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 605 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BSD7PB8Y59B0AHD641FG" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  02094 Пакет "До школи - без ризику (базовий)"
                </span>
                <ul>
                  <li>
                    • Аналіз крові загальний (автоматизований з лейкоформулою)
                  </li>
                  <li>• Дослідження калу на яйця глистів</li>
                  <li>• Загальний аналіз сечі (з мікроскопією осаду)</li>
                  <li>• Лямблія (Giardia lamblia), антиген в калі</li>
                  <li>• С-реактивний білок (CRP)</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 959 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 719 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BSD6RVCNTPXKN7J1F2S2" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  02129 Пакет "Залишайся здоровим - для дітей"
                </span>
                <ul>
                  <li>
                    • Аналіз крові загальний (автоматизований з лейкоформулою)
                  </li>
                  <li>• Глюкоза </li>
                  <li>• Кальцій іонізований</li>
                  <li>• С-реактивний білок (CRP)</li>
                  <li>• 25-гідроксікальциферол (25-ОН-D)</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 1080 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 810 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BSD9FQ5M7SZ9Y89YKS13" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02093 Пакет "Сімпл-Дімпл"</span>
                <ul>
                  <li>
                    • Аналіз крові загальний (автоматизований з лейкоформулою)
                  </li>
                  <li>• Загальний аналіз сечі (з мікроскопією осаду)</li>
                  <li>• Кальцій</li>
                  <li>• Залізо</li>
                  <li>• С-реактивний білок (CRP)</li>
                  <li>• Тиреотропний гормон (TSH, ТТГ)</li>
                  <li>• 25-гідроксікальциферол (25-ОН-D)</li>
                  <li>• Лямблія (Giardia lamblia), антиген в калі</li>
                  <li>• Дослідження калу на яйця глистів</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 1840 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 1380 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BSD2MTRG4702NSVYFDA5" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  02107 Пакет "Надлишкова вага (дитячий)"
                </span>
                <ul>
                  <li>
                    • Аналіз крові загальний (автоматизований з лейкоформулою)
                  </li>
                  <li>• Загальний аналіз сечі (з мікроскопією осаду)</li>
                  <li>• Глюкоза </li>
                  <li>• Глікозильований гемоглобін (HbA1c)</li>
                  <li>• Тироксин загальний (Т4)</li>
                  <li>• Тиреотропний гормон (TSH, ТТГ)</li>
                  <li>• Пролактин (PRL)</li>
                  <li>• Лептин</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 1850 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 1388 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BSD4K5WXPXWWTRJFFBSW" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення пакетів досліджень на сайті з
              01.06.2024 р. по 30.06.2024 р. Акційна ціна не враховує вартість
              забору біоматеріалу. Знижки за різними акційними пропозиціями не
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
