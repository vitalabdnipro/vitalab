import React from "react"
import { Button } from "@components/atoms/button"
import { Text } from "@components/atoms/text/text"
import { AddProfile } from "@features/account/components/add-profile"
import { ProfileCard } from "@features/account/components/profile-card"
import { Customer } from "@medusajs/medusa"
import { cn } from "@utils/cn"
import { Plus } from "lucide-react"

import AddAddress from "../address-card/add-address"
import EditAddress from "../address-card/edit-address-modal"

type AddressBookProps = {
  customer: Omit<Customer, "password_hash">
}

const AddressBook: React.FC<AddressBookProps> = ({ customer }) => {
  console.log("xx",customer.shipping_addresses)
  return (
    <>
      <div
        className={cn(
          "flex flex-col justify-start gap-10 px-4 md:flex-row md:items-center",
          {
            "flex-col mt-10 [&>div]:items-center":
              customer.shipping_addresses.length === 0,
          }
        )}
      >
        <div className="flex flex-1 flex-col gap-2">
          <Text as="p" size="xl" weight="semibold">
            Родина
          </Text>
          <p className="text-sm">Створюйте профіль для кожного члена родини</p>
        </div>
        <div>
          <AddProfile customer={customer} />
        </div>
      </div>
      <div className="grid gap-5 pt-8 md:grid-cols-3">
        {customer.shipping_addresses
          .filter((address) => address.metadata.main !== 1)
          .map((address) => {
            return (
              <ProfileCard
                customer={customer}
                address={address}
                key={address.id}
              />
            )
          })}
      </div>
    </>
  )
}

export default AddressBook
