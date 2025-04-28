import type { ReactElement } from "react"
import { AddCartButton } from "@components/atoms/add-cart-button"
import { ContactInfo, Layout } from "@components/common"
import { Breadcrumbs, Button, Card, Heading, Section } from "@components/ui"

const PostPage = ({ data }) => {
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
              Визначення чутливості до місцевих анестетиків
            </Heading>
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              1 червня 2023 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Спеціальна пропозиція від VitaLab для стоматологів,
                косметологів, хірургів та наших пацієнтів - визначення
                індивідуальної чутливості до місцевих анестетиків.
              </p>
              <p className="px-4 sm:pr-8">
                Ці дослідження визначають рівень специфічних імуноглобулінів Е в
                організмі пацієнта до конкретного анестетику. На підставі
                результатів дослідження можливо передбачити прояви алергії по 1
                типу реакції, тобто гіперчутливість негайного типу
                (анафілактичний шок, набряк Квінке, кропив&apos;янка).
                Пам’ятайте, що специфічні імуноглобуліни Е виробляються після
                первинного введення алергену, а клінічні прояви алергії
                виникають тільки при повторному введенні (сенсибілізація).
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="px-8 py-6">
                <span className="">
                  Дослідження 451 «Панель до алергенів анестетиків IgE
                  (артикаїн/ультракаїн, лідокаїн/ксилокаїн,
                  мепівакаїн/полокаїн)»
                </span>
                <div className="mt-10 grid items-center gap-6">
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BR33J7NKDCR0638CJZSS" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="px-8 py-6">
                <span className="">
                  Дослідження 440 «Панель до алергенів анестетиків IgE
                  (артикаїн/ультракаїн, лідокаїн/ксилокаїн)»
                </span>
                <div className="mt-10 grid items-center gap-6">
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BR2D5W1DFA79J15PK437" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="px-8 py-6">
                <span className="">
                  Дослідження 450 «IgE до алергенів анестетиків
                  мепівакаїн/полокаїн»
                </span>
                <div className="mt-10 grid items-center gap-6">
                  <div className="flex w-full justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BR2GBY7WWST12B5YFVB8" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              Увага! Негативний результат дослідження не може гарантувати
              відсутність алергічної реакції іншого типу.
            </p>
            <ContactInfo />
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
