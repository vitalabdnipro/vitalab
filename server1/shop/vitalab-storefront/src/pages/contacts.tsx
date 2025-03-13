import type { ReactElement } from "react"
import Link from "next/link"
import { Layout } from "@components/common"
import { Breadcrumbs, Button, Card, Map, Section, Text } from "@components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import Head from "@modules/common/components/head"
import { useForm } from "react-hook-form"
import type { NextPageWithLayout } from "types/global"
import z from "zod"

interface IFormInputs {
  fullName: string
  email: string
  question: string
}

const schema = z.object({
  fullName: z.string().min(1, { message: "Required" }),
  email: z.string().min(1, { message: "Required" }),
  question: z.string().min(1, { message: "Required" }),
})

const Contacts: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data) => console.log(data)

  return (
    <>
      <Head
        title="Контакти - українська медична лабораторія VitaLab"
        description="Медичні лабораторні дослідження у Дніпрі. Понад 400 аналізів. Європейське обладнання та стандарти якості."
      />
      <Section>
        <div className="pb-24 md:mt-0">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
              } as React.CSSProperties
            }
          >
            <Breadcrumbs title={"Контакти"} />
            <section>
              <Card className="bg-white" shadow="medium">
                <Map
                  zoom={17}
                  centers={[
                    {
                      lat: 48.46276399833014,
                      lng: 35.03132810385512,
                    },
                  ]}
                />
              </Card>
            </section>
            <div className="grid gap-y-8 sm:grid-cols-2">
              <div className="px-4">
                <div className="-mx-4 px-4">
                  <Text
                    variant="accentedHeading"
                    className="mb-2"
                    style={
                      {
                        "--title-padding-left": "0px",
                        "--title-padding-right": "0px",
                      } as React.CSSProperties
                    }
                  >
                    Лабораторія &quot;Vitalab&quot;
                  </Text>
                  <ul className="px-">
                    <li className="relative mb-4">
                      <div className="m-1 flex items-center pl-6">
                        <svg
                          className="absolute left-0 top-[7px]"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M3.54 8.04h4.42v4.43c0 .57.76.75 1.01.24l4.96-9.93a.54.54 0 0 0-.72-.72L3.3 7.03c-.5.25-.33 1.01.24 1.01"
                            fill="#0A2540"
                            fillRule="evenodd"
                          ></path>
                        </svg>
                        <span className="text-m font-normal leading-[1.65]">
                          вул. Херсонська, 10а (Медичний центр), 3 поверх,
                          Дніпро
                        </span>
                      </div>
                    </li>
                    <li className="relative mb-4">
                      <div className="m-1 flex items-center pl-6">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="absolute left-0 top-[5px] text-slate-900"
                        >
                          <path
                            d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          ></path>
                        </svg>

                        <ul className="text-m font-normal">
                          <li>Понеділок - п'ятниця з 8:00 до 18:00</li>
                          <li>Cубота з 8:00 до 16:00</li>
                          <li>Неділя вихідний</li>
                          <li className="">
                            Забір біоматеріалу з 8:00 до 12:00
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="relative mb-4">
                      <div className="m-1 flex items-center pl-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="absolute left-0 top-[3px] h-4 w-4"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                        <span className="text-m font-normal">
                          info@vitalab.com.ua
                        </span>
                      </div>
                    </li>
                    {[
                      "(050) 360-75-75",
                      "(063) 251-03-38",
                      "(067) 310-52-27",
                    ].map((phone) => {
                      return (
                        <li key={phone} className="relative">
                          <div className="m-1 flex items-center pl-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              width="16"
                              height="16"
                              className="absolute left-0 top-[3px] text-slate-900"
                            >
                              <path
                                fillRule="evenodd"
                                d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-m font-normal">{phone}</span>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
              <div className="">
                <Card className="bg-white" shadow="large">
                  <div className="p-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col">
                        <div className="flex w-full flex-col sm:flex-row">
                          <label
                            htmlFor="firstName"
                            className="mb-1 flex items-center text-m font-semibold text-gray-900 sm:mb-0 sm:mr-4 sm:basis-40"
                          >
                            Ім&apos;я
                          </label>
                          <div className="flex flex-1 items-start">
                            <div className="relative flex w-full flex-col">
                              <input
                                className="w-full rounded bg-gray-100 px-3 py-1.5 text-m text-gray-900"
                                placeholder="Тарас"
                                {...register("fullName")}
                              />
                              <p>{errors.fullName?.message}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex w-full flex-col sm:flex-row">
                          <label
                            htmlFor="firstName"
                            className="mb-1 flex items-center text-m font-semibold text-gray-900 sm:mb-0 sm:mr-4 sm:basis-40"
                          >
                            Електронна пошта
                          </label>
                          <div className="flex flex-1 items-start">
                            <div className="relative flex w-full flex-col">
                              <input
                                className="w-full rounded bg-gray-100 px-3 py-1.5 text-m text-gray-900"
                                placeholder="taras@example.com.ua"
                                {...register("email")}
                              />
                              <p>{errors.email?.message}</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex w-full flex-col sm:flex-row">
                          <label
                            htmlFor="firstName"
                            className="my-1 flex items-start text-m font-semibold text-gray-900 sm:mb-0 sm:mr-4 sm:basis-40"
                          >
                            Ваше запитання?
                          </label>
                          <div className="flex flex-1 items-start">
                            <div className="relative flex w-full flex-col">
                              <textarea
                                className="min-h-[64px] w-full resize-y rounded bg-gray-100 px-3 py-1.5 text-m text-gray-900"
                                placeholder="Опишіть Ваше питання чи проблему, і ми зв'яжемося з Вами."
                                autoComplete="off"
                                {...register("fullName")}
                              />
                              <p>{errors.question?.message}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-col sm:flex-row">
                        <div className="sm:ml-auto">
                          <Button variant="solid">Надіслати</Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

Contacts.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Contacts
