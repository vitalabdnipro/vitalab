import React, { useState } from "react"
import Link from "next/link"
import { BirthdayInput } from "@components/atoms/birthday-input"
import { Button } from "@components/atoms/button"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import { PasswordInput } from "@components/atoms/password-input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/atoms/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"
import { BirthdayPicker } from "@components/molecules/birthday-picker"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@components/v2/alert"
import { zodResolver } from "@hookform/resolvers/zod"
import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Medusa from "@medusajs/medusa-js"
import { cn } from "@utils/cn"
import { format, parse } from "date-fns"
import { useAtom } from "jotai"
import { AlertCircle, Info } from "lucide-react"
import DatePicker from "react-datepicker"
import { Controller, useForm } from "react-hook-form"
import { userDataAtom } from "stores/user-data-store"
import { z } from "zod"

const formSchema = z
  .object({
    last_name: z.string().min(2, "Заповніть прізвище").max(50),
    first_name: z.string().min(2, "Заповніть ім'я").max(50),
    middle_name: z.string().min(2, "Заповніть по батькові").max(50),
    birthday: z.string({ required_error: "Заповніть дату народження" }),
    gender: z.enum(["female", "male"], {
      required_error: "Оберіть стать",
    }),
    // gender: z.string({
    //   required_error: "Please select an email to display.",
    // }),
    email: z.string().email({ message: "Невірна адреса електронної пошти" }),
    // .refine(
    //   async (id) => {
    //     // verify that ID exists in database
    //     return false
    //   },
    //   { message: "Користувач з такою адресою електронної пошти вже існує." }
    // ),
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

export const RegistrationForm = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      last_name: "",
      first_name: "",
      middle_name: "",
      birthday: undefined,
      gender: undefined,
      email: "",
      password: "",
      confirm_password: "",
    },
  })

  const { loginView } = useAccount()
  const [_, setCurrentView] = loginView
  const [userData, setUserData] = useAtom(userDataAtom)

  const { step, nextStep } = props

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const emailExists = await medusaClient.auth
      .exists(data.email)
      .then((res) => res.exists)

    if (emailExists) {
      form.setError("email", {
        type: "manual",
        message: "Користувач з такою адресою електронної пошти вже існує.",
      })
      return
    }

    console.log("data 2:", data)
    // setFormValues(values)
    setUserData({
      lastName: data.last_name,
      firstName: data.first_name,
      middleName: data.middle_name,
      birthday: data.birthday,
      gender: data.gender,
      email: data.email,
      password: data.password,
    })
    nextStep()
  }

  console.log("error", form.formState.errors)
  return (
    <div>
      <Form {...form}>
        <form
          className="flex w-full flex-col items-center"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1 className="text-large-semi mb-10">
            Створіть обліковий запис VitaLab
          </h1>
          <div className="flex w-full flex-col gap-y-7">
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Прізвище</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім&apos;я</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>По-батькові</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>День народження (ДД.ММ.РРРР)</FormLabel>
                    <FormControl>
                      {/* <BirthdayPicker
                        {...field}
                        id="birthday"
                        onSelect={(date: Date) =>
                          field.onChange(format(date, "dd.MM.yyyy"))
                        }
                        selected={parse(field.value, "dd.MM.yyyy", new Date())}
                      /> */}
                      <BirthdayInput
                        {...field}
                        mask="_"
                        id="birthday"
                        allowEmptyFormatting
                        // onValueChange={(values, sourceInfo) => {
                        //   const { formattedValue } = values
                        //   setValuesObj(values)
                        // }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Стать</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        // value={field.value}
                        defaultValue={field.value}
                        ref={field.ref}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="female">Жінка</SelectItem>
                          <SelectItem value="male">Чоловік</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
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
              {form.formState.errors.email &&
                form.formState.errors.email.type === "manual" && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="">
                      Перейдіть
                      <button
                        // href="/reset"
                        type="button"
                        onClick={() => {
                          setCurrentView(LOGIN_VIEW.RESET_PASSWORD)
                        }}
                        className="mx-1 items-center font-semibold underline"
                      >
                        сюди
                      </button>
                      та відновіть свій пароль.
                    </AlertDescription>
                  </Alert>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      {/* <Input {...field} /> */}
                      <PasswordInput {...field} />
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
                    <FormLabel>Підтвердити пароль</FormLabel>
                    <FormControl>
                      {/* <Input {...field} /> */}
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="last_name">Прізвище</Label>
                <Input
                  id="last_name"
                  {...register("last_name", {
                    required: "Прізвище обов’язкове",
                  })}
                  autoComplete="family-name"
                />
              </div> */}

            {/* <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="first_name">Ім&apos;я</Label>
              <Input
                id="first_name"
                {...register("first_name", { required: "Ім'я обов'язкове" })}
                autoComplete="given-name"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="middle_name">По-батькові</Label>
              <Input
                id="middle_name"
                {...register("middle_name", {
                  required: "По-батькові обов'язкове",
                })}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor="birthday">День народження</Label>
                <Controller
                  control={control}
                  name="birthday"
                  render={({ field }) => (
                    <BirthdayPicker
                      {...field}
                      id="birthday"
                      onSelect={(date: Date) =>
                        field.onChange(format(date, "dd.MM.yyyy"))
                      }
                      selected={parse(field.value, "dd.MM.yyyy", new Date())}
                    />
                  )}
                />
              </div>
              <div className="flex-1 space-y-1">
                <Label htmlFor="gender">Стать</Label>
                <Controller
                  control={control}
                  name="gender"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select onValueChange={onChange} value={value} ref={ref}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Оберіть стать..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Жінка</SelectItem>
                        <SelectItem value="male">Чоловік</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Електронна пошта</Label>
              <Input
                id="email"
                {...register("email", {
                  required: "Необхідно вказати адресу електронної пошти",
                })}
                autoComplete="email"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  {...register("password", {
                    required: "Необхідно ввести пароль",
                  })}
                  type="password"
                  autoComplete="new-password"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="confirm_password">Підтвердити пароль</Label>
                <Input
                  id="confirm_password"
                  {...register("confirm_password", {
                    required: "Необхідно підтвердити пароль",
                  })}
                  type="password"
                  // autoComplete="new-password"
                />
              </div>
              {errors.confirm_password && (
                <div className="col-span-2">
                  <div className="flex text-center text-sm text-red-600">
                    <div>
                      <Info className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="ml-2">
                      <b className="mr-2 font-bold">Помилка:</b>
                      {errors.confirm_password.message}
                    </div>
                  </div>
                </div>
              )}
            </div> */}
          </div>
          {/* {authError && (
          <div>
            <span className="text-small-regular w-full text-rose-500">
              These credentials do not match our records
            </span>
          </div>
        )} */}
          <span className="text-small-regular mt-6 text-center text-gray-700">
            Реєструючись, ви погоджуєтеся з умовами{" "}
            <Link
              className="underline"
              href="https://vitalab.com.ua/privacy-policy.pdf"
            >
              положення про обробку і захист персональних даних
            </Link>{" "}
            та
            <Link
              className="ml-1 underline"
              href="https://vitalab.com.ua/offer.pdf"
            >
              угодою користувача
            </Link>
            .
          </span>
          <Button
            className="mt-6 w-full"
            // onClick={async () => {
            //   // setOpen(true)
            //   // const promise = await trigger()
            // }}
          >
            Продовжити
          </Button>

          {/* <TermsModal onSubmit={onSubmit} isOpen={open} setIsOpen={setOpen} /> */}
        </form>
        <div className="text-small-regular mt-6 text-center text-gray-700">
          <button
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="underline"
          >
            Я вже зареєстрований
          </button>
        </div>
      </Form>
    </div>
  )
}
