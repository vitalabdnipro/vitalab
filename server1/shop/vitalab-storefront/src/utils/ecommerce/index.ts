declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

/**
 * Transform category tree into a format suitable for e-commerce tracking
 * @param {Object} params - Parameters object
 * @param {Record<string, any>} [params.category={}] - Category tree object
 * @returns {Record<string, string>} Transformed categories
 */
export const transformCategories = ({ 
  category = {} 
}: { 
  category?: Record<string, any> 
}): Record<string, string> => {
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

/**
 * Track e-commerce events using dataLayer
 * @param {Object} params - Parameters object
 * @param {string} params.event - Event name
 * @param {string} params.cardId - Cart ID
 * @param {Record<string, unknown>} params.data - Event data
 */
export const eCommerce = ({
  event,
  cardId,
  data,
}: {
  event: string
  cardId: string
  data: Record<string, unknown>
}): void => {
  try {
    if (typeof window === "undefined") return;

    const dataLayer = window.dataLayer;
    if (!dataLayer || !data || !cardId) return;

    const storageKey = typeof window !== "undefined" && window.process?.env?.NEXT_PUBLIC_ECOMMERCE_STORAGE_KEY 
      ? window.process.env.NEXT_PUBLIC_ECOMMERCE_STORAGE_KEY 
      : "medusa-ecommerce-events";

    let sentEvents = {};
    try {
      sentEvents = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (error) {
      // If parsing fails, start with empty object
      sentEvents = {};
    }

    if (cardId !== Object.keys(sentEvents)?.[0]) {
      sentEvents = {};
    }

    const eventKey = `${cardId}-${event}`;

    if (!sentEvents[eventKey]?.includes(event)) {
      dataLayer.push({ ecommerce: null });
      dataLayer.push({
        event,
        ecommerce: data,
      });

      // This line updates the sentEvents object for the current cardId
      // If sentEvents[cardId] exists, it spreads its contents into a new array
      // If it doesn't exist, it creates a new array
      // Then it adds the current event to this array
      // This ensures that each cardId has a unique list of sent events
      sentEvents[cardId] = [...(sentEvents[cardId] || []), event];

      try {
        localStorage.setItem(storageKey, JSON.stringify(sentEvents));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    }
  } catch (error) {
    console.error("Error in eCommerce tracking:", error);
  }
}

/**
 * Track e-commerce cart events using dataLayer
 * @param {Object} params - Parameters object
 * @param {string} params.event - Event name
 * @param {string} params.cardId - Cart ID
 * @param {Record<string, unknown>} params.data - Event data
 */
export const eCommerceCart = ({
  event,
  cardId,
  data,
}: {
  event: string
  cardId: string
  data: Record<string, unknown>
}): void => {
  try {
    if (typeof window === "undefined") return;

    const dataLayer = window.dataLayer;
    if (!dataLayer || !data || !cardId) return;

    const storageKey = "medusa-ecommerce-events";

    let sentEvents = {};
    try {
      sentEvents = JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch (error) {
      // If parsing fails, start with empty object
      sentEvents = {};
    }

    if (cardId !== Object.keys(sentEvents)?.[0]) {
      sentEvents = {};
    }

    // Check if the event is checkout or purchase
    if (event === "begin_checkout" || event === "purchase") {
      const eventKey = `${cardId}-${event}`;

      // Check if this event has already been sent for this cardId
      if (!sentEvents[cardId]?.[eventKey]) {
        dataLayer.push({ ecommerce: null });
        dataLayer.push({
          event,
          ecommerce: data,
        });

        // Mark the event as sent
        sentEvents[cardId] = { ...(sentEvents[cardId] || {}), [eventKey]: true };

        try {
          localStorage.setItem(storageKey, JSON.stringify(sentEvents));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    } else {
      // For other events, we need the product ID
      const productId = data.items?.[0]?.item_id;
      if (!productId) {
        console.error("Product ID is missing in the data");
        return;
      }

      const eventKey = `${cardId}-${event}-${productId}`;

      if (!sentEvents[cardId]?.[eventKey]) {
        dataLayer.push({ ecommerce: null });
        dataLayer.push({
          event,
          ecommerce: data,
        });

        sentEvents[cardId] = { ...(sentEvents[cardId] || {}), [eventKey]: true };

        try {
          localStorage.setItem(storageKey, JSON.stringify(sentEvents));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    }
  } catch (error) {
    console.error("Error in eCommerceCart tracking:", error);
  }
}
