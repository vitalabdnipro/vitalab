import { Inter } from "next/font/google"

import "~/styles/globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic"],
  display: "swap",
})

export const metadata = {
  title: "VitaLab - Результати онлайн",
  description: "Особистий кабінет пацієнта",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
