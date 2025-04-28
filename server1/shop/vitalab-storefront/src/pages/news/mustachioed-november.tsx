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
            <Heading variant="heading">ВУСАТИЙ ЛИСТОПАД</Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 31 вересня 2023 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              31 жовтня 2023 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                У листопаді чоловіки-лікарі відпускають вуса. Таким чином вони
                привертають увагу до проблем чоловічого здоров’я.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Лікарі рекомендують чоловікам до 40 років проходити обстеження
                на ПСА загальний (простатичний специфічний антиген) у випадку
                наявності скарг, а після 40 – регулярне обстеження у андролога
                або уролога. Підвищений рівень ПСА вказує на наявність патології
                передміхурової залози
              </p>

              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Ми дбаємо про здоров'я чоловіків та пропонуємо знижки на
                обстеження:{" "}
              </p>
            </div>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Код 225 «Простат-специфічний антиген загальний (ПСА)» -{" "}
                  <strong>знижка 30%</strong>
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 235 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 165 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BRZM7TS866FR4ABTSRGW" />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white" shadow="small">
              <div className="py-6 pl-8 pr-14">
                <span className="">
                  Код 02011 Пакет «Індекс здоров'я простати» -{" "}
                  <strong>знижка 25%</strong>
                </span>
                <div className="mt-10 grid items-center gap-6 md:grid-cols-[2fr_1fr]">
                  <div className="text-m">
                    <p className="line-through">Базова ціна - 432 грн.</p>
                    <p className="mt-2 text-base font-semibold text-slate-900 md:text-lg">
                      Акційна ціна - 324 грн.*
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <AddCartButton id="prod_01H3C3BSCKEB8CJ5VVQB3AAQFT" />
                  </div>
                </div>
              </div>
            </Card>
            <p className="px-4 text-sm">
              А якщо результати цих аналізів будуть відхилятися від норми,
              пропонуємо БЕЗОПЛАТНУ консультацію уролога клініки Garvis - лише
              назвіть пароль «ВУСАТИЙ ЛИСТОПАД» при записі у контакт-центрі
              клініки Garvis. На консультації обов’язкова наявність результату
              аналізу на бланку VitaLab. Запис на консультацію за телефонами:
              <a
                className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
                href="tel:+380952831020"
              >
                +38 (095) 283-10-20,
              </a>
              <a
                className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
                href="tel:+380673531020"
              >
                +38 (067) 353-10-20,
              </a>
            </p>
            <p className="px-4 text-s">
              *Акція діє за умови замовлення досліджень на сайті з 01 до 30
              листопада 2023 р. Знижки за цією акцією не підсумовуються зі
              знижками за іншими акціями. Акційна ціна не враховує вартість
              забору біоматеріалу.
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
