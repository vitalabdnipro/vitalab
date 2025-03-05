import React, { useEffect, useState } from "react"
import { medusaClient } from "@lib/config"
import useEnrichedLineItems from "@lib/hooks/use-enrich-line-items"
import { Address, Order } from "@medusajs/medusa"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OrderDetails from "@modules/order/components/order-details"
import OrderSummary from "@modules/order/components/order-summary"
import PaymentDetails from "@modules/order/components/payment-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import { useQuery } from "@tanstack/react-query"
import { eCommerceCart, transformCategories } from "@utils/ecommerce"
import { MapPin, Pin, PinIcon } from "lucide-react"
import { useCart, useUpdateCart } from "medusa-react"

type OrderCompletedTemplateProps = {
  order: Order
}

const labs = [
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, вул. Херсонська, 10а (медичний центр), 3 поверх",
    value: "1",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД №4'",
    address: "м. Дніпро, вул. Ламана, 4, 1 поверх, каб. 108",
    value: "2",
  },
  {
    label: "Аптека 'Таблєткін'",
    address: "м. Дніпро, пр. Богдана Хмельницького, 16",
    value: "3",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД #4'",
    address: "м. Дніпро, пр. Героїв, 22, 4 поверх",
    value: "4",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, бульвар Слави 8, 1 поверх, вхід зі сторони бульвару",
    value: "5",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, вул. Академіка Образцова 1",
    value: "6",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД #9'",
    address: "м. Дніпро, вул. Батумська, 13, 1 поверх",
    value: "7",
  },
  {
    label: "КП 'ДСКМЦМД ім. проф. М.Ф. РУДНЄВА' ДОР'",
    address:
      "м. Дніпро, пр. Л. Українки, 26, педіатричний корпус, 1 поверх, каб. № 14",
    value: "8",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД #2' ДОР'",
    address: "м. Дніпро, вул. Перемоги, 113, 1 поверх",
    value: "9",
  },
  {
    label: "КП 'ДБКЛ з надання психіатричної допомоги' ДОР'",
    address:
      "м. Дніпро, ж/м Ігрень, вул. Бехтерева 1, приймальне відділення, 1 поверх",
    value: "10",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "смт Слобожанське, вул. Будівельників, 16А",
    value: "11",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab' м. Нікополь",
    address: "м. Нікополь, вул. Пилипа Орлика, 46",
    value: "12",
  },
  {
    label: "КП НКП 'Криничанська ЦЛ' КСР'",
    address: "смт. Кринички, вул. Героїв Чорнобиля, 22, 1 поверх, каб. #4",
    value: "13",
  },
  {
    label: "НКП 'Солонянська ЦРЛ' ДОР'",
    address: "смт. Солоне, вул. Усенко, 13, 2 поверх",
    value: "14",
  },
  {
    label: "Амбулаторія КНП 'ДЦПМСД №5'",
    address: "м. Дніпро, вул. Велика Діївська, 111, 1 поверх",
    value: "15",
  },
  {
    label: "КП 'ДОКОД' ДОР'",
    address: "м. Дніпро, вул. Гавриленка, 1 (мамологічний корп., 1 поверх)",
    value: "16",
  },
  {
    label: "Аптека 'Подорожник'",
    address: "м. Дніпро, пр. Дмитра Яворницького, 10",
    value: "17",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, пров. Вільний, 2А",
    value: "18",
  },
  {
    label: "Діагностичний лабораторний центр 'VitaLab'",
    address: "м. Дніпро, пр. Слобожанський, 60",
    value: "19",
  },
]

const Location = ({ cart }) => {
  const location = labs[cart?.metadata?.laboratory - 1]
  return (
    <div className="flex items-center">
      <div>
        <MapPin className="mr-2 h-8 w-8" />
      </div>
      <div className="text-sm">
        {/* Чекаємо на Вас за адресою: */}
        <div className="font-semibold">{location?.label}</div>
        <div className="text-xs leading-5">{location?.address}</div>
      </div>
    </div>
  )
}

const fetchCart = async (id: string) => {
  return await medusaClient.carts.retrieve(id).then(({ cart }) => cart)
}

const OrderCompletedTemplate: React.FC<OrderCompletedTemplateProps> = ({
  order,
}) => {
  const updateCart = useUpdateCart(order.cart_id)
  const [showItems, setShowItems] = useState("")
  const { isSuccess, data, isLoading, isError } = useQuery(
    ["get_cart", order.cart_id],
    () => fetchCart(order.cart_id)
  )
  const enrichedItems = useEnrichedLineItems(order.items, order.cart_id)

  // updateCart.mutate({
  //   metadata: {
  //     marketing: true,
  //   },
  // })
  console.log(data?.context, "data context")
  useEffect(() => {
    if (
      !order?.cart_id ||
      !enrichedItems?.length ||
      data?.context?.marketing ||
      isLoading
    ) {
      console.log("already updated", data?.context?.marketing)

      return
    }

    console.log("updating marketing")
    updateCart.mutate({
      context: {
        marketing: true,
      },
    })

    // console.log("enrichedItems", enrichedItems)

    eCommerceCart({
      cardId: order.cart_id,
      event: "purchase",
      data: {
        transaction_id: 3330011000 + order.display_id, // Номер замовлення
        affiliation: "cart", // Значення cart, якщо замовлення з кошика
        value: (order.total / 100).toFixed(2), // Загальна сума замовлення. Розділення для копійок має бути у вигляді крапки
        tax: "0",
        shipping: "0",
        currency: "UAH",
        items: enrichedItems.map((item) => ({
          item_name: item.title,
          item_id: item.variant.product.mid_code,
          price: (item.unit_price / 100).toFixed(2),
          item_brand: "Vitalab",
          quantity: 1,
          ...transformCategories(
            item.variant.product.metadata?.category_tree as any
          ),
        })),
      },
    })
  }, [order.cart_id, enrichedItems, data?.context?.marketing, isLoading])

  return (
    // <div className="grid grid-cols-4">
    //   {/* <div className="content-container flex justify-center"> */}
    //   <div className="col-span-2 col-start-2 rounded-lg border bg-white shadow-lg">
    <div className="">
      <OrderDetails
        order={order}
        showItems={showItems}
        setShowItems={setShowItems}
      />
      <Items order={order} cartId={order.cart_id} showItems={showItems} />
      {/* <div className="grid grid-cols-1 gap-4 border-b border-gray-200 p-10 lg:grid-cols-2">
            <PaymentDetails
              payments={order.payments}
              paymentStatus={order.payment_status}
            />
            <ShippingDetails
              shippingMethods={order.shipping_methods}
              address={order.shipping_address}
            />
          </div> */}
      <div className="grid p-4">
        <Location cart={data} />
        {/* <OrderSummary order={order} /> */}
      </div>
      {/* <div className="p-4">
            <Help />
          </div> */}
    </div>
    //   </div>
    // </div>
  )
}

export default OrderCompletedTemplate
