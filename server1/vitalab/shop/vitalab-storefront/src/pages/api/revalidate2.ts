import { MEDUSA_BACKEND_URL } from "@lib/config"

export const getAllPages = async () => {
  const categoriesResponse = await fetch(
    `${MEDUSA_BACKEND_URL}/store/categories`
  )
    .then((res) => res.json())
    .then((res) => res)

  const pages = []

  categoriesResponse.forEach((cat) => pages.push(`/analyzes/${cat.id}`))

  return pages
}

export default async function handler(req, res) {
  // // Check for secret to confirm this is a valid request
  if (!req.query.secret || req.query.secret !== "ZEwIIbZg7ICGOjd3SN0M") {
    return res.status(401).json({ message: "Invalid token" })
  }
  // if (
  //   !req.query.secret ||
  //   req.query.secret !== "SOME_SECRET_FOR_AUTORIZATION" ||
  //   req.method !== "POST"
  // ) {
  //   return res.status(401).end("Not Authorized")
  // }

  // const response = await fetch(`${MEDUSA_BACKEND_URL}/store/categories`)
  // const categories = await response.json()

  // const cats = categories.map((c) => ({ id: c.id }))

  try {
    const result = await getAllPages()
    const pages = await result

    const prefixedPages = pages.map((p) => (p.startsWith("/") ? p : "/" + p))
    // const suffixedPages = prefixedPages.map(p => p.endsWith("/") ? p : p + "/");
    await Promise.all(
      prefixedPages.map(async (page) => {
        try {
          console.log("page revalidated:", page)
          await res.revalidate(page)
        } catch (e) {
          console.log(e)
        }
      })
    )

    //   // this should be the actual path not a rewritten path
    //   // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    //   // cats.forEach(async (c) => {
    //   //   await res.revalidate(`/analyzes/${c.id}`)
    //   // })
    //   await Promise.all(
    //     cats.map(async (c) => {
    //       console.log(c.id)
    //       return await res.revalidate(`/analyzes/${c.id}`)
    //     })
    //   )

    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err)
    return res.status(500).send("Error revalidating")
  }
}
