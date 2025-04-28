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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/atoms/tabs"
import { BirthdayPicker } from "@components/molecules/birthday-picker"
import { Registration } from "@features/auth/registration"
import { medusaClient } from "@lib/config"
import { LOGIN_VIEW, useAccount } from "@lib/context/account-context"
import { useCheckout } from "@lib/context/checkout-context"
import Checkbox from "@modules/common/components/checkbox"
import ConnectForm from "@modules/common/components/connect-form"
import Spinner from "@modules/common/icons/spinner"
import { Edit, Info } from "lucide-react"
import { useMeCustomer } from "medusa-react"
import { Controller, useForm, type FieldValues } from "react-hook-form"

import BillingAddress from "../billing_address"
import ShippingAddress from "../shipping-address"

interface SignInCredentials extends FieldValues {
  email: string
  password: string
}

const Addresses = () => {
  const { customer, isLoading } = useMeCustomer()
  const { loginView, refetchCustomer } = useAccount()
  const [_, setCurrentView] = loginView
  const router = useRouter()
  const {
    // sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isEdit, toggle: setEdit },
    setAddresses,
    handleSubmit,
    cart,
    authError,
    authAccount,
    registrationError,
    setAuthError,
    createAccount,
  } = useCheckout()

  return (
    <div className="bg-white">
      <div className="text-xl-semi flex items-center gap-x-4 pb-6 pt-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-900 text-sm text-white">
          1
        </div>
        <h2 className="text-xl font-semibold text-vl-green-dark">
          Ваші контактні дані
        </h2>
      </div>
      {!customer ? (
        <div className="pb-0">
          <Tabs defaultValue="password" className="">
            <TabsList>
              <TabsTrigger
                value="account"
                onClick={() => {
                  setCurrentView(LOGIN_VIEW.REGISTER)
                  router.push("/account")
                }}
              >
                Я новий клієнт
              </TabsTrigger>
              <TabsTrigger value="password">Я постійний клієнт</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="border-none px-0 pb-0">
              <Registration />
            </TabsContent>
            <TabsContent value="password" className="border-none px-0 pb-0">
              <ConnectForm>
                {({
                  register,
                  control,
                  formState: { errors, touchedFields },
                }) => (
                  <div className="flex w-full flex-col gap-y-2">
                    <div className="mb-2 grid w-full items-center gap-1.5">
                      <Label htmlFor="email">Електронна пошта</Label>
                      <Input
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                        })}
                        // autoComplete="email"
                        errors={errors}
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="password">Пароль</Label>
                      <Input
                        id="password"
                        {...register("password", {
                          required: "Password is required",
                        })}
                        type="password"
                        errors={errors}
                      />
                    </div>
                    {authError && (
                      <div>
                        <span className="text-small-regular w-full text-rose-500">
                          {authError}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </ConnectForm>
              <Button
                className="mt-6 w-full"
                onClick={handleSubmit(authAccount)}
              >
                Увійти
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div>
          {isEdit ? (
            <div className="pb-4">
              <ShippingAddress />
              <div className="mt-6">
                <Button onClick={handleSubmit(setAddresses)}>Продовжити</Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-gray-50 px-5 py-6 text-xs">
                {cart && cart.shipping_address ? (
                  <div className="flex items-start gap-x-8">
                    <div className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-green-400 text-white">
                      ✓
                    </div>
                    <div className="flex w-full items-start justify-between">
                      <div className="flex flex-col">
                        <div className="flex flex-col gap-x-1 md:flex-row">
                          <div className="flex gap-x-1">
                            <span>{cart.shipping_address.last_name}</span>
                            <span>{cart.shipping_address.first_name}</span>
                            <span>
                              {cart.shipping_address?.metadata?.middle_name}
                            </span>
                          </div>
                          <span>
                            ({cart.shipping_address?.metadata?.birthday})
                          </span>
                        </div>
                        <div className="mt-4 flex flex-col">
                          <span>{cart.email}</span>
                          <span>{cart.shipping_address.phone}</span>
                        </div>
                      </div>
                      <div>
                        <button onClick={setEdit}>
                          <Edit className="h-5 w-5 text-gray-500 transition hover:text-slate-900" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Addresses
