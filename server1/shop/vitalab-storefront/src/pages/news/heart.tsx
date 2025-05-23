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
            <Heading variant="heading">ПОЧУЙТЕ СВОЄ СЕРЦЕ!</Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
            <p>Акція з 01.04.2024 р. по 31.05.2024 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              01.04.2025
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Протягом усього життя серце людини зазнає суттєвих навантажень.
                Адже серцево-судинна система забезпечує кровопостачання всіх
                органів та тканин.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Погодьтеся, серце та судини заслуговують на постійну турботу:
                регулярні фізичні вправи, раціональне харчування, відмову від
                шкідливих звичок, контроль ваги тіла, регулярні профілактичні
                обстеження.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Замовляйте пакет досліджень для базового моніторингу стану серця
                і судин зі знижкою 20%!
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Код 02143 Пакет "Скринінг кардіоризику"
                </span>
                <ul>
                  <li>• Креатинфосфокіназа МВ фракція (КФК-МВ)</li>
                  <li>• Ліпідограма</li>
                  <ul className="ml-3">
                    <li>◦ Холестерин загальний</li>
                    <li>◦ Тригліцериди</li>
                    <li>◦ Ліпопротеїди низької щільності</li>
                    <li>◦ Ліпопротеїди високої щільності</li>
                    <li>◦ Ліпопротеїди дуже низької щільності</li>
                    <li>◦ Коефіцієнт атерогенності (KA)</li>
                  </ul>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 640 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 512 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01HT5DASZ8185PH7W9QR85ZDJ7" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення пакету досліджень на сайті з 01.04.2025 р. по 30.04.2025 р. Акційна ціна не враховує вартість
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
