import AnalyzesSidebar from "@components/analyzes/analyzes-sidebar"
import { Breadcrumbs, Card, Section } from "@components/ui"

import Layout from "./layout"
import Head from "@modules/common/components/head"

const AnalyzesLayout = ({ children }) => {
  return (
    <>
      <Head
        title="Дослідження - українська медична лабораторія VitaLab"
        description="Медичні лабораторні дослідження у Дніпрі. Понад 400 аналізів. Європейське обладнання та стандарти якості."
      />
      <Layout>
        <Section>
          <div className="pb-32">
            <div
              className="section__row-layout"
              style={
                {
                  "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
                } as React.CSSProperties
              }
            >
              <Breadcrumbs title="Аналізи" />

              <div className="z-[0] rounded-lg border bg-white">{children}</div>
            </div>
          </div>
        </Section>
      </Layout>
    </>
  )
}

export default AnalyzesLayout
