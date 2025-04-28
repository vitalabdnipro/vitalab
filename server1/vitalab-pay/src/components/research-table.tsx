import { LiqPayPay } from "~/lib/liqpay"

import { env } from "../../env.mjs"
import { Button } from "./ui/button"

const data = {
  status: "success",
  error: null,
  data: [
    {
      id: "c2b84925c7194bef871c201f332d33c7",
      total: "84.00",
      forms: [
        {
          name: "ОАК",
          status: "created",
          tests: [
            {
              name: "Аналіз крові загальний ",
              code: "00100",
              price: "60.00",
              material_name: "Кров ЕДТА",
              status: "ready",
              result_ready_at: "2023-04-27 17:43:45",
            },
          ],
        },
        {
          name: "Результати аналізів 4 колонки",
          status: "created",
          tests: [
            {
              name: "Глюкоза ",
              code: "00118",
              price: "24000.00",
              material_name: "плазма (Na фторид)",
              status: "ready",
              result_ready_at: "2023-04-27 18:59:16",
            },
          ],
        },
      ],
    },
  ],
}
interface Research {
  name: string
  code: string
  price: string
  material_name: string
  status: string
  result_ready_at: string
  in_complex: string
}

interface Order {
  status: string
  error: string | null
  data: {
    id: string
    total: string
    forms: {
      name: string
      status: string
      tests: Research[]
    }[]
  }[]
}

const getOrder = async (order: string) => {
  const res = await fetch(
    "http://mirthOUT.vitalab.com.ua:55080/results/get_by_order_num",
    {
      method: "POST",
      headers: {
        token: "3cf9db27be144476b963e54889c1f127",
        "Content-Type": "application/json",
        // Accept: "application/json",
      },
      body: JSON.stringify({
        num: order,
        phone: null,
      }),
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch")
  }

  return res.json()

  // return await data
}

export const ResearchTable = async ({ id }: { id: string }) => {
  const order: Order = await getOrder(id)

  const research = order.data[0].forms.reduce<
    {
      test: Research
      manipulation: boolean
    }[]
  >((acc: { test: Research; manipulation: boolean }[], curr: any) => {
    // const form = curr

    return [
      ...acc,
      ...curr.tests
        .filter((test: Research) => !test.in_complex)
        .map((test: Research) => ({
          test,
          manipulation: curr.name === "Без бланка" ? true : false,
          // content: form.content,
          // status: form.status,
        })),
    ]
  }, [])

  research.sort((a, b) => (a.manipulation === b.manipulation ? 0 : a.manipulation ? 1 : -1))

  return (
    <div className="mt-9 flex w-full flex-col items-center">
      <div className="mb-2 hidden w-full grid-cols-[50px_1fr_80px] gap-4 rounded-md bg-gray-50 px-4 py-3 text-sm font-semibold shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)] md:grid">
        <div>Код</div>
        <div>Назва дослідження</div>
        <div className="text-end">Ціна</div>
      </div>
      {research.map((item: any, index) => (
        <div
          key={item.test.code}
          className="ml-2 grid w-full grid-cols-[40px_1fr_60px] items-center gap-2 py-3 text-xs md:ml-0 md:grid md:grid-cols-[50px_1fr_80px] md:gap-4 md:px-4 md:text-sm"
        >
          <div>{item.test.code}</div>
          <div>{item.test.name}</div>
          <div className="text-right">{parseFloat(item.test.price)} грн</div>
        </div>
      ))}
      <div className="grid w-full grid-cols-[10px_1fr_100px] md:grid-cols-[50px_1fr_100px] md:px-4">
        <div className="col-start-3 border-t border-dashed pl-2.5 pt-2 text-right text-sm font-semibold">
          {parseFloat(order.data[0].total)} грн
        </div>
      </div>
      <div className="mt-9 flex w-full justify-end">
        <LiqPayPay
          publicKey={env.LIQPAY_PUBLIC_KEY}
          privateKey={env.LIQPAY_PRIVATE_KEY}
          title="Оплатити замовлення"
          description={id}
          orderId={id}
          productDescription={id}
          amount={parseInt(order.data[0].total)}
        />
      </div>
    </div>
  )
}
