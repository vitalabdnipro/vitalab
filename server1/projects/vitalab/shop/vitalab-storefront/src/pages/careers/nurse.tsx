import { Layout } from "@components/common"
import { Breadcrumbs, Button, Card, Heading, Section } from "@components/ui"
import { TextField } from "@components/ui/form/fields"
import { PaperClipIcon } from "@heroicons/react/24/solid"
import type { ReactElement } from "react"

const Nurse = () => {
  return (
    <>
      <Section>
        <div className="pb-24">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
              } as React.CSSProperties
            }
          >
            <Breadcrumbs />
            <Heading variant="heading">Медсестра</Heading>
          </div>
        </div>
      </Section>
      <Section>
        <div className="pb-24">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
              } as React.CSSProperties
            }
          >
            <div className="grid grid-cols-2 gap-y-2">
              <div className="grid gap-y-6 pr-4 text-lg text-gray-900 sm:pr-16 [&>p]:px-4 [&>p]:sm:pr-8">
                <h2 className="p-4 text-xl font-semibold sm:pr-8">
                  Про посаду:
                </h2>
                <p>...</p>
                <h2 className="mt-8 p-4 text-xl font-semibold sm:pr-8">
                  Обов&apos;язки:
                </h2>
                <p>...</p>
                <h2 className="mt-8 p-4 text-xl font-semibold sm:pr-8">
                  Переваги:
                </h2>
                <p>...</p>
              </div>
              <div className="">
                <Card className="bg-white" shadow="small">
                  <section className="p-4">
                    <form>
                      <div className="grid gap-y-4">
                        <label className="flex w-full items-center">
                          <span className="mt-1 mr-4 flex basis-40 items-start text-m font-semibold">
                            Ім&apos;я
                          </span>
                          <div className="flex flex-1 items-start">
                            <input className="inline-flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 font-normal text-black outline-none transition placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 focus:border-gray-800" />
                          </div>
                        </label>
                        <label className=" flex w-full items-center">
                          <span className="mt-1 mr-4 flex basis-40 items-start text-m font-semibold">
                            Прізвище
                          </span>
                          <div className="flex flex-1 items-start">
                            <input className="inline-flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 font-normal text-black outline-none transition placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 focus:border-gray-800" />
                          </div>
                        </label>
                        <label className=" flex w-full items-center">
                          <span className="mt-1 mr-4 flex basis-40 items-start text-m font-semibold">
                            Телефон
                          </span>
                          <div className="flex flex-1 items-start">
                            <input className="inline-flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 font-normal text-black outline-none transition placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 focus:border-gray-800" />
                          </div>
                        </label>
                        <label className="flex w-full items-center">
                          <span className="mt-1 mr-4 flex basis-40 items-start text-m font-semibold">
                            Електронна пошта
                          </span>
                          <div className="flex flex-1 items-start">
                            <input className="inline-flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 font-normal text-black outline-none transition placeholder:text-sm placeholder:font-normal placeholder:text-gray-500 focus:border-gray-800" />
                          </div>
                        </label>
                        <div className="mt-4 grid grid-cols-[1fr,180px] items-center">
                          <div className="flex flex-col ">
                            <label className="relative flex cursor-pointer items-center">
                              <PaperClipIcon className="mr-2 h-5" />
                              <span className="text-m font-semibold">
                                Підкріпити резюме
                              </span>
                              <input
                                accept="application/pdf"
                                size={10485760}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                              />
                            </label>
                            <span className="text-s mt-1 text-gray-400">Резюме має бути *.PDF розміром до 10 Мб.</span>
                          </div>
                          <div className="flex justify-end h-[33px]">
                            <Button variant="solid">Відправити</Button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </section>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section>
        <div className="pb-24">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
              } as React.CSSProperties
            }
          ></div>
        </div>
      </Section>
    </>
  )
}

Nurse.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Nurse
