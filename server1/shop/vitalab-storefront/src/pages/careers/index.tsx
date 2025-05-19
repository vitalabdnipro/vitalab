import type { ReactElement } from "react"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Section } from "@components/ui"
import { Button } from "@components/v2/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/v2/tooltip"
import { Calendar, Clock } from "lucide-react"
import Head from "@modules/common/components/head"

const Careers = () => {
  return (
    <>
      <Head
        title="Кар'єра - українська медична лабораторія VitaLab"
        description="Медичні лабораторні дослідження у Дніпрі. Понад 400 аналізів. Європейське обладнання та стандарти якості."
      />
      <Section>
        <div className="pb-6 md:mt-0 md:pb-16">
          <div
            className="section__row-layout gap-16"
          >
            <Breadcrumbs title="Кар'єра" />
            <header className="relative grid max-w-[810px] gap-y-6 px-4">
              <h1 className="text-3xl font-semibold leading-tight text-gray-900 md:text-4xl">
                Відкриті вакансії
              </h1>
            </header>
          </div>
        </div>
      </Section>
      <Section>
        <div className="pb-20">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
              } as React.CSSProperties
            }
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="flex min-h-[250px] flex-1 items-stretch pt-4">
                <div className="flex w-full max-w-full flex-col justify-between rounded-md bg-white shadow-[_0_0_0_1px_rgba(0,0,0,0.04),_0_4px_12px_rgba(0,0,0,0.08),_0_2px_4px_rgba(0,0,0,0.06)]">
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className=" text-lg font-semibold">Медсестра</div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Calendar className="h-5 w-5 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>07.06.2023</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="mt-5 text-sm">Опис вакансії...</div>
                  </div>

                  <div className="w-full p-1">
                    <Button variant="secondary" className="w-full">
                      Подати заявку
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* <Card shadow="medium">
              <div className="overflow-y-auto before:rounded-lg before:bg-white before:shadow-md">
                <table className="w-[1080px] min-w-full overflow-x-scroll">
                  <thead>
                    <tr className="relative grid grid-cols-[2fr,1fr,1fr] items-start text-m text-gray-800">
                      <th className="flex px-3 pb-2.5 font-semibold">Посада</th>
                      <th className="flex px-3 pb-2.5 font-semibold">
                        Дата публікації вакансії
                      </th>
                    </tr>
                  </thead>
                  <tbody className="relative block py-1 before:absolute before:inset-x-0 before:top-0 before:h-full before:rounded-lg before:bg-white before:shadow-md">
                    <tr className="relative grid grid-cols-[2fr,1fr,1fr] items-center even:before:absolute even:before:inset-x-1 even:before:top-0 even:before:h-full even:before:rounded even:before:bg-gray-50">
                      <td className="relative flex min-h-[48px] p-3 text-start text-m font-medium">
                        Медсестра
                      </td>
                      <td className="relative flex min-h-[48px] p-3 text-start text-m font-medium before:absolute before:inset-y-2 before:left-0 before:w-px before:bg-[rgb(66,71,112,0.06)]">
                        26.10.2022
                      </td>
                      <td className="relative flex min-h-[48px] justify-end pr-10 text-start text-m font-medium before:absolute before:inset-y-2 before:left-0 before:w-px before:bg-[rgb(66,71,112,0.06)]">
                        <Link href="/careers/nurse">
                          <Button
                            variant="slim"
                            className="text-orange-600 hover:text-vl-green-dark"
                          >
                            Подати заявку
                          </Button>
                        </Link>
                      </td>
                    </tr>
                    <tr className="relative grid grid-cols-[2fr,1fr,1fr] items-center even:before:absolute even:before:inset-x-1 even:before:top-0 even:before:h-full even:before:rounded even:before:bg-gray-50">
                      <td className="relative flex min-h-[48px] p-3 text-start text-m font-medium">
                        Лікар-лаборант
                      </td>
                      <td className="relative flex min-h-[48px] p-3 text-start text-m font-medium before:absolute before:inset-y-2 before:left-0 before:w-px before:bg-[rgb(66,71,112,0.06)]">
                        26.10.2022
                      </td>
                      <td className="relative flex min-h-[48px] justify-end pr-10 text-start text-m font-medium before:absolute before:inset-y-2 before:left-0 before:w-px before:bg-[rgb(66,71,112,0.06)]">
                        <Button
                          variant="slim"
                          className="text-orange-600 hover:text-vl-green-dark"
                        >
                          Подати заявку
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card> */}
          </div>
        </div>
      </Section>
    </>
  )
}

Careers.getLayout = (page: ReactElement) => {
  // @ts-ignore
  return <Layout>{page}</Layout>
}

export default Careers
