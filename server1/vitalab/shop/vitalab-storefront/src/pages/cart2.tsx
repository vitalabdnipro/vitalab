import CartTemplate from "@modules/cart/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import type { ReactElement } from "react"
import type { NextPageWithLayout } from "types/global"

const Cart: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Shopping Bag" description="View your shopping bag" />
      <CartTemplate />
    </>
  )
}

Cart.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Cart
