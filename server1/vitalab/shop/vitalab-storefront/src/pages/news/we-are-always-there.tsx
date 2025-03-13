import type { ReactElement } from "react"
import Link from "next/link"
import { AddCartButton } from "@components/atoms/add-cart-button"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Heading, Section } from "@components/ui"
import { Button } from "@components/v2/button"

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
              Виклик медсестри додому чи в офіс
            </Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 30 червня 2023 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              01.03.2025
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 font-semibold sm:pr-8 md:max-w-[810px]">
                Ми завжди поруч і готові допомогти!
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Іноді спланувати візит для здачі аналізів непросто – заважає
                графік роботи, мобільність пацієнта обмежена через стан
                здоров&apos;я, вам незручно добиратися до пункту забору
                біоматеріалу або самостійне відвідування ускладнене з інших
                причин.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Лабораторія VitaLab допоможе у такій ситуації – ми організуємо
                виїзд висококваліфікованого персоналу для забору біоматеріалу
                вдома, на роботі чи в іншому зручному для пацієнта місці.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Оформіть замовлення виїзду медсестри по місту Дніпро, і наші
                адміністратори зв'яжуться з вами, розрахують вартість
                замовлення, погодять зручну дату і час виїзду, та розкажуть, як
                підготуватися до здачі аналізів.
              </p>
              <p className="px-4 sm:pr-8 md:max-w-[810px]">
                Піклуйтеся про своє здоров'я разом із VitaLab!
              </p>
            </div>
            <div className="flex">
              <Button className="mx-auto w-[270px] items-center" asChild>
                <Link href="/home">Замовити</Link>
              </Button>
            </div>
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
