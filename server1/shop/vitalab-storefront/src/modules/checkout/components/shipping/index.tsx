import React, { useEffect, useMemo } from "react"
import {
  LaboratorySelect,
  LaboratorySelectItem,
} from "@components/molecules/laboratory-select"
import { RadioGroup } from "@headlessui/react"
import { ErrorMessage } from "@hookform/error-message"
import { useCheckout } from "@lib/context/checkout-context"
import type { Cart } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import Spinner from "@modules/common/icons/spinner"
import clsx from "clsx"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import { Controller, useForm } from "react-hook-form"

import StepContainer from "../step-container"

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

const Shipping: React.FC<ShippingProps> = ({ cart }) => {
  const { addShippingMethod, setCart } = useCart()
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

    refetchShipping()
  }, [cart, refetch])

  const submitShippingOption = (soId: string) => {
    addShippingMethod.mutate(
      { option_id: soId },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () =>
          setError(
            "soId",
            {
              type: "validate",
              message:
                "An error occurred while adding shipping. Please try again.",
            },
            { shouldFocus: true }
          ),
      }
    )
  }

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value)
    fn(value)
  }

  // Memoized shipping method options
  const shippingMethods: ShippingOption[] = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => ({
        value: option.id,
        label: option.name,
        price: formatAmount({
          amount: option.amount || 0,
          region: cart.region,
        }),
      }))
    }

    return []
  }, [shipping_options, cart])

  const {
    sameAsBilling: { state: sameBilling },
  } = useCheckout()

  return (
    <StepContainer
      index={2}
      title="Лабораторія"
      closedState={
        <div className="text-small-regular pb-8">
          <p>Enter your address to see available delivery options.</p>
        </div>
      }
    >
      <Controller
        name="soId"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <div className="">
              <div className="w-full">
                <LaboratorySelect />
              </div>
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

export default Shipping
