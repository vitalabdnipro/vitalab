import React from "react"
import NextHead from "next/head"

type HeadProps = {
  title?: string
  description?: string | null
  image?: string | null
}

const Head: React.FC<HeadProps> = ({ title, description, image }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta itemProp="name" content={title} />
      {/* {description && <meta itemProp="description" content={description} />} */}
      {description && <meta name="description" content={description} />}
      {image && <meta itemProp="image" content={image} />}
      <link rel="icon" href="/favicon.ico" />
    </NextHead>
  )
}

export default Head
