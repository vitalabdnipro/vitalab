import type { ReactElement } from "react"
import { AddCartButton } from "@components/atoms/add-cart-button"
import { ContactInfo, Layout } from "@components/common"
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
            <Heading variant="heading" className="text-vl-green-dark">
              GREEN FRIDAY починається у середу!
            </Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 22.11 до 24.11</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              22.11.2023
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                З 22.11 по 24.11 пропонуємо Вам діагностику організму зі знижкою
                40%! Замовляйте дослідження у GREEN FRIDAY, а приходьте, коли
                зручно (онлайн-замовлення дійсні протягом місяця).
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Рекомендовані профілі:
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 02032 - Пакет «Здоров'я жінки»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 4060 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">2436 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSE30K82BNBNTQ1S1MAH" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 02033 - Пакет «Здоров'я чоловіка»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 3655 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">2193 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSEGJM74ATTDHMYMF979" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 02004 - Пакет «Тиреоїдний №4»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 760 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">456 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSC2GEE82W02H0EQ037V" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 02109 Пакет «Кардіологічний»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 2250 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">1350 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSBHADFHBRCQE0FBZQWB" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Код 02110 - Пакет «Нирково-печінковий комплекс»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1120 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">672 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSA2TK5NWTS44NB20AW6" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 02096 - Пакет «Здоров’я нігтів»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1505 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">903 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSDMKWRJ0JN127852Y1Q" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 02097 - Пакет «Здоров’я шкіри»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1535 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">921 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSDQGDW2RHAPFM72152S" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">Код 02098 - Пакет «Здоров’я волосся»</span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1535 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">921 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSDS3N8PSEHRCS862CAY" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Код 02099 - Пакет «Вітаміни та мінерали»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1985 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">1191 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSDVQ8B9TWVVJE15WPF0" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Код 02039 - Пакет «Проблеми зайвої ваги»
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1365 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна пакету -{" "}
                      <span className="text-red-600">819 грн.*</span>
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01H3C3BSDBBP3V0WQH1D5CABVV" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення пакетів досліджень на сайті з 22 по
              24 листопада 2023 р. Акційна ціна не враховує вартість забору
              біоматеріалу. Знижка 40% застосовується лише на позиції, зазначені
              у цій публікації. Знижки за різними акційними пропозиціями не
              підсумовуються. Кількість акційних пакетів обмежена.
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
