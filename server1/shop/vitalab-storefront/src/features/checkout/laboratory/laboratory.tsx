import React, { useEffect, useMemo } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"
import { ErrorMessage } from "@hookform/error-message"
import { medusaClient } from "@lib/config"
import { useCheckout } from "@lib/context/checkout-context"
import type { Cart } from "@medusajs/medusa"
import StepContainer from "@modules/checkout/components/step-container"
import { api } from "@utils/api"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import { Controller, useForm } from "react-hook-form"
import labs from "../../../../data/labs.json"
type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

type ShippingFormProps = {
  soId: string
}

const LaboratorySelect = (props: { field: any; handleChange: any }) => {
  const { field, handleChange } = props

  return (
    <Select
      onValueChange={(value: string) => handleChange(value, field.onChange)}
    >
      <SelectTrigger className="h-14">
        <SelectValue placeholder="Виберіть пункт забору біоматеріалу..." />
      </SelectTrigger>
      <SelectContent className="ml-6" align="end">
        {labs.map((lab: { label: string; address: string; value: string; disabled?: boolean }) => 
          !lab.disabled && (
            <SelectItem key={lab.value} value={lab.value}>
              <div>
                <div className="text-left">{lab.label}</div>
                <div className="text-left text-xs font-normal">{lab.address}</div>
              </div>
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  )
}

const Laboratory: React.FC<ShippingProps> = ({ cart }) => {
  const { addShippingMethod, setCart } = useCart()
  const mutation = api.cart.update.useMutation({
    onSuccess: async (x) => {
      medusaClient.carts
        .retrieve(x.cart.id)
        .then(({ cart }) => {
          setCart(cart)
          return cart
        })
        .catch(() => null)
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
    refetchShipping()
  }, [cart, refetch])

  const submitShippingOption = (id: string) => {
    mutation.mutate({
      id: cart?.id,
      metadata: { laboratory: id },
    })
  }

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value)
    fn(value)
  }

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
                />
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

export default Laboratory
