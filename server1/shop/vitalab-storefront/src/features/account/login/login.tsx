import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
// import { Button } from "@components/atoms/button"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import { PasswordInput } from "@components/atoms/password-input"
import { Button } from "@components/v2/button"
import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
// import Button from "@modules/common/components/button"
// import Input from "@modules/common/components/input"
import { useForm, type FieldValues } from "react-hook-form"
import { api } from "utils/api"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Login = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const mutation = api.customer.create.useMutation({
    onSuccess: () => {
      refetchCustomer()
      router.push("/account")
    },
  })

  const handleError = (_e: Error) => {
    setAuthError("Invalid email or password")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials) => {
    medusaClient.auth
      .authenticate(credentials)
      .then(() => {
        refetchCustomer()
        router.push("/account")
      })
      .catch(handleError)
  })

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <h1 className="mb-10 text-sm font-semibold md:text-lg">
        Увійти до особистого кабінету VitaLab
      </h1>
      {/* <p className="text-base-regular mb-8 text-center text-gray-700">
        Sign in to access an enhanced shopping experience.
      </p> */}
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex w-full flex-col gap-y-2">
          <div className="mb-2 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Електронна пошта</Label>
            <Input
              id="email"
              {...register("email", { required: "Email is required" })}
              //   autoComplete="email"
              errors={errors}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Пароль</Label>
            {/* <Input
              id="password"
              {...register("password", { required: "Password is required" })}
              type="password"
              //   autoComplete="current-password"
              errors={errors}
            /> */}
            <PasswordInput
              id="password"
              {...register("password", { required: "Password is required" })}
              //   autoComplete="current-password"
              errors={errors}
            />
          </div>
          <button
            // href="/reset"
            type="button"
            onClick={(e) => {
              setCurrentView(LOGIN_VIEW.RESET_PASSWORD)
            }}
            className="text-right text-s"
          >
            Нагадати пароль
          </button>
        </div>
        {authError && (
          <div>
            <span className="text-small-regular w-full text-rose-500">
              Ці облікові дані не збігаються з нашими записами
            </span>
          </div>
        )}
        <Button type="submit" className="mt-6 w-full">
          Увійти
        </Button>
      </form>
      <span className="text-small-regular mt-6 text-center text-gray-700">
        Вперше користуєтесь послугами Vitalab?
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Зареєструйте обліковий запис
        </button>
        .
      </span>
    </div>
  )
}

export { Login }
