import type { ReactElement } from "react"
import Image from "next/image"
import { AddCartButton } from "@components/atoms/add-cart-button"
import { ContactInfo, Layout } from "@components/common"
import { Breadcrumbs, Card, Heading, Section } from "@components/ui"
import { Button, buttonVariants } from "@components/v2/button"
import Link from "next/link"
import { cn } from "@utils/cn"

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
            <Heading variant="heading">Замовляйте пакети досліджень</Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 30 червня 2023 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              1 червня 2023 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8">
                Лабораторія VitaLab розробила профільні пакети досліджень, які
                зазвичай призначаються одночасно при діагностиці захворювань або
                контролі роботи систем організму. Це зручно та економно – адже
                базова вартість таких пакетів на 10% нижча, ніж сумарна вартість
                аналізів, які до них входять.
              </p>
              <p className="px-4 sm:pr-8">
                Заощаджуйте ще більше – отримуйте додаткову знижку 10% при
                онлайн-замовленні пакетів досліджень у розділі «Профілі»
                переліку аналізів на сайті VitaLab.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Link className={cn(buttonVariants({variant: "default"}), "w-1/3 bg-emerald-700 hover:bg-emerald-800", )} href="/analyzes/11">Замовити</Link>
            </div>
            <p className="px-4 text-s">
              Акція діє за умови замовлення пакетів досліджень на сайті VitaLab.
              Акційна ціна не враховує вартість забору біоматеріалу.
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
