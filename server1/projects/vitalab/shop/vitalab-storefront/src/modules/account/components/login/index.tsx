import { useState } from "react"
import { useRouter } from "next/router"
import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import Button from "@modules/common/components/button"
import Input from "@modules/common/components/input"
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
      <h1 className="text-large-semi mb-6 uppercase">Welcome back</h1>
      <p className="text-base-regular mb-8 text-center text-gray-700">
        Sign in to access an enhanced shopping experience.
      </p>
      <form className="w-full" onSubmit={onSubmit}>
        <div className="flex w-full flex-col gap-y-2">
          <Input
            label="Email"
            {...register("email", { required: "Email is required" })}
            autoComplete="email"
            errors={errors}
          />
          <Input
            label="Password"
            {...register("password", { required: "Password is required" })}
            type="password"
            autoComplete="current-password"
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
        <Button className="mt-6">Enter</Button>
      </form>
      <span className="text-small-regular mt-6 text-center text-gray-700">
        Not a member?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline"
        >
          Join us
        </button>
        .
      </span>
    </div>
  )
}

export default Login
