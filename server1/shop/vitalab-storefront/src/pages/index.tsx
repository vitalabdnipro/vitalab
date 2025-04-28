import type { ReactElement } from "react"
import { Layout } from "@components/common"
import { NewsView } from "@components/news"
import { Hero, Section, ServiceCard } from "@components/ui"
import { AdBlock } from "@components/ui/ad-block"
import Head from "@modules/common/components/head"
import type { NextPageWithLayout } from "types/global"
import servicesData from "../../data/homepage_services.json"

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head
        title="VitaLab - Українська медична лабораторія"
        description="Медичні лабораторні дослідження у Дніпрі. Понад 950 аналізів. Європейське обладнання та стандарти якості."
      />
      <Hero />
      <Section>
        <div className="py-8 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {servicesData.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                buttonText={service.buttonText}
                link={service.link}
              >
                <div className="mt-1 grid grid-flow-col grid-cols-[110px_1fr] grid-rows-2">
                  <div className="row-span-2 flex items-center">
                    <div dangerouslySetInnerHTML={{ __html: service.svgContent }} />
                    {service.additionalContent && (
                      <div className="text-3xl font-semibold">{service.additionalContent.number}</div>
                    )}
                  </div>
                  {service.additionalContent && (
                    <>
                      <div className="flex items-center text-s">{service.additionalContent.text1}</div>
                      <div className="flex items-center text-s">{service.additionalContent.text2}</div>
                    </>
                  )}
                </div>
              </ServiceCard>
            ))}
          </div>
        </div>
      </Section>
      <NewsView className="py-16" />
      <AdBlock />
    </>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
