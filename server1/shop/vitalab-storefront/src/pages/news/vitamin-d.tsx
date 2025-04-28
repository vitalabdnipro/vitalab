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
              Вітамін D – це основа здорових кісток та м'язів!
            </Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 31 вересня 2023 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              27 вересня 2023 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                А ще він відповідає за імунітет, загальне самопочуття та
                настрій.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Дефіцит вітаміну D призводить до порушень розвитку скелету. А
                науковці вважають, що нестача вітаміну D провокує розвиток
                аутоімунних, інфекційних, серцево-судинних та інших захворювань.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Симптоми дефіциту вітаміну D:
                <ul className="text-base">
                  <li>• ламкість кісток</li>
                  <li>• слабкість у м'язах, періодичні судоми</li>
                  <li>• часті застуди</li>
                  <li>• дратівливість та пригніченість</li>
                  <li>• частий карієс</li>
                  <li>• втрата апетиту</li>
                </ul>
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Дізнатися точно, чи є дефіцит вітаміну D, дозволяє лабораторне
                дослідження:{" "}
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">25-гідроксікальциферол (25-ОН-D)</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 465 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 395 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BQSENN0PE3D5QBZWPJMT" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення дослідження на сайті до 14.03.2024 р.
              <br /> Акційна ціна не враховує вартість забору біоматеріалу.
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
