import { AuthForm } from "~/components/auth-form"
import Image from "next/image"

import logo from "/public/vitalab-logo.svg"

const Test = () => {
  return (
    <div className="w-full min-w-min max-w-sm py-4 md:py-9">
      <Image src={logo} alt="Logo" className="h-[24px] w-fit md:h-[40px] mx-auto" />
      <h2 className="text-center text-lg font-semibold md:text-2xl">Результати досліджень</h2>
      {/* <div className="flex min-h-[200px] bg-white md:rounded-md md:shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.06)]"></div> */}
      <AuthForm />
    </div>
  )
}

export default Test
