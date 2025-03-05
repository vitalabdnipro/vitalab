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
          <header className="col-span-3 mt-12 grid w-full max-w-[810px] gap-y-6 md:grid-in-hero">
            <Heading variant="heading">З ТУРБОТОЮ ПРО МАЛЕНЬКИХ ГЕНІЇВ</Heading>
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              19.08.2024
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Щоб гарно вчитись, треба бути сильним та здоровим!
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Перевірте здоров’я свого школяра швидко, комфортно та за
                особливо приємною ціною. Замовляйте пакети досліджень для дітей
                зі знижкою 30%.
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="font-semibold">
                  02094 Пакет &quot;До школи - без ризику (базовий)&quot;
                </span>
                <p>
                  Аналіз крові загальний, дослідження калу на яйця глистів,
                  загальний аналіз сечі, лямблія (Giardia lamblia), антиген у
                  калі, С-реактивний білок (CRP)
                </p>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 959 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 671 грн.*
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
                <span className="font-semibold">
                  02037 Пакет "Здорова дитина"
                </span>
                <p>
                  Аналіз крові загальний, глюкоза, дослідження калу на яйця
                  глистів, загальний аналіз сечі, зішкріб на ентеробіоз
                </p>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 806 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 564 грн.*
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
                <span className="font-semibold">
                  02129 Пакет "Залишайся здоровим - для дітей"
                </span>
                <p>
                  25-гідроксікальциферол (25-ОН-D), аналіз крові загальний,
                  глюкоза, кальцій іонізований, С-реактивний білок (CRP)
                </p>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 1080 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 756 грн.*
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
                <span className="font-semibold">02093 Пакет "Сімпл-Дімпл"</span>
                <p>
                  25-гідроксікальциферол (25-ОН-D), аналіз крові загальний,
                  дослідження калу на яйця глистів, загальний аналіз сечі,
                  залізо, кальцій, лямблія (Giardia lamblia), антиген у калі,
                  С-реактивний білок (CRP), тиреотропний гормон (TSH, ТТГ)
                </p>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 1840 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 1288 грн.*
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
                <span className="font-semibold">
                  02107 Пакет "Надлишкова вага (дитячий)"
                </span>
                <p>
                  Аналіз крові загальний, глюкоза, глікозильований гемоглобін
                  (HbA1c), загальний аналіз сечі, лептин, пролактин (PRL),
                  тиреотропний гормон (TSH, ТТГ), тироксин загальний (Т4)
                </p>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 1850 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 1295 грн.*
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
              20.08.2024 р. по 30.09.2024 р. Акційна ціна не враховує вартість
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
