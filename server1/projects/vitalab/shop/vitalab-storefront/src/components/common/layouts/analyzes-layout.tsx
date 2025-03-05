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

              {/* <div className="relative h-full h-20 w-full">
              <span className="absolute -z-[2] h-full w-full rounded-[8px] bg-gradient-to-r from-cyan-500 to-blue-500 shadow-xl before:absolute before:mr-20 before:h-full before:w-full before:border-[12px] before:bg-gradient-to-r before:from-cyan-500 before:to-blue-500 before:blur-lg"></span>
            </div> */}

              {/* <Card className="border border-gray-200">{children}</Card> */}
              <div className="z-[0] rounded-lg border bg-white">{children}</div>
            </div>
          </div>
        </Section>
      </Layout>
    </>
  )
}

export default AnalyzesLayout
