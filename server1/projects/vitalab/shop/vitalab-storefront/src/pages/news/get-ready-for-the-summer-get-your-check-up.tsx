import type { ReactElement } from "react"
import { AddCartButton } from "@components/atoms/add-cart-button"
import { Layout } from "@components/common"
import { Breadcrumbs, Button, Card, Heading, Section } from "@components/ui"

const PostPage = ({ data }) => {
  console.log("data", data)
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
              Підготуйтесь до літа – пройдіть чек-ап
            </Heading>
            <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 31 серпня 2023 р.</p>
            </div>
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              1 червня 2023 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Спеціальна пропозиція від VitaLab – чек-ап організму перед
                початком спекотного сезону. Перевірте стан організму зі знижкою
                15% та насолоджуйтесь сонячним літом!
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Дослідження 100 «Аналіз крові загальний (автоматизований з
                  лейкоформулою)»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 175 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 149 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BQAT3DTXWMYWPJ74PJYX" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Дослідження 173 «Ліпідограма»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 350 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 298 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BQWAFHT838AGNZZVKJM9" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Дослідження 163 «Трийодтиронін загальний (Т3)»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 180 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 153 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BQXXHFD99MHSSVPS6SQ5" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Дослідження 164 «Тироксин загальний (Т4)»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 180 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 153 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BQXSAE50GDJ7D62R3426" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Дослідження 167 «Тиреотропний гормон (TSH, ТТГ)»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 180 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 153 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BQY7SHC2G0WTNYZGK4DY" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Дослідження 168 «Антитіла до тиреопероксидази (АТPО)»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 225 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 191 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BQY2G9E0KTZK4M6F7BMK" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Дослідження 242 «25-гідроксікальциферол (25-ОН-D)»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 420 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 357 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BQSENN0PE3D5QBZWPJMT" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акційна ціна не враховує вартість забору біоматеріалу.
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
