import "~/styles/globals.css"
import Image from "next/image"

import { fontSans } from "~/lib/fonts"
import { cn } from "~/utils/cn"
import { Footer } from "~/components/footer"

import logo from "../../public/logo.svg"

export const metadata = {
  title: "VitaLab Pay",
  description: "Сервіс оплати замовлень",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <div className="flex min-h-screen flex-col items-center py-6 sm:justify-center">
          <main className="relative flex w-full flex-col items-center sm:my-auto">
            <Image src={logo} alt="logo" height={40} />
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
