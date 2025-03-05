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
  if (!req.query.secret || req.query.secret !== "ZEwIIbZg7ICGOjd3SN0M") {
    return res.status(401).json({ message: "Invalid token" })
  }

  const list = req.body
  console.log("req.body:", list)
  try {
    // const result = await getAllPages()
    // const pages = await result

    const prefixedPages = list.map((p) => `/analyzes/${p}`) //list.map((p) => (p.startsWith("/") ? p : "/" + p))
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

    return res.json({ status: "ok" })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log(err)
    return res.status(500).send("Error revalidating")
  }
}
