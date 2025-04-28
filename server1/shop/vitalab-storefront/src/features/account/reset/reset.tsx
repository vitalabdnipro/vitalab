import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Button } from "@components/atoms/button"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import { useForm, type FieldValues } from "react-hook-form"
import { api } from "utils/api"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const ResetPassword = () => {
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const [authError, setAuthError] = useState<string | undefined>(undefined)
  const router = useRouter()

  const mutation = api.customer.generatePasswordToken.useMutation({
    // onSuccess: () => {
    //   refetchCustomer()
    //   router.push("/account")
    // },
  })

  const handleError = (_e: Error) => {
    setAuthError("Invalid email or password")
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInCredentials>()

  const onSubmit = handleSubmit(async (credentials: { email: string }) => {
    // mutation.mutate(credentials)
    await medusaClient.customers.generatePasswordToken({
      email: credentials.email,
    })
  })

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <h1 className="text-large-semi mb-10">
        Відновлення пароля від особистого кабінету
      </h1>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex w-full flex-col">
          <div className="mb-2 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Електронна пошта</Label>
            <Input
              id="email"
              {...register("email", { required: "Email is required" })}
              //   autoComplete="email"
              errors={errors}
            />
          </div>
        </div>
        {authError && (
          <div>
            <span className="text-small-regular w-full text-rose-500">
              Ці облікові дані не збігаються з нашими записами
            </span>
          </div>
        )}
        <Button className="mt-6 w-full">Відновити</Button>
      </form>
      <span className="text-small-regular mt-6 text-center text-gray-700">
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline"
        >
          Я згадав свій пароль
        </button>
      </span>
    </div>
  )
}

export { ResetPassword }
