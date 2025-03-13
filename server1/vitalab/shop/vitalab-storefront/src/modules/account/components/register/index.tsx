import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Label } from "@components/atoms/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"
import { BirthdayPicker } from "@components/molecules/birthday-picker"
import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
import { Controller, useForm, type FieldValues } from "react-hook-form"
import { api } from "utils/api"

interface RegisterCredentials extends FieldValues {
  last_name: string
  first_name: string
  middle_name: string
  birthday: string
  gender: string
  email: string
  password: string
  phone: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()
  // const mutation = trpc.customer.update.useMutation({
  //   onSuccess: () => {
  //     // console.log(refetchCustomer);
  //     // refetchCustomer();
  //     router.push("/account");
  //     console.log("test");
  //     // router.push("/account");
  //   },
  //   // onError: (error) => {
  //   //   console.log("ggggg", error.message);
  //   // },
  // });
  const mutation = api.customer.create.useMutation({
    onSuccess: (data) => {
      console.log(data)
      refetchCustomer()
      medusaClient.auth.authenticate({
        email: data.email,
        password: data.password,
      })
      router.push("/account")
    },
    onError: (error) => {
      console.log("ggggg", error.message)
    },
  })

  const handleError = (e: Error) => {
    setAuthError("An error occured. Please try again.")
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterCredentials>()

  // const onSubmit = handleSubmit(async (credentials) => {
  //   medusaClient.customers
  //     .create(credentials)
  //     .then((e) => {
  //       mutation.mutate({ id: e.customer.id });
  //       //
  //     })
  //     .catch(handleError);
  // });

  const onSubmit = handleSubmit(async (credentials) => {
    console.log(credentials)
    mutation.mutate(credentials)
  })

  return (
    <div className="flex max-w-sm flex-col items-center">
      <h1 className="text-large-semi mb-10">
        Створіть обліковий запис VitaLab
      </h1>
      {/* <p className="text-base-regular mb-4 text-center text-gray-700">
        Створити обліковий запис
      </p> */}
      <form className="flex w-full flex-col" onSubmit={onSubmit}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Прізвище"
            {...register("last_name", { required: "Прізвище обов’язкове" })}
            autoComplete="family-name"
            errors={errors}
          />
          <Input
            label="Ім'я"
            {...register("first_name", { required: "Ім'я обов'язкове" })}
            autoComplete="given-name"
            errors={errors}
          />
          <Input
            label="По батькові"
            {...register("middle_name", {
              required: "По батькові обов'язкове",
            })}
            autoComplete="given-name"
            errors={errors}
          />
          <div className="flex gap-2">
            <div className="flex-1 space-y-2">
              <Label htmlFor="birthday">День народження</Label>
              <Controller
                control={control}
                name="birthday"
                render={({ field }) => (
                  <BirthdayPicker {...field} id="birthday" />
                )}
              />
            </div>
            <div className="flex-1 space-y-2">
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
          <Input
            label="Електронна пошта"
            {...register("email", {
              required: "Необхідно вказати адресу електронної пошти",
            })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Телефон"
            {...register("phone", {
              required: "Необхідно вказати телефон",
            })}
            autoComplete="tel"
            errors={errors}
          />
          <Input
            label="Пароль"
            {...register("password", {
              required: "Password is required",
            })}
            type="password"
            autoComplete="new-password"
            errors={errors}
          />
        </div>
        {authError && (
          <div>
            <span className="text-small-regular w-full text-rose-500">
              Ці облікові дані не збігаються з нашими записами
            </span>
          </div>
        )}
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
        <Button className="mt-6">Зареєструватись</Button>
      </form>
      <span className="text-small-regular mt-6 text-center text-gray-700">
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Я вже зареєстрований
        </button>
      </span>
    </div>
  )
}

export default Register
