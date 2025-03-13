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
    // <div className="">
    //   {/* box-shadow: 0 2px 4px rgba(0,0,0,.06),0 4px 12px rgba(0,0,0,.08),0 0 0 1px rgba(0,0,0,.04); */}
    //   <section className="relative flex w-full flex-col rounded-[5px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]">
    //     {/* <div className="">
    //       <Text as="p" size="md" weight="semibold">
    //         Створіть профіль для члена сім&apos;ї
    //       </Text>
    //     </div> */}
    //     {/* border-t border-gray-200 rounded-b-[5px] */}
    //     <div className="text w-full rounded-[5px] bg-gray-50 p-8">
    //       <div className="">
    //         <Text as="p" size="md" weight="semibold">
    //           Створіть індивідуальний профіль для кожного члена сім&apos;ї
    //         </Text>
    //       </div>
    //       <div className="grid grid-cols-3 gap-5 pt-12">
    //         <AddProfile customer={customer} />
    //         {customer.shipping_addresses.map((address) => {
    //           // return <EditAddress address={address} key={address.id} />
    //           return (
    //             <ProfileCard
    //               customer={customer}
    //               address={address}
    //               key={address.id}
    //             />
    //           )
    //         })}
    //       </div>
    //     </div>
    //   </section>
    // </div>
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
        {/* <Text as="p" size="md" weight="semibold">
          Створіть профіль для члена сім&apos;ї
        </Text> */}
        <div className="flex flex-1 flex-col gap-2">
          <Text as="p" size="xl" weight="semibold">
            Родина
          </Text>
          <p className="text-sm">Створюйте профіль для кожного члена родини</p>
        </div>
        <div>
          {/* <Button type="secondary">
            Додати профіль <Plus size={20} className="ml-2"/>
          </Button> */}
          <AddProfile customer={customer} />
        </div>
      </div>
      <div className="grid gap-5 pt-8 md:grid-cols-3">
        {customer.shipping_addresses
          .filter((address) => address.metadata.main !== 1)
          .map((address) => {
            // return <EditAddress address={address} key={address.id} />
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
