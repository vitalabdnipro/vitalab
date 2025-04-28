import { SearchOrderForm } from "~/components/search-order-form"

export default function Home() {
  return (
    <div className="max-w-sm sm:w-full">
      <h1 className="mt-4 text-center text-lg font-bold">Оплата замовлення</h1>
      <div className="mt-8">
        <SearchOrderForm />
      </div>
    </div>
  )
}
