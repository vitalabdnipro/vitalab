import { useRouter } from "next/router"
import { Section } from "@components/ui"
import cn, { clsx } from "clsx"

import { NewsPost } from "../../news"
import s from "./news-view.module.css"
import tempData from "../../../../data/news_list.json"

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
