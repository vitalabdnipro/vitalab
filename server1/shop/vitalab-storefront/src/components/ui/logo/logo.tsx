import Image from "next/image"
import Link from "next/link"

import logo from "../../../../public/logo.svg"
// import logo from "../../../../public/logo_vi.svg"

const Logo = ({ width = 0, height = 27 }) => (
  <Image alt="Logo" src={logo} width={width} height={height} />
)

export default Logo
