import React, { type ReactElement } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Heading, Section } from "@components/ui"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import Head from "@modules/common/components/head"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import clsx from "clsx"
import { FaTelegram, FaViber } from "react-icons/fa"

import car from "../../public/img/vitalab_car.jpg"

interface AccordionItem {
  header: string
  content: any
}

const items: AccordionItem[] = [
  {
    header: "Результати аналізів у смартфоні",
    content: [
      {
        list: [
          <>
            <p>
              Лабораторія VitaLab постійно розвиває свої IT сервіси та надає
              нові зручні послуги клієнтам. Ви маєте можливість безкоштовно та
              оперативно отримувати результати аналізів у
              <span className="font-semibold text-blue-500"> Telegram </span>
              або <span className="font-semibold text-violet-700">Viber</span>.
            </p>
            <p className="mt-2 font-semibold">Для цього Вам потрібно:</p>
            <ul className="space-y-2 pl-4">
              <li className="mt-2 flex flex-col">
                1. Обрати месенджер чи перейти за посиланням:
                <div className="mt-2 flex gap-x-10">
                  <a
                    href="https://t.me/VitaLab_results_bot"
                    className="font-semibold transition ease-hover hover:opacity-60"
                  >
                    <div className="flex items-center text-gray-900">
                      <FaTelegram size={36} className="mr-2 fill-blue-500" />
                      Telegram
                    </div>
                  </a>
                  <a
                    href="viber://pa?chatURI=vitalab_results_bot_chat_bot"
                    className="font-semibold transition ease-hover hover:opacity-60"
                  >
                    <div className="flex items-center">
                      <FaViber size={36} className="mr-2 fill-violet-700" />{" "}
                      Viber
                    </div>
                  </a>
                </div>
              </li>
              <li>
                2. Після переходу до месенджера натиснути &quot;Старт&quot;
              </li>
              <li>3. Далі натиснути &quot;Поділитися контактами&quot;</li>
            </ul>
            <p className="mt-2">
              Після цього результати виконаних досліджень будуть спрямовані до
              вашого смартфону. Піклуйтеся про своє здоров’я разом з VitaLab!
            </p>
          </>,
        ],
      },
    ],
  },
  {
    header: "Оплата послуг",
    content: [
      {
        heading: "1. Реєстрація / авторизація користувача",
        list: [
          "Для оформлення замовлення на сайті “VitaLab” необхідна реєстрація / авторизація користувача",
          "Якщо ви оформляєте замовлення на сайті вперше, то Вам необхідно зареєструватися",
          "Процес реєстрації нового користувача проводиться за допомогою заповнення короткої реєстраційної форми, що містить обов'язкові до заповнення поля",
          "Ваш логін (ім'я) і пароль, які Ви вводите в реєстраційній формі будуть потрібні для авторизації",
          "У разі, якщо ви не новачок на сайті “VitaLab”, то для оформлення замовлення потрібно авторизуватися",
          "Для цього Вам потрібно ввести Ваш персональний логін і пароль в відповідну форму авторизації",
        ],
      },
      {
        heading: "2. Вибір місця проведення збору аналізу",
        list: [
          "Виклик мобільної команди додому. Після вибору даної опції, Вам буде надане поле для заповнення адреси",
          "Забір аналізу в відділенні клініки. При виборі даної опції, Вам буде наданий графік (дата і час) проведення конкретних аналізів",
        ],
      },
      {
        heading: "3. Як оплатити замовлення",
        list: [
          "Оплатити послуги лабораторії “VitaLab” можна за допомогою:",
          "готівкового розрахунку, Приват24, термінали самообслуговування, картою Mastercard або Visa, переказ коштів на карту ПриватБанк-у",
          "Останнім кроком в оформленні замовлення є підтвердження платежу",
          "При підтвердженні платежу, Вам буде надана форма, яка містить всі введені персональні дані і обрані опції",
          "Після того, як Ви переконалися в точності даних, натискайте кнопку 'Підтвердити', після чого Ваше замовлення буде оформлене і прийняте на обробку",
          "При повторному замовленні послуг лабораторії VitaLab з Вашого особистого кабінету, поля, заповнені Вами раніше, будуть заповнені автоматично",
        ],
      },
      {
        heading: "4. Вартість послуг та порядок оплати",
        list: [
          "1.1 Вартість Послуг зазначається у замовленні із унікальним номером, яке попередньо сформоване та перевірене Замовником (Пацієнтом) особисто на пункті забору біоматеріалу, або на сайті https://vitalab.com.ua",
          "1.2 Оплата Послуг здійснюється Замовником в національній валюті України - гривні, шляхом здійснення грошового переказу у спосіб, запропонований Виконавцем на Сайті Виконавця, в тому числі за допомогою систем дистанційного обслуговування, зокрема на веб-сторінці https://vitalab.com.ua",
          "1.3 Виконавець забезпечує надання замовлених Послуг Пацієнту після їх попередньої та повної оплати.",
          "1.4 Замовник несе відповідальність за правильність здійснених ним платежів.",
          "1.5 Замовник (Пацієнт) забезпечує можливість взяття біологічного матеріалу Пацієнта працівниками Виконавця в пункті забору біоматеріалу Виконавця протягом 30-ти календарних днів з моменту оформлення та оплати Замовлення, або в інший строк, зазначений Виконавцем у Замовленні. В разі невиконання Замовником даного зобов’язання Виконавець має право анулювати його Замовлення, при цьому, кошти оплачені за Послуги, не повертаються Замовнику.",
          "1.6. Виконавець має право анулювати Замовлення повністю чи частково при настанні обставин, що унеможливлюють надання Послуг, попередньо повідомивши Замовника (Пацієнта) про настання таких обставин.",
          "1.7 У випадку анулювання Замовником оформленого Замовлення протягом строку дії Замовлення та/або у випадку анулювання Замовлення Виконавцем, вартість оплачених, але не наданих Послуг може бути повернута Замовнику у порядку, передбаченому чинним законодавством України, за його письмовою заявою, протягом 30 робочих днів з моменту прийняття такого рішення Виконавцем.",
          "1.8 Заява на повернення грошових коштів оформлюється у вигляді паперового документа, який подається представнику Виконавця за адресою надання Послуг Виконавця (м. Дніпро, вул. Херсонська, 10А) або направляється рекомендованою поштою на адресу Виконавця разом із копією документа, що посвідчує особу Замовника, копією довідки про присвоєння ідентифікаційного коду, копією рахунку-замовлення, копією платіжного документа, який підтверджує здійснення оплати Послуг.",
        ],
      },
    ],
  },
  {
    header: "Як оформити замовлення на сайті",
    content: [
      {
        list: [
          <>
            <p>
              Для оформлення замовлення на сайті «VitaLab» необхідна реєстрація
              / авторизація користувача. Якщо ви оформляєте замовлення на сайті
              вперше, то Вам необхідно зареєструватися. Процес реєстрації нового
              користувача проводиться за допомогою заповнення короткої
              реєстраційної форми, що містить обов&apos;язкові до заповнення
              поля.
            </p>
            <p>
              Ваш логін (ім&apos;я) і пароль, які Ви вводите в реєстраційній
              формі будуть потрібні для авторизації У разі, якщо ви не новачок
              на сайті «VitaLab», то для оформлення замовлення потрібно
              авторизуватися. Для цього Вам потрібно ввести Ваш персональний
              логін і пароль в відповідну форму авторизації.
            </p>
            <p>
              Якщо не оформили попереднє замовлення, наші співробітники
              зареєструють вас і оформлять замовлення самостійно.Переконливе
              прохання зберігати направлення на аналізи для передачі
              співробітникам «Vitalab», це дозволить уникнути непорозумінь при
              виконанні аналізів призначених лікарем
            </p>
          </>,
        ],
      },
    ],
  },
  {
    header: "Скільки коштують аналізи",
    content: [
      {
        list: [
          <>
            <p>
              Дізнатися ціни можна в розділі «Аналізи» ввівши назву аналізу в
              поле пошуку на сайті. Діючі акційні пропозиції переглядайте у
              розділі{" "}
              <Link
                href="/news?type=promotions"
                className="font-medium text-blue-500"
              >
                &quot;Акції&quot;
              </Link>
            </p>
          </>,
        ],
      },
    ],
  },
  {
    header: "Як швидко виконуються аналізи",
    content: [
      {
        list: [
          <>
            <p>
              Термін виконання кожного дослідження Ви знайдете біля його назви у
              розділі{" "}
              <Link href="/analyzes/11" className="font-medium text-blue-500">
                &quot;Аналізи&quot;
              </Link>
            </p>
            <p>
              Переважна більшість загальноклінічних, біохімічних та
              імунологічних досліджень виконуються за один день. Ми завжди
              вказуємо максимальний термін виконання дослідження, але результат
              найчастіше готовий раніше.
            </p>
            <p>
              Як тільки результати досліджень будуть готові, їх буде надіслано
              Вам електронною поштою та/або у чат-бо на Вайбер чи Телеграм (для
              цього Вам потрібно перейти за{" "}
              <Link href="/faq?id=1" className="font-medium text-blue-500">
                посиланням
              </Link>{" "}
              та підписатися на чат-бот, дотримуючись інструкції).
            </p>
          </>,
        ],
      },
    ],
  },
  {
    header: "Чи можна викликати медсестру додому?",
    content: [
      {
        list: [
          <>
            <p>
              Наш лабораторний центр пропонує послугу «Забір біологічного
              матеріалу вдома (в офісі)». Така опція буде кращим рішенням для
              людей, які за певних обставин не можуть прийти до відділення
              лабораторії.
            </p>
            <p>Ви можете обрати термін приїзду мобільної команди самостійно.</p>
            <p>
              Щоб викликати нашу медсестру зателефонуйте:
              <a className="ml-1" href="tel:+380673105227">
                (067) 310-52-27
              </a>
              ,
              <a className="ml-1" href="tel:+380503607575">
                (050) 360-75-75
              </a>
              ,
              <a className="ml-1" href="tel:+380632510338">
                (063) 251-03-38
              </a>
            </p>
          </>,
        ],
      },
    ],
  },
  {
    header: "Де здати аналізи та графік роботи пунктів",
    content: [
      {
        list: [
          <>
            <p>
              Виберіть зручне для Вас відділення на{" "}
              <Link href="/laboratories" className="font-medium text-blue-500">
                мапі
              </Link>
              . Графік роботи відділень та години забору біоматеріалу можливо
              подивитися у переліку{" "}
              <Link href="/laboratories" className="font-medium text-blue-500">
                відділень
              </Link>
              .
            </p>
          </>,
        ],
      },
    ],
  },
]

const FAQ = () => {
  const router = useRouter()
  const { id } = router.query
  const [value, setValue] = React.useState(`item-${id}`)

  return (
    <>
      <Head
        title="FAQ - українська медична лабораторія VitaLab"
        description="Медичні лабораторні дослідження у Дніпрі. Понад 400 аналізів. Європейське обладнання та стандарти якості."
      />
      <Section>
        <div className="pb-32">
          <div
            className="section__row-layout"
            style={
              {
                "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
              } as React.CSSProperties
            }
          >
            <Breadcrumbs title="Часті запитання" />
            <div
              className="section__row-layout"
              style={
                {
                  "--row-layout-gap": `var(--row-layout-gap-small)`,
                } as React.CSSProperties
              }
            >
              <div className="px-4 sm:pr-16 lg:pr-28">
                <Heading variant="pageHeading" className="mb-6">
                  Питання та відповіді
                </Heading>
              </div>
              <AccordionPrimitive.Root
                value={value}
                onValueChange={setValue}
                className="relative border-t border-t-[#e7ecf1]" //border
                type="single"
                collapsible
              >
                {items.map(({ header, content }, i) => (
                  <AccordionPrimitive.Item
                    key={`header-${i}`}
                    value={`item-${i + 1}`}
                    className="relative border-b border-b-[#e7ecf1]"
                  >
                    <AccordionPrimitive.Header className="border-x radix-state-open:border-b">
                      <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 bg-[#ffffff] p-4 text-left transition ease-hover">
                        <span className="text-m font-semibold text-[#0a2540] transition ease-hover group-hover:opacity-60">
                          {header}
                        </span>
                        {/* <AccordionChevron aria-hidden /> */}
                        <ChevronDownIcon
                          className={clsx(
                            "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out",
                            "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
                          )}
                        />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    {content.map((item: any) => (
                      <AccordionPrimitive.Content key={item}>
                        <div
                          className="section__row-layout py-6"
                          style={
                            {
                              "--row-layout-gap": `var(--row-layout-gap-large)`,
                            } as React.CSSProperties
                          }
                        >
                          <div className="grid items-start gap-y-2 md:grid-cols-4 md:gap-y-8">
                            {item.heading && (
                              <div className="px-4 sm:pr-8">
                                <Heading variant="sectionHeading">
                                  {item.heading}
                                </Heading>
                              </div>
                            )}
                            <div
                              className={clsx(
                                "pr-4 pl-4 sm:pr-8 md:col-span-4",
                                {
                                  "md:col-start-2": item.heading,
                                }
                              )}
                            >
                              <ul className="space-y-2 text-m text-gray-800">
                                {item.list.map((list: any) => (
                                  <li key={list}>{list}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </AccordionPrimitive.Content>
                    ))}
                  </AccordionPrimitive.Item>
                ))}
              </AccordionPrimitive.Root>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

FAQ.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default FAQ
