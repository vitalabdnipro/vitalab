import React, { useEffect, useMemo } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"
import { RadioGroup } from "@headlessui/react"
import { ErrorMessage } from "@hookform/error-message"
import { medusaClient } from "@lib/config"
import { useCheckout } from "@lib/context/checkout-context"
import type { Cart } from "@medusajs/medusa"
import StepContainer from "@modules/checkout/components/step-container"
import Radio from "@modules/common/components/radio"
import Spinner from "@modules/common/icons/spinner"
import { api } from "@utils/api"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import { Controller, useForm } from "react-hook-form"

type ShippingOption = {
  value: string
  label: string
  price: string
}

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

type ShippingFormProps = {
  soId: string
}

const labs = [
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, вул. Херсонська, 10а (медичний центр), 3 поверх",
    value: "1",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД №4'",
    address: "м. Дніпро, вул. Ламана, 4, 1 поверх, каб. 108",
    value: "2",
  },
  {
    label: "Аптека 'Таблєткін'",
    address: "м. Дніпро, пр. Богдана Хмельницького, 16",
    value: "3",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД #4'",
    address: "м. Дніпро, пр. Героїв, 22, 4 поверх",
    value: "4",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, бульвар Слави 8, 1 поверх, вхід зі сторони бульвару",
    value: "5",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, вул. Академіка Образцова 1",
    value: "6",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД #9'",
    address: "м. Дніпро, вул. Батумська, 13, 1 поверх",
    value: "7",
  },
  {
    label: "КП 'ДСКМЦМД ім. проф. М.Ф. РУДНЄВА' ДОР'",
    address:
      "м. Дніпро, пр. Л. Українки, 26, педіатричний корпус, 1 поверх, каб. № 14",
    value: "8",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД #2' ДОР'",
    address: "м. Дніпро, вул. Перемоги, 113, 1 поверх",
    value: "9",
  },
  {
    label: "КП 'ДБКЛ з надання психіатричної допомоги' ДОР'",
    address:
      "м. Дніпро, ж/м Ігрень, вул. Бехтерева 1, приймальне відділення, 1 поверх",
    value: "10",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "смт Слобожанське, вул. Будівельників, 16А",
    value: "11",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab' м. Нікополь",
    address: "м. Нікополь, вул. Пилипа Орлика, 46",
    value: "12",
  },
  {
    label: "КП НКП 'Криничанська ЦЛ' КСР'",
    address: "смт. Кринички, вул. Героїв Чорнобиля, 22, 1 поверх, каб. #4",
    value: "13",
  },
  {
    label: "НКП 'Солонянська ЦРЛ' ДОР'",
    address: "смт. Солоне, вул. Усенко, 13, 2 поверх",
    value: "14",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД №5'",
    address: "м. Дніпро, вул. Велика Діївська, 111, 1 поверх",
    value: "15",
  },
  {
    label: "КП 'ДОКОД' ДОР'",
    address: "м. Дніпро, вул. Гавриленка, 1 (мамологічний корп., 1 поверх)",
    value: "16",
  },
  {
    label: "Аптека 'Подорожник'",
    address: "м. Дніпро, пр. Дмитра Яворницького, 10",
    value: "17",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, пров. Вільний, 2А",
    value: "18",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, пр. Слобожанський, 60",
    value: "19",
  },
]

const LaboratorySelect = (props) => {
  const { field, handleChange } = props

  return (
    <Select
      onValueChange={(value: string) => handleChange(value, field.onChange)}
    >
      <SelectTrigger className="h-14">
        <SelectValue placeholder="Виберіть пункт забору біоматеріалу..." />
      </SelectTrigger>
      <SelectContent className="ml-6" align="end">
        {labs.map((lab: { label: string; address: string; value: string }) => (
          <SelectItem value={lab.value}>
            <div>
              <div className="text-left">{lab.label}</div>
              <div className="text-left text-xs font-normal">{lab.address}</div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const Laboratory: React.FC<ShippingProps> = ({ cart }) => {
  const { addShippingMethod, setCart } = useCart()
  const mutation = api.cart.update.useMutation({
    onSuccess: async (x) => {
      // console.log("x", x)
      medusaClient.carts
        .retrieve(x.cart.id)
        .then(({ cart }) => {
          setCart(cart)
          return cart
        })
        .catch(() => null)
      // cart.metadata.laboratory = "5"
      // setCart(cart)
    },
  })
  const {
    control,
    setError,
    formState: { errors },
  } = useForm<ShippingFormProps>({
    defaultValues: {
      soId: cart.shipping_methods?.[0]?.shipping_option_id,
    },
  })

  // Fetch shipping options
  const { shipping_options, refetch } = useCartShippingOptions(cart.id, {
    enabled: !!cart.id,
  })

  // Any time the cart changes we need to ensure that we are displaying valid shipping options
  useEffect(() => {
    const refetchShipping = async () => {
      await refetch()
    }
    // console.log("refetch")
    refetchShipping()
  }, [cart, refetch])

  const submitShippingOption = (id: string) => {
    mutation.mutate({
      id: cart?.id,
      metadata: { laboratory: id },
    })
    // addShippingMethod.mutate(
    //   { option_id: soId },
    //   {
    //     onSuccess: ({ cart }) => setCart(cart),
    //     onError: () =>
    //       setError(
    //         "soId",
    //         {
    //           type: "validate",
    //           message:
    //             "An error occurred while adding shipping. Please try again.",
    //         },
    //         { shouldFocus: true }
    //       ),
    //   }
    // )
    // console.log("mutattttttttttttion", cart)
  }

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value)
    fn(value)
  }

  // Memoized shipping method options
  //   const shippingMethods: ShippingOption[] = useMemo(() => {
  //     if (shipping_options && cart?.region) {
  //       return shipping_options?.map((option) => ({
  //         value: option.id,
  //         label: option.name,
  //         price: formatAmount({
  //           amount: option.amount || 0,
  //           region: cart.region,
  //         }),
  //       }))
  //     }

  //     return []
  //   }, [shipping_options, cart])

  const {
    sameAsBilling: { state: sameBilling },
  } = useCheckout()

  return (
    <StepContainer
      index={2}
      title="Пункт забору"
      closedState={
        <div className="text-s">
          <p>Заповніть контактні дані щоб побачити доступні пункти забору.</p>
        </div>
      }
    >
      <Controller
        name="soId"
        control={control}
        render={({ field }) => {
          return (
            <div className="">
              <div className="w-full">
                <LaboratorySelect
                  field={field}
                  handleChange={handleChange}
                  // value={cart}
                />
              </div>
              {/* <RadioGroup
                value={value}
                onChange={(value: string) => handleChange(value, onChange)}
              >
                {shippingMethods && shippingMethods.length ? (
                  shippingMethods.map((option) => {
                    return (
                      <RadioGroup.Option
                        key={option.value}
                        value={option.value}
                        className={clsx(
                          "flex items-center justify-between text-small-regular cursor-pointer py-4 border-b border-gray-200 last:border-b-0 px-8",
                          {
                            "bg-gray-50": option.value === value,
                          }
                        )}
                      >
                        <div className="flex items-center gap-x-4">
                          <Radio checked={value === option.value} />
                          <span className="text-base-regular">
                            {option.label}
                          </span>
                        </div>
                        <span className="justify-self-end text-gray-700">
                          {option.price}
                        </span>
                      </RadioGroup.Option>
                    )
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-900">
                    <Spinner />
                  </div>
                )}
              </RadioGroup> */}
              <ErrorMessage
                errors={errors}
                name="soId"
                render={({ message }) => {
                  return (
                    <div className="text-small-regular pt-2 text-rose-500">
                      <span>{message}</span>
                    </div>
                  )
                }}
              />
            </div>
          )
        }}
      />
    </StepContainer>
  )
}

export default Laboratory
