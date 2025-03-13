import { Text } from "@components/atoms/text"
import OrderOverview from "@features/account/components/order-overview"

const OrdersTemplate = () => {
  return (
    <div className="w-full">
      {/* <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Замовлення</h1>
        <p className="text-base-regular">
          Перегляньте свої попередні замовлення та отримані результати.
        </p>
      </div> */}
      {/* <Text as="h1" size="md" className="mb-6">
        Перегляньте свої попередні замовлення та отримані результати.
      </Text> */}

      <OrderOverview />

      {/* <Text as="p" size="sm" className="mt-6 pl-4">
        Перегляньте свої попередні замовлення та отримані результати.
      </Text> */}
    </div>
  )
}

export default OrdersTemplate
