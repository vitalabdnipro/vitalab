import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import { Layout } from "@components/common"
import { Card, Section } from "@components/ui"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Button, buttonVariants } from "@components/v2/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { medusaClient } from "@lib/config"
import LoginTemplate from "@modules/account/templates/login-template"
import Head from "@modules/common/components/head"
import { cn } from "@utils/cn"
import { useForm } from "react-hook-form"
// import Layout from "@modules/layout/templates"
import type { NextPageWithLayout } from "types/global"
import { z } from "zod"

const formSchema = z
  .object({
    email: z.string().email({ message: "Невірна адреса електронної пошти" }),
    password: z
      .string()
      .min(7, "Пароль повинен містити більше 7 символів")
      .max(20),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Паролі не співпадають",
  })

const Reset: NextPageWithLayout = () => {
  const router = useRouter()
  const { token } = router.query
  const [isChanged, setIsChanged] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  })

  // if (!token) {
  //   return notFound: true,
  // }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // mutation.mutate(credentials)
    const { email, password } = data
    try {
      medusaClient.customers
        .resetPassword({
          email,
          password,
          token,
        })
        .then(({ customer }) => {
          customer.id && setIsChanged(true)
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head title="Sign in" description="Sign in to your ACME account." />
      <Section>
        <div className="pb-16">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-small)`,
              } as React.CSSProperties
            }
          >
            <div className="mt-14 grid grid-cols-1 sm:mt-20 md:grid-cols-4">
              <div className="col-span-2 col-start-2 md:min-h-[530px]">
                <Card shadow="medium" className="bg-white">
                  <div className="flex w-full justify-center p-8">
                    <div className="flex w-full max-w-sm flex-col items-center">
                      {!isChanged ? (
                        <>
                          <h1 className="text-large-semi mb-10">
                            Зміна пароля
                          </h1>
                          <Form {...form}>
                            <form
                              className="w-full"
                              onSubmit={form.handleSubmit(onSubmit)}
                            >
                              <div className="flex w-full flex-col">
                                <FormField
                                  control={form.control}
                                  name="email"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Електронна пошта</FormLabel>
                                      <FormControl>
                                        <Input {...field} />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="mt-4 grid gap-4 md:grid-cols-2">
                                  <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Пароль</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>
                                          Підтвердити пароль
                                        </FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <Button className="mt-10 w-full">Змінити</Button>
                            </form>
                          </Form>
                        </>
                      ) : (
                        <div>
                          <h3 className="text-lg font-semibold">
                            Ви успішно змінили свій пароль
                          </h3>

                          <Link
                            href="/account/login"
                            className={cn(
                              "mt-6 w-full",
                              buttonVariants({ variant: "default" })
                            )}
                          >
                            Перейти в особистий кабінет
                          </Link>
                        </div>
                      )}
                    </div>
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

Reset.getLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default Reset
