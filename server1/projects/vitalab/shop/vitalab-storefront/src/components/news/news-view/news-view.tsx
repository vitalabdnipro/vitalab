import { useRouter } from "next/router"
import { Section } from "@components/ui"
import cn, { clsx } from "clsx"

import { NewsPost } from "../../news"
import s from "./news-view.module.css"

const tempData = [
  {
    title: "ЗУСТРІЧАЙТЕ ВЕСНУ ЗДОРОВИМИ!",
    description: "-40% на великий чек-ап",
    slug: "/news/check-up",
    date: "2025-03-01",
    img: "/b/b_01032025.jpg",
    type: "promotions",
  },
  {
    title: "КОЛИ СИЛИ НА НУЛІ",
    description: "Перевіртесь на дефіцити зі знижкою 20%!",
    slug: "/news/fatigue",
    date: "2025-03-01",
    img: "/b/b_01032025_1.jpg",
    type: "promotions",
  },
  {
    title: "ЗАСТУДИЛИСЬ? ОДУЖУЙТЕ!",
    description: "Перевірте свій стан при ГРВІ зі знижкою 25%!",
    slug: "/news/get-well",
    date: "2025-03-01",
    img: "/b/b_30112024.jpg",
    type: "promotions",
  },
  {
    title: "ЧИ ДОСТАТНЬО ВІТАМІНУ D?",
    description: "Перевірте організм на дефіцит вітаміну D зі знижкою!",
    slug: "/news/starts-d",
    date: "2025-03-01",
    img: "/b/b_30052024_2.jpg",
    type: "promotions",
  },
  {
    title: "СЕРЦЕ – МОТОР ВАШОГО ОРГАНІЗМУ",
    description: "7 показників роботи серця і судин зі знижкою!",
    slug: "/news/heart",
    date: "2025-03-01",
    type: "promotions",
    img: "/b/b_30052024_3.jpg",
  },
  {
    title: "ПЕЧІНКОВІ ПРОБИ",
    description: "4 показники здоров’я печінки зі знижкою!",
    slug: "/news/healthy-liver",
    date: "2025-03-01",
    type: "promotions",
    img: "/b/b_30052024_4.jpg",
  },
  {
    title: "ТИРЕОЇДНИЙ СКРИНІНГ",
    description: "2 показники роботи щитовидної залози зі знижкою!",
    slug: "/news/thyroid-screening",
    date: "2025-03-01",
    type: "promotions",
    img: "/b/b_30052024_5.jpg",
  },
  {
    title: "ІМУНІТЕТ У ПОРЯДКУ!",
    description: "Скринінг стану імунітету зі знижкою!",
    slug: "/news/immunity-ok",
    date: "2025-03-01",
    type: "promotions",
    img: "/b/b_30052024_6.jpg",
  },
  // {
  //   title: "ДО ШКОЛИ – БЕЗ РИЗИКУ!",
  //   description: "Готуйтеся до школи разом із Vitalab",
  //   slug: "/news/school",
  //   date: "2024-08-19",
  //   img: "/b/b_19082024.jpg",
  //   type: "promotions",
  // },
  {
    title: "ВСЕСВІТНІЙ ДЕНЬ БОРОТЬБИ З ГЕПАТИТАМИ",
    description: "Пройдіть обстеження зі знижкою!",
    slug: "/news/hepatitis",
    date: "2024-07-15",
    img: "/b/b_15072024.jpg",
    type: "promotions",
  },
  {
    title: "Ми завжди поруч",
    description: "Виклик медсестри додому чи в офіс",
    slug: "/news/we-are-always-there",
    date: "2023-06-30",
    type: "news",
    img: "/b/b_1.jpg",
  },
  {
    title: "1 червня – День захисту дітей",
    description:
      "Знижка 15% на комплекси лабораторних досліджень для малюків і школярів.",
    slug: "/news/june-1-childrens-protection-day",
    date: "2023-06-01",
    type: "old",
    img: "/b/b1.jpg",
  },
  {
    title: "Результати аналізів у смартфоні",
    description:
      "Відтепер наші пацієнти мають можливість отримувати результати аналізів у Viber або Telegram",
    slug: "/news/analysis-results-in-your-smartphone",
    date: "2022-08-24",
    type: "news",
    img: "/b/b_2.jpg",
  },
  // {
  //   title: "Підготуйтесь до літа – пройдіть чек-ап!",
  //   description:
  //     "Перевірте стан організму зі знижкою 15% та насолоджуйтесь сонячним літом!",
  //   slug: "/news/get-ready-for-the-summer-get-your-check-up",
  //   date: "2023-06-01",
  //   type: "promotions",
  //   img: "/b/b_7.jpg",
  // },
  // {
  //   title: "Замовляйте пакети досліджень!",
  //   description: "Профільні пакети досліджень зі знижкою 10%",
  //   slug: "/news/discounts-on-package-propositions",
  //   date: "2023-04-01",
  //   type: "promotions",
  //   img: "/b/b_4.jpg",
  // },
  {
    title: "Чи є алергія на анестезію?",
    description: "Визначення індивідуальної чутливості до місцевого анестетика",
    slug: "/news/determination-of-sensitivity-to-local-anesthetics",
    date: "2022-01-25",
    img: "/b/b_6.jpg",
  },
]

type NewsType = "news" | "promotions" | "articles"

const NewsView = ({ className }: { className?: string }) => {
  const router = useRouter()
  const { type } = router.query

  // if (!type) {
  //   return <div>loading...</div>
  // }

  const articles = type
    ? tempData.filter((item) => item.type === type)
    : tempData

  return (
    <Section className={clsx("text-[#425466]", className)}>
      <div className="">
        {/* RowLayout section.module.css > .rowLayout {...} */}
        <div
          className="section__row-layout"
          style={
            {
              "--row-layout-gap": `var(--row-layout-gap-normal)`,
            } as React.CSSProperties
          }
        >
          {/* Copy */}
          <section
            className={s.headerContainer}
            style={
              {
                "--padding-right": `var(--column-padding-xlarge)`,
              } as React.CSSProperties
            }
          >
            {/* Copy__header */}
            <div className={s.header}>
              {/* Copy__title */}
              <h2 className="relative text-4xl font-semibold leading-tight tracking-[-0.2px] text-title">
                {type === "promotions" ? "Акції" : "Новини"}
              </h2>
            </div>
            {/* Copy__footer */}
            <div></div>
          </section>
          {/* NewsroomArticleList */}
          <section>
            {/* RowLayout */}
            <div className={cn("section__row-layout", s.articleList)}>
              {
                articles.slice(0, 10).map((item, index) => {
                  return <NewsPost data={articles[index]} key={item.slug} />
                })
                // .sort((a, b) => {
                //   console.log(a.date - b.date)
                //   return a.date - b.date
                // })}
              }
              {/* <NewsPost />
              <NewsPost /> */}
            </div>
          </section>
        </div>
      </div>
    </Section>
  )
}

export default NewsView
