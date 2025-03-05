import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  console.log(request.nextUrl.pathname)
  // const { searchParams } = new URL(request.url)
  // const data = searchParams.get("data")

  // https://pay.vitalab.com.ua/33300000001/checkout?status=success
  const url = new URL("/33300000001/checkout", request.url)
  // Add ?from=/incoming-url to the /login URL  
  url.searchParams.set("status", "success")
  
  // And redirect to the new URL
  return NextResponse.redirect(
    // new URL("/33300000001/checkout?status=success", request.url)
    url
  )

  //   const res = await request.json()
  //   return NextResponse.json({ res })
  //   return NextResponse.redirect(`/success?id=${id}`)
  //   return NextResponse.redirect(`/success?id=${id}`)
}
