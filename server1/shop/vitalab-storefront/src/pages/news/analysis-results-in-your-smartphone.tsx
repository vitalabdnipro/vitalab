import type { ReactElement } from "react"
import Image from "next/image"
import { ContactInfo, Layout } from "@components/common"
import { Breadcrumbs, Button, Card, Heading, Section } from "@components/ui"

const PostPage = ({ data }) => {
  console.log("data", data)
  return (
    <Section>
      <div className="pb-32">
        <Breadcrumbs />
        <div className="gap-y-6 md:grid md:grid-cols-4 md:gap-y-12 md:grid-areas-newsLayout">
          {/* <div
          className="section__row-layout"
          style={
            {
              "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
            } as React.CSSProperties
          }
        > */}

          <header className="col-span-3 mt-12 grid w-full max-w-[810px] gap-y-6 md:grid-in-hero">
            <Heading variant="heading">Результати аналізів у смартфоні</Heading>
            {/* <div className="px-4 text-m leading-6 text-gray-900 sm:pr-16 sm:text-lg">
              <p>Акція з 1 до 30 червня 2023 р.</p>
            </div> */}
          </header>
          <aside className="hidden md:block md:grid-in-meta">
            <time className="relative px-4 text-m text-gray-700 before:absolute before:left-0 before:top-0.5 before:h-[15px] before:w-px before:bg-orange-500">
              24 серпня 2022 р.
            </time>
          </aside>
          <section className="grid gap-y-10 grid-in-body">
            <div className="grid gap-y-6 text-m leading-6 text-gray-900 md:text-lg">
              <p className="px-4 sm:pr-8 md:max-w-[810px]">Шановні пацієнти!</p>
              <p className="px-4 sm:pr-8">
                Лабораторія VitaLab покращує сервіси та оновлює зручний спосіб
                отримання результатів досліджень. Відтепер наші пацієнти мають
                можливість отримувати результати аналізів у Viber або Telegram!
                Для цього потрібно:
              </p>
            </div>
            <ul className="px-4">
              <li>
                <p>
                  1. Обрати месенджер чи перейти за посиланням:
                  <ul>
                    <li className="mt-2 font-semibold">
                      <a
                        href="https://t.me/VitaLab_results_bot"
                        className="flex items-center"
                      >
                        <Image
                          src="/logo/telegram_logo.svg"
                          alt=""
                          width={30}
                          height={30}
                          className="ml-4 mr-2"
                        />
                        Telegram
                      </a>
                    </li>
                    <li className="mt-2 font-semibold">
                      <a
                        href="viber://pa?chatURI=vitalab_results_bot_chat_bot"
                        className="flex items-center"
                      >
                        <Image
                          src="/logo/viber_logo.svg"
                          alt=""
                          width={30}
                          height={30}
                          className="ml-4 mr-2"
                        />
                        Viber
                      </a>
                    </li>
                  </ul>
                </p>
              </li>
              <li className="mt-4">
                2. Після переходу до месенджера натиснути &apos;Старт&apos;
              </li>
              <li className="mt-2">
                3. Далі натиснути &apos;Поділитися контактами&apos;.
              </li>
            </ul>
            <p className="px-4">
              Після цього результати виконаних досліджень будуть спрямовані до
              вашого смартфону. Піклуйтеся про своє здоров’я разом з VitaLab!
            </p>
            <ContactInfo />
          </section>
        </div>
      </div>
    </Section>
  )
}

PostPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default PostPage
