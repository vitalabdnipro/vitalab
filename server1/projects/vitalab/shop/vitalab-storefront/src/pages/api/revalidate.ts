import { MEDUSA_BACKEND_URL } from "@lib/config"

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }

  const response = await fetch(`${MEDUSA_BACKEND_URL}/store/categories`)
  const categories = await response.json()

  const cats = categories.map((c) => ({ id: c.id }))

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    // cats.forEach(async (c) => {
    //   await res.revalidate(`/analyzes/${c.id}`)
    // })
    await Promise.all(
      cats.map(async (c) => {
        console.log(c.id)
        return await res.revalidate(`/analyzes/${c.id}`)
      })
    )

    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating")
  }
}
