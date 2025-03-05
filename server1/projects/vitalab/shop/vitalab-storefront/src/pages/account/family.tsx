import Layout from "@components/common/layouts"
import AccountLayout from "@modules/account/templates/account-layout"
import AddressesTemplate from "@modules/account/templates/addresses-template"
import Head from "@modules/common/components/head"

import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Profiles: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Addresses" description="View your addresses" />
      <AddressesTemplate />
    </>
  )
}

Profiles.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      <AccountLayout>{page}</AccountLayout>
    </Layout>
  )
}

export default Profiles
