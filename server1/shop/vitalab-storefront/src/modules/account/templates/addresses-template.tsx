import { useAccount } from "@lib/context/account-context"

import AddressBook from "../components/address-book"

const AddressesTemplate = () => {
  const { customer, retrievingCustomer } = useAccount()

  if (retrievingCustomer || !customer) {
    return null
  }

  return (
    <div className="w-full">
      <AddressBook customer={customer} />
    </div>
  )
}

export default AddressesTemplate
