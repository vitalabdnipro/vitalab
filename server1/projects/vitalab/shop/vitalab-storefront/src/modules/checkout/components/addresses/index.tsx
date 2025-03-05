// import { Button } from "@components/ui/button2";

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
              {/* <ConnectForm>
                {({
                  register,
                  control,
                  formState: { errors, touchedFields },
                }) => (
                  <div className="flex w-full flex-col gap-y-4">
                    <div className="grid grid-cols-3 gap-x-2">
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="last_name">Прізвище</Label>
                        <Input
                          id="last_name"
                          {...register("last_name", {
                            required: "Прізвище обов’язкове",
                          })}
                          autoComplete="family-name"
                          errors={errors}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="last_name">Ім'я</Label>
                        <Input
                          id="first_name"
                          {...register("first_name", {
                            required: "Ім'я обов'язкове",
                          })}
                          autoComplete="given-name"
                          errors={errors}
                        />
                      </div>
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="last_name">По-батькові</Label>
                        <Input
                          id="middle_name"
                          {...register("middle_name", {
                            required: "По-батькові обов'язкове",
                          })}
                          autocomplete="off"
                          errors={errors}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="birthday">День народження</Label>
                        <Controller
                          control={control}
                          name="birthday"
                          render={({ field }) => (
                            <BirthdayPicker id="birthday" {...field} />
                          )}
                        />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="gender">Стать</Label>
                        <Controller
                          control={control}
                          name="gender"
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <Select
                              onValueChange={onChange}
                              value={value}
                              ref={ref}
                            >
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
                          required:
                            "Необхідно вказати адресу електронної пошти",
                        })}
                        // onChange={() => setAuthError(undefined)}
                        autoComplete="email"
                        errors={errors}
                      />
                      {registrationError && (
                        <div>
                          <span className="text-small-regular w-full text-rose-500">
                            Ця електронна пошта вже зареєстрована
                          </span>
                        </div>
                      )}
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
                        render={({ field }) => (
                          <PhoneInput id="phone" {...field} />
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="grid w-full items-center gap-1.5">
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
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="confirm_password">
                          Підтвердити пароль
                        </Label>
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
                              <span>{errors.confirm_password.message}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </ConnectForm>
              <Button
                className="mt-6 w-full"
                onClick={handleSubmit(createAccount)}
              >
                Продовжити
              </Button> */}
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
                {/* <Button variant="arrow" onClick={handleSubmit(setAddresses)}>
                  Продовжити{" "}
                  <svg
                    class="-mr-1 ml-2 mt-0.5 stroke-white stroke-2"
                    fill="none"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    aria-hidden="true"
                  >
                    <path
                      class="opacity-0 transition group-hover:opacity-100"
                      d="M0 5h7"
                    ></path>
                    <path
                      class="transition group-hover:translate-x-[3px]"
                      d="M1 1l4 4-4 4"
                    ></path>
                  </svg>
                </Button> */}
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

      {/* {isEdit ? (
        <div className="pb-4">
          <ShippingAddress />
          <div className="mt-6">
            <Button variant="arrow" onClick={handleSubmit(setAddresses)}>
              Продовжити{" "}
              <svg
                class="mt-0.5 ml-2 -mr-1 stroke-white stroke-2"
                fill="none"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                aria-hidden="true"
              >
                <path
                  class="opacity-0 transition group-hover:opacity-100"
                  d="M0 5h7"
                ></path>
                <path
                  class="transition group-hover:translate-x-[3px]"
                  d="M1 1l4 4-4 4"
                ></path>
              </svg>
            </Button>
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
                    <div className="flex gap-x-1">
                      <span>{cart.shipping_address.last_name}</span>
                      <span>{cart.shipping_address.first_name}</span>
                      <span>
                        {cart.shipping_address?.metadata?.middle_name}
                      </span>
                      <span>({cart.shipping_address?.metadata?.birthday})</span>
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
      )} */}
    </div>
  )
}

export default Addresses
