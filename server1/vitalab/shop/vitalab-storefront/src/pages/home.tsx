import type { ReactElement } from "react"
import { Layout } from "@components/common"
import { Breadcrumbs, Button, Card, Heading, Section } from "@components/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@hooks/use-toast"
import { api } from "@utils/api"
import { useForm } from "react-hook-form"
import z from "zod"

interface IFormInputs {
  fullName: string
  phone: string
  comment: string
}

const schema = z.object({
  fullName: z.string().min(1, { message: "Заповніть ім'я" }),
  phone: z.string().min(1, { message: "Заповніть телефон" }),
  comment: z.string().or(z.number()).optional(),
})

const Home = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: zodResolver(schema),
  })
  const { toast } = useToast()
  const mutation = api.mail.nurseCall.useMutation({
    onSuccess: (data) => {
      reset()
      toast({
        // title: `${hit.title}`,
        description: <>Заявку успішно надіслано</>,
      })
    },
  })

  const onSubmit = (data: {
    fullName: string
    phone: string
    comment: string
  }) => {
    mutation.mutate(data)
  }

  return (
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
          <Breadcrumbs title="Виклик медсестри додому" />
          <div className="grid items-start gap-y-8 sm:grid-cols-2">
            <div
              className="section__row-layout"
              style={
                {
                  "--row-layout-gap": `var(--row-layout-gap-normal)`,
                } as React.CSSProperties
              }
            >
              <div className="grid max-w-[810px] gap-y-8 pl-4 pr-8">
                <Heading variant="pageHeading">
                  {/* className="max-w-[810px] pr-8 pl-4 text-3xl font-semibold leading-tight text-[#0a2540]" */}
                  Виклик медсестри додому
                </Heading>
              </div>
              <div className="grid auto-cols-fr gap-y-6 px-4">
                <Heading variant="sectionHeading">Як замовити послугу?</Heading>
                <ul className="my-1 grid grid-cols-1 gap-1 text-m">
                  <li className="relative pl-6">
                    <svg
                      className="absolute left-0 top-[3px] fill-orange-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g fillRule="evenodd">
                        <circle opacity=".15" cx="8" cy="8" r="8"></circle>
                        <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z"></path>
                      </g>
                    </svg>
                    Щоб здати аналізи вдома, заповніть форму або зателефонуйте.
                  </li>
                  <li className="relative pl-6">
                    <svg
                      className="absolute left-0 top-[3px] fill-orange-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g fillRule="evenodd">
                        <circle opacity=".15" cx="8" cy="8" r="8"></circle>
                        <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z"></path>
                      </g>
                    </svg>
                    Заявки на виклик приймаються у робочий час за телефонами:
                    <span className="inline-flex flex-col">
                      <a
                        className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
                        href="tel:+380673105227"
                      >
                        +38 (067) 310-52-27,
                      </a>
                      <a
                        className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
                        href="tel:+380503607575"
                      >
                        +38 (050) 360-75-75,
                      </a>
                      <a
                        className="ml-1 font-medium transition-opacity ease-hover hover:opacity-60"
                        href="tel:+380632510338"
                      >
                        +38 (063) 251-03-38,
                      </a>
                    </span>
                  </li>
                  <li className="relative pl-6">
                    <svg
                      className="absolute left-0 top-[3px] fill-orange-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g fillRule="evenodd">
                        <circle opacity=".15" cx="8" cy="8" r="8"></circle>
                        <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z"></path>
                      </g>
                    </svg>
                    Після заповнення електронної заявки на виклик, з Вами
                    зв&apos;яжеться наш менеджер, для уточнення всіх деталей.
                  </li>
                  <li className="relative pl-6 font-semibold">
                    <svg
                      className="absolute left-0 top-[3px] fill-orange-500"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g fillRule="evenodd">
                        <circle opacity=".15" cx="8" cy="8" r="8"></circle>
                        <path d="M11.41 4.93L6.64 9.54 5.38 8.18a.7.7 0 0 0-.87-.04.61.61 0 0 0-.18.8l1.5 2.45c.15.22.41.36.69.36.28 0 .53-.14.68-.36.24-.31 4.82-5.78 4.82-5.78.6-.6-.13-1.15-.6-.68z"></path>
                      </g>
                    </svg>
                    Електронна заявка вважається прийнятою тільки після того, як
                    наш менеджер зв&apos;яжеться з Вами і погодить всі деталі
                    виклику.
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
              <Card className="bg-white" shadow="large">
                <section className="w-full p-4">
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
                          htmlFor="phone"
                          className="mb-1 flex items-center text-m font-semibold text-gray-900 sm:mb-0 sm:mr-4 sm:basis-40"
                        >
                          Телефон
                        </label>
                        <div className="flex flex-1 items-start">
                          <div className="relative flex w-full flex-col">
                            <input
                              id="phone"
                              className="w-full rounded bg-gray-100 px-3 py-1.5 text-m text-slate-900"
                              placeholder="(555) 555-55-55"
                              {...register("phone")}
                            />
                            <p>{errors.phone?.message}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex w-full flex-col sm:flex-row">
                        <label
                          htmlFor="comment"
                          className="my-1 flex items-start text-m font-semibold text-gray-900 sm:mb-0 sm:mr-4 sm:basis-40"
                        >
                          Коментар
                        </label>
                        <div className="flex flex-1 items-start">
                          <div className="relative flex w-full flex-col">
                            <textarea
                              id="comment"
                              className="min-h-[64px] w-full resize-y rounded bg-gray-100 px-3 py-1.5 text-m text-gray-900"
                              autoComplete="off"
                              {...register("comment")}
                            />
                            <p>{errors.comment?.message}</p>
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
                </section>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Home
