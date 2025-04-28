import { Text } from "@components/atoms/text"
import { useAccount } from "@lib/context/account-context"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"
import ProfilePassword from "@modules/account/components/profile-password"

import ProfileBillingAddress from "../components/profile-billing-address"
import ProfilePhone from "../components/profile-phone"

const ProfileTemplate = () => {
  const { customer, retrievingCustomer, refetchCustomer } = useAccount()

  if (retrievingCustomer || !customer) {
    return null
  }
  console.log(customer)
  return (
    <div className="flex w-full flex-1 flex-col rounded-[5px] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)]">
      <div className="p-6">
        <div className="mb-8 flex flex-col gap-y-4">
          <Text as="p" size="sm">
            Переглядайте та оновлюйте Вашу інформацію, включаючи персональні
            дані, електронну адресу та номер телефону. Ви також можете змінити
            свій пароль.
          </Text>
        </div>
        <div className="flex w-full flex-col gap-y-8">
          <ProfileName customer={customer} />
          <Divider />
          <ProfileEmail customer={customer} />
          <Divider />
          <ProfilePhone customer={customer} />
          <Divider />
          <ProfilePassword customer={customer} />
        </div>
      </div>
    </div>
  )
}

const Divider = () => {
  return <div className="h-px w-full bg-gray-100" />
}

export default ProfileTemplate
