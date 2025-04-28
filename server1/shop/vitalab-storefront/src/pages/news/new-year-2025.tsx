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
            <Heading variant="heading">СВЯТКОВІ ЗНИЖКИ У VITALAB!</Heading>
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              23.12.2024
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Ми вітаємо вас із прийдешніми святами та пропонуємо корисні
                знижки на популярні пакетні обстеження.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Здоровий початок нового року із Vitalab – це найкращий подарунок
                собі і своїм близьким!
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Обирайте акційні пакети досліджень зі знижкою 20%.
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  02138 Пакет "Скринінг вуглеводного обміну"
                </span>
                <ul>
                  <li>
                    • Глікозильований гемоглобін (HbA1c), глюкоза, інсулін
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 670 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 536 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZ3SDR8TY9ABXKVAWA9" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02139 Пакет "Скринінг стану імунітету"</span>
                <ul>
                  <li>• Вітамін D (25-ОН-D), феритин</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 770 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 616 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZ40NHDVSM02T4K9068" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  02140 Пакет "Скринінг щитовидної залози"
                </span>
                <ul>
                  <li>
                    • Тироксин вільний (T4 вільний), тиреотропний гормон (TSH,
                    ТТГ)
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 450 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 360 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZ640F8EHHANQDZFXTH" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02141 Пакет "Ревматологічний скринінг"</span>
                <ul>
                  <li>
                    • Антистрептолізин-О (АСЛ-О), С-реактивний білок (CRP),
                    ревматоїдний фактор (RF), сечова кислота
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 565 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 452 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZ5AJ82PDDXTJZ28NZD" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02142 Пакет "Скринінг функції нирок"</span>
                <ul>
                  <li>• Креатинін, сечовина, сечова кислота</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 410 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 328 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZ7H8YD7NPQDKR0BD9V" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02143 Пакет "Скринінг кардіоризику"</span>
                <ul>
                  <li>
                    • КФК-МВ, холестерин загальний, тригліцериди, ЛПНЩ, ЛПВЩ,
                    індекс атерогенності
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 640 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 512 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZ8185PH7W9QR85ZDJ7" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  02144 Пакет "Скринінг дефіциту вітаміну D"
                </span>
                <ul>
                  <li>• Вітамін D (25-ОН-D), кальцій іонізований, фосфор</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 820 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 656 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZ95GAJK0QETAEPMNR6" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02145 Пакет "Панкреатичний скринінг"</span>
                <ul>
                  <li>• Ліпаза, глюкоза, амілаза панкреатична</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 430 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 344 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZB4R8BBVXAKVWFG0RY" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02146 Пакет "Скрінінг гемостазу"</span>
                <ul>
                  <li>
                    • Аналіз крові загальний, коагулограма скринінгова
                    (протромбін), D-димер
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 640 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 512 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZ170PRQXQDK5A4NMVK" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02141 Пакет "Скринінг стану печінки"</span>
                <ul>
                  <li>• АлАТ, АсАТ, білірубін загальний, ГГТ</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 520 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 416 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01HT5DASZ2Z08QDREDZZ64B5GN" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  02152 Пакет "Діагностика вірусних гепатитів В і С"
                </span>
                <ul>
                  <li>
                    • HBsAg австралійський антиген, гепатит С (HCV) антитіла
                    сумарні
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 720 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 576 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01J96FXSXKNJ77VWPSWQN95X36" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  02154 Пакет "Скринінг захворювань кишківника"
                </span>
                <ul>
                  <li>
                    • Фекальний кальпротектин кількісний, дослідження калу на
                    приховану кров
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1100 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 880 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01J96FXSXB9PN298ZC50D4S06M" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02155 Пакет "Жіночі базові гормони"</span>
                <ul>
                  <li>• ФСГ, ЛГ, пролактин, естрадіол</li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">
                      Базова ціна пакету - 1060 грн.
                    </p>
                    <p className="mt-2 text-base font-semibold text-red-600 md:text-lg">
                      Акційна ціна пакету - 848 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    {/* <Button variant="solid">Замовити</Button> */}
                    <AddCartButton id="prod_01J96FXSXMY6SM46DCE1Y3NP9M" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення досліджень на сайті з 01.12.2024
              р. по 31.01.2025 р. Акційна ціна не враховує вартість забору
              біоматеріалу. Знижки за різними акційними пропозиціями не
              підсумовуються.
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
