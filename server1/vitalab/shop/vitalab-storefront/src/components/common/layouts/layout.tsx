import React from "react"
import { Footer, Navbar } from "@components/common"
import { SiteHeader } from "@components/organisms/site-header"

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Navbar /> */}
      <SiteHeader />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
