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
          <header className="col-span-3 mt-12 grid w-full max-w-[810px] gap-y-6 md:grid-in-hero">
            <Heading variant="heading">
              28 ЛИПНЯ – МІЖНАРОДНИЙ ДЕНЬ БОРОТЬБИ З ВІРУСНИМИ ГЕПАТИТАМИ
            </Heading>
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              15.07.2024
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Мета цього дня — підвищення обізнаності про проблему вірусних
                гепатитів, способи їх профілактики, діагностики та лікування.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Серед гепатитів найбільш небезпечними є вірусні гепатити В та С,
                які можуть спричинити серйозні ураження печінки.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Важливість профілактики та регулярного тестування складно
                переоцінити. Саме тому ми пропонуємо пройти скринінгове
                обстеження на вірусні гепатити В та С зі знижкою 50%
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Пам’ятайте: точна та своєчасна діагностика - запорука
                ефективного лікування!
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Пакет &quot;Скринінг вірусних гепатитів В і С&quot;
                </span>
                <ul>
                  <li>
                    • Імунохроматогрофічний тест для якісного визначення антитіл
                    до вірусу гепатиту С (HCV)
                  </li>
                  <li>
                    • Імунохроматогрофічний тест для якісного визначення
                    поверхневого антигену гепатиту В (HBsAg)
                  </li>
                </ul>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 320 грн.</p>
                    <p className="mt-2 text-base font-semibold text-red-500 md:text-lg">
                      Акційна ціна - 160 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01J2GJ2B4FW391E54C0R7QC7JP" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення пакетів досліджень на сайті з
              15.07.2024 р. по 31.08.2024 р. Акційна ціна не враховує вартість
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
