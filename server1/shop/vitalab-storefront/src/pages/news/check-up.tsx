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
              ДАРУЙТЕ БЛИЗЬКИМ НАЙЦІННІШЕ – ВАШУ ТУРБОТУ!
            </Heading>
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
                Найкращий подарунок — це турбота. А що може бути важливішим, ніж
                здоров’я ваших рідних? Check-up «Будьте здорові!» від Vitalab —
                це можливість оцінити стан усіх основних систем організму з
                неймовірною вигодою – 40%. Ми пропонуємо просте рішення, яке
                стане чудовим подарунком для тих, кого ви любите – практичний
                спосіб проявити вашу турботу.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Будьте здорові разом із Vitalab!
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">02171 Check-up «Будьте здорові!»</span>
                <ul>
                  <li>
                    • Аналіз крові загальний (автоматизований з лейкоформулою)
                  </li>
                  <li>• 25-гідроксікальциферол (25-ОН-D)</li>
                  <li>• Тиреотропний гормон (TSH, ТТГ)</li>
                  <li>• Антитіла до тиреопероксидази (АТPО)</li>• Ліпідограма
                  <li>• Альфа-амілаза</li>
                  <li>• Глікозильований гемоглобін (HbA1c)</li>
                  <li>• Глюкоза</li>
                  <li>• Інсулін</li>
                  <li>• Індекс HOMA-IR (розрахунок)</li>
                  <li>• С-реактивний білок (СРБ, CRP)</li>
                  <li>• Сечовина</li>
                  <li>• Альбумін</li>
                  <li>• Креатинін</li>
                  <li>• Сечова кислота</li>
                  <li>• Загальний білок</li>
                  <li>• Лужна фосфатаза (ЛФ)</li>
                  <li>• Кальцій іонізований</li>
                  <li>• Аланінамінотрансфераза (АЛТ, АлАТ)</li>
                  <li>• Аспартатамінотрасфераза (АСТ, АсАТ)</li>
                  <li>• Гамма-глутамілтрансфераза (ГГТ, ГГТП)</li>
                  <li>
                    • Білірубін загальний, прямий та непряма фракція білірубіну
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 4610 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 2766 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01JJVPG3EBPS1MXF51PZSF3HY0" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              * Акція діє за умови замовлення досліджень на сайті з 01.04.2025
              р. по 31.05.2025 р. Акційна ціна не враховує вартість забору
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
