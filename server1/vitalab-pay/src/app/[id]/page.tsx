import { Suspense } from "react"

import { ResearchTable } from "~/components/research-table"

// const data = {
//   status: "success",
//   error: null,
//   data: [
//     {
//       id: "c2b84925c7194bef871c201f332d33c7",
//       total: "84.00",
//       forms: [
//         {
//           name: "ОАК",
//           status: "created",
//           tests: [
//             {
//               name: "Аналіз крові загальний ",
//               code: "00100",
//               price: "60.00",
//               material_name: "Кров ЕДТА",
//               status: "ready",
//               result_ready_at: "2023-04-27 17:43:45",
//             },
//           ],
//         },
//         {
//           name: "Результати аналізів 4 колонки",
//           status: "created",
//           tests: [
//             {
//               name: "Глюкоза ",
//               code: "00118",
//               price: "24.00",
//               material_name: "плазма (Na фторид)",
//               status: "ready",
//               result_ready_at: "2023-04-27 18:59:16",
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }

// const getOrder = async (order: string) => {
//   // const res = await fetch(
//   //   "http://mirthOUT.vitalab.com.ua:55080/results/get_by_order_num",
//   //   {
//   //     method: "POST",
//   //     headers: {
//   //       token: "3cf9db27be144476b963e54889c1f127",
//   //       "Content-Type": "application/json",
//   //       // Accept: "application/json",
//   //     },
//   //     body: JSON.stringify({
//   //       num: order,
//   //       phone: null,
//   //     }),
//   //   }
//   // )

//   // if (!res.ok) {
//   //   throw new Error("Failed to fetch")
//   // }

//   // return res.json()

//   return await data
// }

const Order = async ({ params }: { params: { id: string } }) => {
  // const order = await getOrder(params.order)

  return (
    <div className="geist-wrapper">
      <div className="flex flex-col items-center justify-center pt-4">
        <h1 className="text-center text-lg font-bold">
          Оплата замовлення #{params.id}
        </h1>
        <Suspense fallback={<div>Завантаження...</div>}>
          {/* @ts-expect-error Server Component */}
          <ResearchTable id={params.id} />
        </Suspense>
      </div>
    </div>
  )
}

export default Order

{
  /* <Suspense fallback={<div>Loading...</div>}>
        <LiqPayPay
          publicKey={process.env.LIQPAY_PUBLIC_KEY}
          privateKey={process.env.LIQPAY_PRIVATE_KEY}
          description={`Замовлення #${params.order}`}
          orderId={params.order}
          resultUrl={process.env.LIQPAY_RESULT_URL}
          serverUrl={process.env.LIQPAY_SERVER_URL}
          product_description="Online courses"
          amount={parseInt(orderData.data[0].total)}
        />
      </Suspense> */
}
