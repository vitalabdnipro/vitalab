import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@components/atoms/button"
import { Error } from "@components/atoms/error"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import { PhoneInput } from "@components/atoms/phone-input"
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import { api } from "@utils/api"
import { generateOTP } from "@utils/generate-otp"
import { format, parse } from "date-fns"
import { useAtom, useSetAtom } from "jotai"
import { AlertCircle, Info } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { otpAtom, userDataAtom } from "stores/user-data-store"
import { z } from "zod"
import { Alert, AlertDescription } from "@components/v2/alert"

// const schema = z
//   .object({
//     last_name: z.string().min(1, "Необхідно вказати прізвище"),
//     first_name: z.string().min(1, "Необхідно вказати ім'я"),
//     middle_name: z.string().min(1, "Необхідно вказати по батькові"),
//     birthday: z.string(),
//     gender: z.string(),
//     email: z
//       .string()
//       .email({ message: "Невірна адреса електронної пошти" })
//       .min(1, "Необхідно вказати адресу електронної пошти"),
//     phone: z.string(),
//     password: z
//       .string()
//       .min(1, "Необхідно ввести пароль")
//       .min(7, "Пароль повинен містити більше 7 символів"),
//     // confirm_password: z.string().min(1, "Потрібне підтвердження пароля"),
//     confirm_password: z.string().min(1),
//   })
//   .refine((data) => data.password === data.confirm_password, {
//     path: ["password"],
//     message: "Паролі не співпадають",
//   })

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
    phone: z.string().min(1, "Заповніть номер телефону"),
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

export const RegistrationForm = ({ step, nextStep }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   trigger,
  //   control,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(schema),
  // })
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
  const setOtp = useSetAtom(otpAtom)

  const mutation = api.auth.otp.useMutation({
    onSuccess: (data) => {
      nextStep()
    },
    onError: (error) => {
      console.log(error.message)
    },
  })

  const onSubmit = async (data) => {
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

    setUserData({
      lastName: data.last_name,
      firstName: data.first_name,
      middleName: data.middle_name,
      birthday: data.birthday,
      gender: data.gender,
      email: data.email,
      password: data.password,
      phone: data.phone,
    })

    const otp: string = generateOTP()
    setOtp(otp)

    mutation.mutate({ phone: data.phone, otp })
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-y-6">
          <div className="flex flex-col gap-4 md:flex-row">
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
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>День народження</FormLabel>
                  <FormControl>
                    <BirthdayPicker
                      {...field}
                      id="birthday"
                      onSelect={(date: Date) =>
                        field.onChange(format(date, "dd.MM.yyyy"))
                      }
                      selected={parse(field.value, "dd.MM.yyyy", new Date())}
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
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон</FormLabel>
                <FormControl>
                  <PhoneInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 md:grid-cols-2">
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
                  <FormLabel>Підтвердити пароль</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
          <Link className="underline" href="https://vitalab.com.ua/privacy-policy.pdf">
            положення про обробку і захист персональних даних
          </Link>{" "}
          та
          <Link className="ml-1 underline" href="https://vitalab.com.ua/offer.pdf">
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
      {/* <div className="text-small-regular mt-6 text-center text-gray-700">
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Я вже зареєстрований
        </button>
      </div> */}
    </Form>
  )
}
