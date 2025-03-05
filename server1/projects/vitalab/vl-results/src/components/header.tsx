import Image from "next/image"

import logo from "/public/vitalab-logo.svg"

export function Header() {
  return (
    <div className="mb-8 flex flex-row flex-nowrap items-center justify-start">
      <div className="flex flex-col flex-nowrap items-stretch justify-start gap-2">
        <Image src={logo} width={100} alt="Logo" />
        {/* <Image src={vercel} width={128} alt="Logo" /> */}
      </div>
      <div className="ml-auto flex flex-row flex-nowrap items-stretch justify-start gap-2">
        {/* test2 */}
      </div>
    </div>
  )
}
