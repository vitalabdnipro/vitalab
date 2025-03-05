import { useState } from "react"
import { useCustomerOrders } from "medusa-react"

export const useCustomerOrdersWithKey = (initialOffset = 1) => {
  const [offset, setOffset] = useState(initialOffset)
  const { orders, isLoading, ...rest } = useCustomerOrders({
    limit: offset,
    offset: 0,
    fields: "display_id,metadata",
  })

  console.log(offset)
  return {
    orders,
    isLoading,
    key: offset, // Add key prop based on offset state
    setOffset,
    ...rest,
  }
}
