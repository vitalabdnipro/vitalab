import Image from "next/image"
import s from "./service.module.css"
import { Button } from "@components/ui"
import Link from "next/link"

const Service = ({ icon, title, body, link }: any) => {
  return (
    <div className={s.root}>
      {/* Copy__header */}
      <header className={s.header}>
        {/* Copy__icon */}
        <div className={s.icon}>
          <Image src={icon} alt="" />
        </div>
        {/* Copy__title */}
        <h2 className={s.title}>{title}</h2>
      </header>
      {/* Copy__body */}
      <div className={s.body}>
        <p>{body}</p>
      </div>
      {/* Copy__footer */}
      <footer className={s.footer}>
        <Link href="/">
          <Button
            Component="a"
            variant="link"
            width="100%"
            className="text-blue-500"
          >
            tests
          </Button>
        </Link>
      </footer>
    </div>
  )
}

export default Service
