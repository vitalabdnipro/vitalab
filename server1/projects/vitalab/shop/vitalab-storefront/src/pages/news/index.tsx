import { ReactElement } from "react"
import { useRouter } from "next/router"
import { Layout } from "@components/common"
import Breadcrumbs from "@components/ui/breadcrumbs"
import Section from "@components/ui/section"
import { NewsView } from "@components/news"

export default function News() {
  return (
    <>
      <Section>
        <div className="pb-8 md:pb-16">
          <Breadcrumbs />
        </div>
      </Section>
      <NewsView />
    </>
  )
}

News.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
