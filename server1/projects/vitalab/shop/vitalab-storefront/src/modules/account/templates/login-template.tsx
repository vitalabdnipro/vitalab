import { useEffect } from "react"
import { useRouter } from "next/router"
import { Login, Register, ResetPassword } from "@features/account"
import { UserData } from "@features/account/register/user-data"
import { useAccount } from "@lib/context/account-context"
import { Registration } from "@features/account/register/registration"

const LoginTemplate = () => {
  const { loginView, customer, retrievingCustomer } = useAccount()
  const [currentView, _] = loginView

  const router = useRouter()

  useEffect(() => {
    if (!retrievingCustomer && customer) {
      router.push("/account/orders")
    }
  }, [customer, retrievingCustomer, router])

  return (
    <div className="flex w-full justify-center p-8">
      {currentView === "sign-in" ? (
        <Login />
      ) : currentView !== "reset-password" ? (
        <Registration />
      ) : (
        <ResetPassword />
      )}
    </div>
  )
}

export default LoginTemplate
