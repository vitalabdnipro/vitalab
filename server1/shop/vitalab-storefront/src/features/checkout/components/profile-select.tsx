import { Fragment, useMemo, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/atoms/select"
import { Listbox, Transition } from "@headlessui/react"
import { useCheckout } from "@lib/context/checkout-context"
import { Address } from "@medusajs/medusa"
import Radio from "@modules/common/components/radio"
import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import { isEqual, omit } from "lodash"
import { User } from "lucide-react"
import { useWatch } from "react-hook-form"

type AddressSelectProps = {
  addresses: Address[]
}

export const ProfileSelect = ({ addresses }: AddressSelectProps) => {
  const [selected, setSelected] = useState<string | undefined>(undefined)

  const { control, setSavedAddress } = useCheckout()

  const handleSelect = (id: string) => {
    const savedAddress = addresses.find((a) => a.id === id)

    if (savedAddress) {
      setSavedAddress(savedAddress)
    }

    setSelected(id)
  }

  const currentShippingAddress = useWatch({
    control,
    name: "shipping_address",
  })

  const selectedAddress = useMemo(() => {
    for (const address of addresses) {
      const checkEquality = isEqual(
        omit(address, [
          "id",
          "created_at",
          "updated_at",
          "country",
          "deleted_at",
          "metadata",
          "customer_id",
        ]),
        currentShippingAddress
      )

      if (checkEquality) {
        return address
      }
    }
  }, [currentShippingAddress, addresses])
  
  return (
    <Select onValueChange={handleSelect} value={selected}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Власник аккаунта" />
      </SelectTrigger>
      <SelectContent>
        {addresses.map((address) => (
          <SelectItem value={address.id} key={address.id}>
            <div className="flex items-center">
              {address.last_name} {address.first_name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
