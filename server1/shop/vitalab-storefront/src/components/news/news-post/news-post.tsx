import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import cn from "clsx"
import { format, parse } from "date-fns"
import { uk } from "date-fns/locale"
import { capitalize } from "lodash"

import s from "./news-post.module.css"

const NewsPost = ({
  data,
}: {
  data: {
    title: string
    slug: string
    description: string
    date: string
    img: string
    type?: string
  }
}) => {
  const date = parse(data.date, "yyyy-MM-dd", new Date())
  const router = useRouter()

  console.log(router.pathname)
  return (
    <article className={s.root}>
      {/* NewsroomIndexPost__header */}
      <header className="grid content-start gap-2">
        {/* CopyTitle */}
        <h2 className={s.title}>
          <Link href={`${data.slug}`} className="link">
            {data.title}
          </Link>
        </h2>
        <h3 className={s.description}>
          <Link
            href={`${data.slug}`}
            className="link text-current hover:opacity-60"
          >
            {data.description}
          </Link>
        </h3>
      </header>
      {/* BlogPostDate NewsroomIndexPost__date */}
      <time className={s.date}>
        <Link
          href={"/"}
          className="link font-normal text-current hover:opacity-60"
        >
          {/* Вересень 18, 2022 */}
          {capitalize(
            format(date, "MMMM d, yyyy", {
              locale: uk,
            })
          )}
        </Link>
      </time>
      {router.pathname === "/news" && (
        <figure className="relative mx-4 aspect-[2/1] min-h-[72px] min-w-[100px] rounded-lg bg-white md:flex">
          <Link href={`${data.slug}`} className="w-full">
            <Image
              alt=" "
              src={data.img}
              width={175}
              height={119}
              className="mx-auto h-40 w-auto md:h-auto md:w-[175px]"
            />
          </Link>
        </figure>
      )}
    </article>
  )
}

export default NewsPost
