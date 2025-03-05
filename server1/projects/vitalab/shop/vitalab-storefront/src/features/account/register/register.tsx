import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "@components/atoms/button"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/molecules/dialog"
import { TermsModal } from "@features/account/components/terms-modal/terms-modal"
import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import { Info } from "lucide-react"
// import Button from "@modules/common/components/button"
// import Input from "@modules/common/components/input"
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
  confirm_password: string
  phone: string
}

const Register = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()
  const [open, setOpen] = useState(false)

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
      // medusaClient.auth.authenticate({
      //   email: data.email,
      //   password: data.password,
      // })
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
    trigger,
    control,
    formState: { errors },
    setError,
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
    if (credentials.password !== credentials.confirm_password) {
      setError("confirm_password", {
        type: "validate",
        message: "Паролі не співпадають",
      })
      return
    }
    mutation.mutate(credentials)
  })

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-large-semi mb-10">
        Створіть обліковий запис VitaLab
      </h1>
      {/* <p className="text-base-regular mb-4 text-center text-gray-700">
        Створити обліковий запис
      </p> */}
      <form className="flex w-full flex-col" onSubmit={onSubmit}>
        <div className="flex w-full flex-col gap-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="last_name">Прізвище</Label>
            <Input
              id="last_name"
              {...register("last_name", { required: "Прізвище обов’язкове" })}
              autoComplete="family-name"
              errors={errors}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="first_name">Ім'я</Label>
            <Input
              id="first_name"
              {...register("first_name", { required: "Ім'я обов'язкове" })}
              autoComplete="given-name"
              errors={errors}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="middle_name">По-батькові</Label>
            <Input
              id="middle_name"
              {...register("middle_name", {
                required: "По-батькові обов'язкове",
              })}
              errors={errors}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1 space-y-1">
              <Label htmlFor="birthday">День народження</Label>
              <Controller
                control={control}
                name="birthday"
                render={({ field }) => (
                  <BirthdayPicker id="birthday" {...field} />
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
              errors={errors}
            />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="phone">Телефон</Label>
            <Controller
              control={control}
              name="phone"
              // rules={{
              //   pattern: {
              //     value:
              //     // ^\+38\s\d{3}\s\d{3}\s\d{2}\s\d{2}$

              //       /^(?:\+38)[" "](\(?\d{3}\)[" "][0-9]{3}[-][0-9]{2}[-][0-9]{2})$/i,
              //     message: "Введіть номер телефону",
              //   },
              // }}
              render={({ field }) => <PhoneInput id="phone" {...field} />}
            />
            {/* <Input
              id="phone"
              {...register("phone", {
                required: "Необхідно вказати телефон",
              })}
              autoComplete="tel"
              errors={errors}
            /> */}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                {...register("password", {
                  required: "Необхідно ввести пароль",
                })}
                type="password"
                autoComplete="new-password"
                errors={errors}
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
                errors={errors}
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
          </div>
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
        <Button
          className="mt-6"
          onClick={async () => {
            setOpen(true)
            // const promise = await trigger()
          }}
        >
          Зареєструватись
        </Button>

        <TermsModal onSubmit={onSubmit} isOpen={open} setIsOpen={setOpen} />
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

export { Register }
