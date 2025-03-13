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
            <Heading variant="heading">СТРЕСУ - НІ</Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 31 вересня 2023 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              30.01.2024 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Під час психоемоційних перевантажень особливо важливо
                контролювати ключові показники роботи систем організму, щоб
                вчасно допомогти йому впоратися із наслідками стресу.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Пропонуємо обстеження на індикатори рівня стресу зі знижкою 15%:{" "}
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 195 – Кортизол</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 340 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 289 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQBPRWZAVYMDWFAVQX4M" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 167 - Тиреотропний гормон (ТТГ)</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 230 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 196 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQY7SHC2G0WTNYZGK4DY" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 185 – Пролактин</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 265 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 225 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQV0XQ041CJBK9M5Q8BJ" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 140 – Магній</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 130 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 111 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BRVP0S2TC47RFAK4CN8V" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 146 – Залізо</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 130 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 111 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQ8SX7FA6MM6KD6GFDZ8" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 143 – Цинк</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 310 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 264 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BRWBY4JK69MM7XH9PV8A" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 242 - 25-гідроксікальциферол</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 490 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 417 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQSENN0PE3D5QBZWPJMT" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 152 - Вітамін B12 (ціанокобаламін)</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 290 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 247 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQ91VAPKP0WNTQEHJTG6" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення досліджень на сайті з 01.02.2024 р.
              по 31.03.2024 р. Акційна ціна не враховує вартість забору
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
