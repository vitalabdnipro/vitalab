declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export const transformCategories = ({ category = {} }: { category: any }) => {
  if (!category) {
    return {}
  }

  const result: Record<string, string> = {}
  let index = 1

  while (category) {
    const key = `item_category${index === 1 ? "" : index}`
    result[key] = category?.name?.trim() || ""
    ;({ category } = category)
    index++
  }

  return result
}

export const eCommerce = ({
  event,
  cardId,
  data,
}: {
  event: string
  cardId: string
  data: Record<string, unknown>
}) => {
  const dataLayer = window.dataLayer
  let sentEvents = JSON.parse(
    localStorage.getItem("medusa-ecommerce-events") || "{}"
  )

  console.log("data", data)

  if (typeof window !== "undefined" && dataLayer && data && cardId) {
    if (cardId !== Object.keys(sentEvents)?.[0]) {
      sentEvents = {}
    }

    const eventKey = `${cardId}-${event}`

    if (!sentEvents[eventKey]?.includes(event)) {
      dataLayer.push({ ecommerce: null })
      dataLayer.push({
        event,
        ecommerce: data,
      })

      // This line updates the sentEvents object for the current cardId
      // If sentEvents[cardId] exists, it spreads its contents into a new array
      // If it doesn't exist, it creates a new array
      // Then it adds the current event to this array
      // This ensures that each cardId has a unique list of sent events
      sentEvents[cardId] = [...(sentEvents[cardId] || []), event]
      localStorage.setItem(
        "medusa-ecommerce-events",
        JSON.stringify(sentEvents)
      )
    }
  }
}

export const eCommerceCart = ({
  event,
  cardId,
  data,
}: {
  event: string
  cardId: string
  data: Record<string, unknown>
}) => {
  console.log("eCommerceCart", data)
  const dataLayer = window.dataLayer
  let sentEvents = JSON.parse(
    localStorage.getItem("medusa-ecommerce-events") || "{}"
  )

  if (typeof window !== "undefined" && dataLayer && data && cardId) {
    if (cardId !== Object.keys(sentEvents)?.[0]) {
      sentEvents = {}
    }

    // Проверяем, является ли событие checkout или completed
    if (event === "begin_checkout" || event === "purchase") {
      const eventKey = `${cardId}-${event}`

      // Проверяем, было ли это событие уже отправлено для данного cardId
      if (!sentEvents[cardId]?.[eventKey]) {
        dataLayer.push({ ecommerce: null })
        dataLayer.push({
          event,
          ecommerce: data,
        })

        console.log("sentEvents", sentEvents)
        // Отмечаем событие как отправленное
        sentEvents[cardId] = { ...(sentEvents[cardId] || {}), [eventKey]: true }
        localStorage.setItem(
          "medusa-ecommerce-events",
          JSON.stringify(sentEvents)
        )
      } else {
        console.log(`Event ${event} already sent for cardId: ${cardId}`)
      }
    } else {
      const productId = data.items?.[0]?.item_id
      if (!productId) {
        console.error("Product ID is missing in the data")
        return
      }

      const eventKey = `${cardId}-${event}-${productId}`

      if (!sentEvents[cardId]?.[eventKey]) {
        console.log("eventKey", eventKey)
        dataLayer.push({ ecommerce: null })
        dataLayer.push({
          event,
          ecommerce: data,
        })

        console.log("sentEvents", sentEvents)
        sentEvents[cardId] = { ...(sentEvents[cardId] || {}), [eventKey]: true }
        localStorage.setItem(
          "medusa-ecommerce-events",
          JSON.stringify(sentEvents)
        )
      } else {
        console.log("Event already sent:", eventKey)
      }
    }
  }
}
