import crypto from "crypto"
import { useRef, useState } from "react"
import { useRouter } from "next/router"
import { TermsModal } from "@features/account/components/terms-modal"
import { jsonToBase64 } from "@utils/json-to-base64"

const Test5 = () => {
  const [formData, setFormData] = useState({ data: "", signature: "" })
  const formRef = useRef(null)
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Call your custom function here before submitting the form
    // customFunction()
    console.log("ref", formRef.current)
    if (!formRef.current) return

    // formRef.current.submit()

    // try {
    // //   const response = await fetch("https://www.liqpay.ua/api/3/checkout", {
    // //     method: "POST",
    // //     mode: "no-cors",
    // //     headers: {
    // //       "Content-Type": "application/json",
    // //     },
    // //     body: JSON.stringify(formData),
    // //   })

    //   if (response.ok) {
    //     // Handle successful response, such as showing a success message
    //   } else {
    //     // Handle error response, such as showing an error message
    //   }
    // } catch (error) {
    //   // Handle errors
    // }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  // const customFunction = () => {
  //   // Add your custom logic here to be executed before form submission
  //   console.log("Custom function called before form submission")
  // }

  // const handlePayment = async () => {
  //   // setSubmitting(true)

  //   // const order = await onPaymentCompletedTest()
  //   // console.log("dat", order.id)

  //   const jsonString = {
  //     public_key: "sandbox_i97454434667",
  //     version: 3,
  //     private_key: "sandbox_NsKMg1NXFfhRkuj0TAeejeVhyGt92VxziwdtefLP",
  //     action: "pay",
  //     amount: 50,
  //     currency: "UAH",
  //     description: "Test",
  //     order_id: "333",
  //     language: "uk",
  //     // result_url: process.env.LIQPAY_RESULT_URL,
  //     // server_url: process.env.LIQPAY_SERVER_URL,
  //     product_description: "test p desc",
  //     // ...props,
  //   }

  //   const data = jsonToBase64(JSON.stringify(jsonString))
  //   const signString =
  //     "sandbox_NsKMg1NXFfhRkuj0TAeejeVhyGt92VxziwdtefLP" +
  //     data +
  //     "sandbox_NsKMg1NXFfhRkuj0TAeejeVhyGt92VxziwdtefLP"
  //   const sha1 = crypto.createHash("sha1")
  //   sha1.update(signString)
  //   const signature = sha1.digest("base64")

  //   console.log("data", data)
  //   console.log("signature", signature)

  //   const formData = new FormData()
  //   formData.append("data", data)
  //   formData.append("signature", signature)

  //   // const response = await fetch("https://www.liqpay.ua/api/3/checkout", {
  //   //   mode: "no-cors",
  //   //   method: "POST",
  //   //   headers: {
  //   //     // content type form data
  //   //     // "Content-Type": "multipart/form-data",
  //   //     "Content-Type": "application/x-www-form-urlencoded",
  //   //   },

  //   //   body: JSON.stringify(formData),
  //   // })

  //   // console.log("response", response)
  //   // const responseBody = await response.json()
  //   // console.log("responseBody", responseBody)

  //   // try {
  //   const payload = {
  //     data,
  //     signature,
  //   }

  //   const response = await fetch("http://localhost:3000/proxy", {
  //     method: "POST",
  //     mode: "no-cors",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: formData,
  //   })

  //   //   // Ensure the response was successful
  //   //   // if (!response.ok) {
  //   //   //   throw new Error("Liqpay API request failed")
  //   //   // }

  //   console.log("response", response)
  //   //   // const responseBody = await response
  //   //   // console.log("responseBody", responseBody)
  //   //   // const redirectionUrl = responseBody.redirectionUrl

  //   //   // console.log("redirectionUrl", redirectionUrl)

  //   //   // Return the redirection URL to be used on the client-side
  //   //   // return redirectionUrl
  //   // } catch (error) {
  //   //   console.error("Error:", error)
  //   //   throw error
  //   // }

  //   // setSubmitting(false)
  // }

  function redirectWithFormData() {
    const jsonString = {
      public_key: "sandbox_i97454434667",
      version: 3,
      private_key: "sandbox_NsKMg1NXFfhRkuj0TAeejeVhyGt92VxziwdtefLP",
      action: "pay",
      amount: 50,
      currency: "UAH",
      description: "Test",
      order_id: "334",
      language: "uk",
      // result_url: process.env.LIQPAY_RESULT_URL,
      // server_url: process.env.LIQPAY_SERVER_URL,
      product_description: "test p desc",
      // ...props,
    }

    const data = jsonToBase64(JSON.stringify(jsonString))
    const signString =
      "sandbox_NsKMg1NXFfhRkuj0TAeejeVhyGt92VxziwdtefLP" +
      data +
      "sandbox_NsKMg1NXFfhRkuj0TAeejeVhyGt92VxziwdtefLP"
    const sha1 = crypto.createHash("sha1")
    sha1.update(signString)
    const signature = sha1.digest("base64")

    const formData = new FormData()
    formData.append("data", data)
    formData.append("signature", signature)

    // Create a new form element
    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://www.liqpay.ua/api/3/checkout"

    // Add the form data as hidden input fields
    for (const [name, value] of formData.entries()) {
      console.log("value", value)
      const input = document.createElement("input")
      input.type = "hidden"
      input.name = name
      input.value = String(value)
      form.appendChild(input)
    }

    // Append the form to the document body and submit it
    document.body.appendChild(form)
    form.submit()
  }

  return (
    <>
      {/* <button onClick={redirectWithFormData}>
        Run Function and Submit Form
      </button> */}
      <button></button>
      <TermsModal openTerms={true} />
      {/* <form
        ref={formRef}
        method="POST"
        action="https://www.liqpay.ua/api/3/checkout"
        acceptCharset="utf-8"
        className="flex w-full justify-center sm:justify-end"
        onSubmit={handleSubmit}
      >
        <input
          type="hidden"
          name="data"
          value="eyJwdWJsaWNfa2V5IjoiaTUwMjIzODE0NDA2IiwidmVyc2lvbiI6IjMiLCJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOjI3NSwiY3VycmVuY3kiOiJVQUgiLCJkZXNjcmlwdGlvbiI6Ijc3NzAwMTIwMTA5OSIsIm9yZGVyX2lkIjoiNzc3MDAxMjAxMDk5IiwibGFuZ3VhZ2UiOiJ1ayIsInJlc3VsdF91cmwiOiJodHRwczovL3BheS52aXRhbGFiLmNvbS51YS9hcGkvbGlxcGF5L3N0YXR1cyIsInNlcnZlcl91cmwiOiJodHRwczovL3BheS52aXRhbGFiLmNvbS51YS9hcGkvc3VjY2VzcyIsInByb2R1Y3RfZGVzY3JpcHRpb24iOiI3NzcwMDEyMDEwOTkifQ=="
        />
        <input
          type="hidden"
          name="signature"
          value="cHNdwjtsMhZMQctsReXkdEQpmFQ="
        />
      </form> */}
    </>
  )
}

export default Test5
