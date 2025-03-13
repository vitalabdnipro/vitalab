import { AddCartButton } from "@components/atoms/add-cart-button"
import { Payment, columns } from "@features/laboratories/columns"
import { DataTable } from "@features/laboratories/laboratories"
import { medusaClient } from "@lib/config"

// export async function getStaticProps() {
//   const { products } = await medusaClient.products.list({
//     limit: 1000,
//     currency_code: "uah",
//   })

//   // Return the data as props
//   // const product = 
//   return { props: { products } }
// }

export default function Test6({ products }) {
  // const data: Payment[] = [
  //   {
  //     id: "728ed52f",
  //     amount: 100,
  //     status: "pending",
  //     email: "m@example.comxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  //   },
  // ]
  // const data = await medusaClient.products.list({
  //   limit: 1000,
  // })

  // console.log("data", products)
  return (
    <div className="w-full max-w-3xl overflow-x-auto whitespace-nowrap">
      {/* <DataTable columns={columns} data={data} /> */}
      <AddCartButton id="prod_01GQ219N0242QGKC6RM17BPD1K" />
    </div>
  )
}
