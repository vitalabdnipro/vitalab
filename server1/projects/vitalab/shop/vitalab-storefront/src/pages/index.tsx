import type { ReactElement } from "react"
import { Layout } from "@components/common"
import { NewsView } from "@components/news"
import { Hero, Section, ServiceCard } from "@components/ui"
import { AdBlock } from "@components/ui/ad-block"
import Head from "@modules/common/components/head"
import type { NextPageWithLayout } from "types/global"

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
            <ServiceCard
              title="Акції"
              buttonText="Переглянути"
              link="/news?type=promotions"
            >
              <div className="mt-1 grid grid-flow-col grid-cols-[110px_1fr] grid-rows-2">
                <div className="row-span-2 flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-10 w-10"
                  >
                    <line x1="19" x2="5" y1="5" y2="19" />
                    <circle cx="6.5" cy="6.5" r="2.5" />
                    <circle cx="17.5" cy="17.5" r="2.5" />
                  </svg>
                </div>
              </div>
            </ServiceCard>
            <ServiceCard
              title="Аналізи"
              buttonText="Замовити"
              link="/analyzes/11"
            >
              <div className="mt-1 grid grid-flow-col grid-cols-[110px_1fr] grid-rows-2">
                <div className="row-span-2 flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-10 w-10"
                  >
                    <path d="M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01v0a2.83 2.83 0 0 1 0-4L17 3" />
                    <path d="m16 2 6 6" />
                    <path d="M12 16H4" />
                  </svg>
                </div>
              </div>
            </ServiceCard>
            <ServiceCard
              title="Виклик додому"
              buttonText="Замовити"
              link="/home"
            >
              <div className="mt-1 grid grid-flow-col grid-cols-[110px_1fr] grid-rows-2">
                <div className="row-span-2 flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-10 w-10"
                  >
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                </div>
              </div>
            </ServiceCard>
            <ServiceCard
              title="Адреси та час роботи"
              buttonText="Переглянути"
              link="/laboratories"
            >
              {/* <div className="mt-3 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="mr-2 h-10 w-10"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                          />
                        </svg>
                        <div className="text-3xl font-semibold">16</div>
                      </div> */}
              <div className="mt-1 grid grid-flow-col grid-cols-[110px_1fr] grid-rows-2">
                <div className="row-span-2 flex items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mr-2 h-10 w-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <div className="text-3xl font-semibold">19</div>
                </div>
                <div className="flex items-center text-s">Лабораторних</div>
                <div className="flex items-center text-s">центрів</div>
              </div>
            </ServiceCard>
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
