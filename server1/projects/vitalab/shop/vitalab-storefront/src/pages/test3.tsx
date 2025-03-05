import router from "next/router"
import { BirthdayPicker } from "@components/molecules/birthday-picker"
import { DatePicker } from "@components/molecules/laboratory-select/date-picker"
import { MEDUSA_BACKEND_URL, medusaClient } from "@lib/config"
import { useAccount } from "@lib/context/account-context"
import Medusa from "@medusajs/medusa-js"
import { api } from "utils/api"

const object = {
  last_name: "test_lastnem",
  first_name: "test_firstname",
  email: "email11411@test.com.ua",
  middle_name: "test_middle",
  password: "simple",
  phone: "3223121323232",
}

const generatePasswordToken = async () => {
  // const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
  // medusa.customers.generatePasswordToken({
  //   email: "user@example.com",
  // })

  const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
  medusa.customers
    .generatePasswordToken({
      email: "user@example.com",
    })
    .then((x) => {
      // successful
      console.log(x)
    })
    .catch(() => {
      // failed
    })

  // const response = await medusaClient.customers.generatePasswordToken({
  //   email: "giga2@com.ua",
  // })
  // const token = await response

  const customer = await medusaClient.customers
    .resetPassword({
      email: "giga2@com.ua",
      password: "supersecret",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6ImN1c18wMUdSREM4RU5aUzEwNTkxNkZNSkIxSEgzRCIsImV4cCI6MTY3NjgxMDI4NSwiaWF0IjoxNjc2ODA5Mzg1fQ.BEMA1nYl_8dJNQX0m_oyurzVW4zH5lMzdqEIx1rhV40",
    })
    .then(({ customer }) => {
      console.log(customer.id)
    }).catch((err) => console.log(err))

  // console.log(token)
  // console.log(customer)
}

const Test3 = (props) => {
  const { loginView, refetchCustomer } = useAccount()
  const mutation = api.customer.create.useMutation({
    onError: (error) => {
      console.log("ggggg", error.message)
    },
    onSuccess: () => {
      console.log("true")
      refetchCustomer()
      router.push("/account")
    },
  })

  const token = generatePasswordToken()

  console.log(token)
  return (
    <>
      {/* <BirthdayPicker className="without-ring peer h-10 w-full rounded-[5px] border border-gray-300 px-4 text-sm text-gray-900 placeholder-transparent focus:border-gray-500 focus:outline-none" />
      <DatePicker
        label="Appointment date"
        // minValue={today(getLocalTimeZone())}
      />
      <button
        onClick={() => {
          console.log("creds", object)
          mutation.mutate(object)
        }}
      >
        test
      </button> */}
    </>
  )
}

export async function getServerSideProps(context) {
  //   const response = await fetch(
  //     `http://localhost:9000/customer/5/${{ name: "test" }}`
  //   );
  //   const categories = await response.json();
  const rawResponse = await fetch("http://localhost:9000/customer", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "cus_01GR93KRNVEMAPNZYHJJJZF1DD",
      data: { metadata: { name: "gg22", surname: "tee11" } },
    }),
  })
  const content = await rawResponse.json()

  console.log("content", content)

  return {
    props: {}, // will be passed to the page component as props
  }
}
export default Test3
