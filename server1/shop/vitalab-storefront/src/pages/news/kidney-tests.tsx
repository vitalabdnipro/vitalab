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
            <Heading variant="heading">ЗДОРОВІ НИРКИ</Heading>
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
                Нирки - життєво важливий орган, що відповідає за очищення крові
                та виведення рідини з організму.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Коли функції нирок порушуються, це негативно впливає на роботу
                всього організму. Саме тому важливо підтримувати здоров’я нирок,
                вчасно діагностувати та лікувати їх захворювання.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Контролюйте здоров’я нирок зі спеціальною знижкою 15%:{" "}
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 123 – Креатинін</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 140 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 119 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BRS7K9PBBSHJWT48VRRV" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 124 – Сечовина</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 140 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 119 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BRS8PP9R9R8CY9BQCY74" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 125 – Сечова кислота</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 130 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 111 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BRSHBA0P0SXJ2WBK3DT6" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 121 – Загальний білок</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 130 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна - 111 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BRRG8HNJM1V202PFYD6Z" />
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
