import React, { type ReactElement } from "react"
import Image from "next/image"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Map, Section } from "@components/ui"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/v2/accordion"
import Head from "@modules/common/components/head"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import clsx from "clsx"
import { Eye, EyeOff } from "lucide-react"

import femaleSexGender from "/public/i/female-sex-gender.png"
import visa from "/public/logo/visa-logo.png"

// import kid from "/public/img/kid.png"

type Laboratory = {
  name: string
  address: string
  workingHours: string[]
  biomaterial: string[]
  status: string
  coordinates: object[]
  terminal?: boolean
  kid?: string
  femaleSex?: boolean
}

const defaultData: Laboratory[] = [
  {
    name: `Діагностичний лабораторний центр "VitaLab"`,
    address: "м. Дніпро, вул. Херсонська, 10а (медичний центр), 3 поверх",
    workingHours: [
      "Пн-Пт. з 8:00 до 18:00",
      "Сб. з 8:00 до 16:00",
      "Нд. вихідний",
    ],
    biomaterial: ["з 8.00 до 12.00"],
    coordinates: { lat: 48.462689, lng: 35.03132 },
    terminal: true,
    kid: "0",
    femaleSex: true,
  },
  {
    name: `Амбулаторія КНП "ДЦПМСД №4"`,
    address: "м. Дніпро, вул. Ламана, 4, 1 поверх, каб. № 108",
    workingHours: [
      "Пн-Пт. з 8:00 до 14:00",
      "Сб. з 8:00 до 12:00",
      "Нд. вихідний",
    ],
    biomaterial: ["з 8.00 до 12.00"],
    coordinates: { lat: 48.467227, lng: 35.055209 },
    terminal: true,
  },
  {
    name: `Аптека "Таблєткін"`,
    address: "м. Дніпро, пр. Богдана Хмельницького, 16",
    workingHours: ["Пн-Пт. з 8:00 до 14:00", "Сб, Нд. вихідний"],
    biomaterial: ["з 8.00 до 12.00"],
    coordinates: { lat: 48.442047, lng: 35.023113 },
    terminal: true,
  },
  {
    name: `Амбулаторія КНП "ДЦПМСД №4"`,
    address: "м. Дніпро, пр. Героїв, 22, 4 поверх",
    workingHours: ["Пн-Пт. з 8:00 до 14:00", "Сб, Нд. вихідний"],
    biomaterial: ["з 8.00 до 12.00"],
    coordinates: { lat: 48.414219, lng: 35.060745 },
    terminal: true,
  },
  {
    name: `Діагностичний лабораторний центр "VitaLab"`,
    address: "м. Дніпро, бульвар Слави 8, 1 поверх, вхід зі сторони бульвару",
    workingHours: [
      "Пн-Пт. з 7:00 до 14:00",
      "Сб. з 8:00 до 12:00",
      "Нд. вихідний",
    ],
    biomaterial: ["з 7:00 до 11:00", "Cб. з 8:00 до 11:00"],
    coordinates: { lat: 48.41376843918176, lng: 35.065391442519825 },
    terminal: true,
    femaleSex: true,
  },
  {
    name: `Діагностичний лабораторний центр "VitaLab"`,
    address: "м. Дніпро, вул. Академіка Образцова 1",
    workingHours: [
      "Пн-Пт. з 7:00 до 15:00",
      "Сб. з 8:00 до 12:00",
      "Нд. вихідний",
    ],
    biomaterial: ["з 7:00 до 12:00", "Сб. з 8:00 до 11:00"],
    coordinates: { lat: 48.51623388250064, lng: 35.05445679549117 },
    terminal: true,
    kid: 3,
  },
  {
    name: `Амбулаторія КНП "ДЦПМСД №9"`,
    address: "м. Дніпро, вул. Батумська, 13, 1 поверх",
    workingHours: [
      "Пн-Пт. з 8:00 до 14:00",
      "Сб. з 9:00 до 12:00",
      "Нд. вихідний",
    ],
    biomaterial: [
      "з 8:00 до 12:00, на окремі дослідження до 13:45",
      "Сб. з 9:00 до 11:00",
    ],
    coordinates: { lat: 48.515757, lng: 35.084927 },
    terminal: true,
  },
  {
    name: `КП "ДСКМЦМД ім. проф. М.Ф. РУДНЄВА" ДОР"`,
    address:
      "м. Дніпро, пр. Л. Українки, 26, педіатричний корп., 1 поверх, каб. №14",
    workingHours: ["Пн-Пт. з 8:00 до 14:00", "Сб, Нд. вихідний"],
    biomaterial: ["з 8:00 до 12:00"],
    coordinates: { lat: 48.469006, lng: 35.014588 },
    terminal: true,
    kid: "3",
  },
  {
    name: `Амбулаторія КНП «ДЦПМСД №2» ДОР»`,
    address: "м. Дніпро, вул. Перемоги, 113, 1 поверх",
    workingHours: ["Пн-Пт. з 8:00 до 14-00", "Сб, Нд. вихідний"],
    biomaterial: ["з 8:00 до 12:00"],
    coordinates: { lat: 48.413797742281, lng: 35.00741265942202 },
  },
  {
    name: `КП «ДБКЛ з надання психіатричної допомоги» ДОР»`,
    address:
      "м. Дніпро, ж/м Ігрень, вул. Бехтерева 1, приймальне відділення, 1 поверх",
    workingHours: [
      "Пн-Пт. з 8:00 до 14:00",
      "Сб. з 8:00 до 12:00 (друга і четверта субота місяця)",
      "Нд. вихідний",
    ],
    biomaterial: ["з 8:00 до 12:00"],
    coordinates: { lat: 48.472726, lng: 35.185736 },
    terminal: true,
  },
  {
    name: `Амбулаторія КНП "ДЦПМСД №5"`,
    address: "м. Дніпро, вул. Велика Діївська, 111, 1 поверх",
    workingHours: [
      "Пн-Пт. з 8:00 до 14:00",
      "Сб. з 8:00 до 12:00",
      "Нд. вихідний",
    ],
    biomaterial: ["з 8:00 до 12:00"],
    coordinates: { lat: 48.478664102001936, lng: 34.925088840497224 },
    terminal: true,
  },
  {
    name: `КП "ДОКОД" ДОР"`,
    address: "м. Дніпро, вул. Гавриленка, 1 (мамологічний корп., 1 поверх)",
    workingHours: ["Пн-Пт. з 7:30 до 13:00", "Сб, Нд. вихідний"],
    biomaterial: ["з 7:30 до 12:00"],
    coordinates: { lat: 48.43702, lng: 35.01657 },
    terminal: true,
  },
  {
    name: `Аптека "Подорожник"`,
    address: "м. Дніпро, пр. Дмитра Яворницького, 10",
    // workingHours: ["Тимчасово зачинено у зв’язку з ремонтними роботами"],
    workingHours: [
      "Пн-Пт. з 8:00 до 14:00",
      "Сб з 8:00 до 12:00",
      "Нд. вихідний",
    ],
    biomaterial: ["з 8:00 до 12:00"],
    // biomaterial: ["з 30.10.2024 р. по 03.11.2024 р."],
    coordinates: { lat: 48.452875440559964, lng: 35.06953647678639 },
    terminal: true,
    kid: "3",
  },
  {
    name: `Діагностичний лабораторний центр "VitaLab"`,
    address: "м. Дніпро, пров. Вільний, 2А",
    workingHours: [
      "Пн-Пт. з 7:30 до 15:00",
      "Сб з 8:00 до 12:00",
      "Нд. вихідний",
    ],
    biomaterial: ["Пн-Пт. з 7:30 до 12:00", "Сб. з 8:00 до 12:00"],
    coordinates: { lat: 48.53073900172394, lng: 35.0181757192049 },
    terminal: true,
    kid: "3",
  },
  {
    name: `Діагностичний лабораторний центр "VitaLab"`,
    address: "м. Дніпро, пр. Слобожанський, 60",
    workingHours: [
      "Пн-Пт. з 7:30 до 15:00",
      "Сб з 8:00 до 12:00",
      "Нд. вихідний",
    ],
    biomaterial: ["Пн-Пт. з 7:30 до 12:00", "Сб. з 8:00 до 12:00"],
    coordinates: { lat: 48.51174995431485, lng: 35.077659164250505 },
    terminal: true,
    kid: "3",
    femaleSex: true,
  },
  {
    name: `Діагностичний лабораторний центр "VitaLab"`,
    address: "м. Дніпро, пров. Фестивальний, 14",
    workingHours: ["Пн-Пт. з 8:00 до 14:00", "Сб, Нд. вихідний"],
    biomaterial: ["Пн-Пт. з 8:00 до 12:00"],
    coordinates: { lat: 48.52993971580881, lng: 35.02272022698467 },
    terminal: true,
  },
  {
    name: `Діагностичний лабораторний центр "VitaLab"`,
    address: "смт. Слобожанське, вул. Будівельників, 16А",
    workingHours: [
      "Пн-Пт. з 7:00 до 15:00",
      "Сб. з 8:00 до 12:00",
      "Нд. вихідний",
    ],
    biomaterial: ["Пн-Пт. з 7:00 до 12:00", "Сб. з 8:00 до 12:00"],
    coordinates: { lat: 48.532244034791326, lng: 35.0778827843017 },
    terminal: true,
  },
  {
    name: `Діагностичний лабораторний центр "VitaLab" м. Нікополь`,
    address: "м. Нікополь, вул. Пилипа Орлика, 46",
    workingHours: ["Пн-Пт. з 8:00 до 14:00", "Сб., Нд. вихідний"],
    biomaterial: ["з 8:00 до 11:00"],
    coordinates: { lat: 47.57475237677851, lng: 34.374052983001484 },
    terminal: true,
  },
  {
    name: `КП НКП "Криничанська ЦЛ" КСР"`,
    address: "смт. Кринички, вул. Героїв Чорнобиля, 22, 1 поверх, каб. №4",
    workingHours: ["Пн-Пт. з 8:00 до 14:00", "Сб, Нд. вихідний"],
    biomaterial: ["з 8:00 до 11:00"],
    coordinates: { lat: 48.377096, lng: 34.466481 },
    // terminal: true,
    // kid: "3",
  },
  {
    name: `НКП "Солонянська ЦРЛ" ДОР"`,
    address: "смт. Солоне, вул. Усенко, 13, 2 поверх",
    workingHours: ["Пн-Пт. з 8:00 до 14:00", "Сб, Нд. вихідний"],
    biomaterial: ["з 9:00 до 11:00"],
    coordinates: { lat: 48.203229494563864, lng: 34.88024725600128 },
    terminal: true,
  },
]

const columnHelper = createColumnHelper<Laboratory>()

const columns = [
  columnHelper.accessor("name", {
    header: () => <span></span>,
    cell: (info) => (
      <div className="relative flex h-full items-center justify-end">
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor((row) => row.address, {
    id: "lastName",
    cell: (info) => (
      <div className="flex flex-col">
        <div>{info.getValue()}</div>
        {info.row.original.terminal || info.row.original.kid ? (
          <div className="mt-2 flex items-center [&>:not(:first-child)]:ml-3">
            {info.row.original.terminal && (
              <>
                <span className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 152.407 108"
                    className="h-5"
                  >
                    <g>
                      <rect
                        width="152.407"
                        height="108"
                        style={{ fill: "none" }}
                      />
                      <g>
                        <rect
                          x="60.4117"
                          y="25.6968"
                          width="31.5"
                          height="56.6064"
                          style={{ fill: "#ff5f00" }}
                        />
                        <path
                          d="M382.20839,306a35.9375,35.9375,0,0,1,13.7499-28.3032,36,36,0,1,0,0,56.6064A35.938,35.938,0,0,1,382.20839,306Z"
                          transform="translate(-319.79649 -252)"
                          style={{ fill: "#eb001b" }}
                        />
                        <path
                          d="M454.20349,306a35.99867,35.99867,0,0,1-58.2452,28.3032,36.00518,36.00518,0,0,0,0-56.6064A35.99867,35.99867,0,0,1,454.20349,306Z"
                          transform="translate(-319.79649 -252)"
                          style={{ fill: "#f79e1b" }}
                        />
                        <path
                          d="M450.76889,328.3077v-1.1589h.4673v-.2361h-1.1901v.2361h.4675v1.1589Zm2.3105,0v-1.3973h-.3648l-.41959.9611-.41971-.9611h-.365v1.3973h.2576v-1.054l.3935.9087h.2671l.39351-.911v1.0563Z"
                          transform="translate(-319.79649 -252)"
                          style={{ fill: "#f79e1b" }}
                        />
                      </g>
                    </g>
                  </svg>
                </span>
                <span className="">
                  <Image src={visa} alt="Visa" className="h-3 w-full" />
                </span>
              </>
            )}
            {info.row.original.kid && (
              <div className="relative flex items-center">
                {/* <Image
                src={kid}
                alt="Visa"
                className="absolute mb-1.5 h-6 w-full -bottom-1 left-0"
              /> */}
                <div className="ml-7 bg-auto font-medium before:absolute before:-top-0.5 before:left-0 before:h-full before:w-full before:bg-[url('../../public/img/kid.png')] before:bg-[length:22px] before:bg-no-repeat">
                  {info.row.original.kid}+
                </div>
              </div>
            )}
            {info.row.original.femaleSex && (
              <div className="relative flex items-center">
                <Image
                  src={femaleSexGender}
                  alt="Female Sex"
                  className="h-5 w-full"
                />
              </div>
            )}
          </div>
        ) : null}
      </div>
    ),
    header: () => <span>Адреса</span>,
  }),
  columnHelper.accessor("workingHours", {
    header: () => <span>Години роботи</span>,
    cell: (row) => (
      <ul>
        {row.row.original.workingHours.map((time) => (
          <ul key={time}>
            <li>{time}</li>
          </ul>
        ))}
      </ul>
    ),
  }),
  columnHelper.accessor("biomaterial", {
    header: () => <span>Забір біоматеріалу</span>,
    cell: (row) => (
      <ul>
        {row.row.original.biomaterial.map((time) => (
          <ul key={time}>
            <li>{time}</li>
          </ul>
        ))}
      </ul>
    ),
  }),
  // columnHelper.accessor("status", {
  //   header: "Status",
  //   footer: (info) => info.column.id,
  // }),
  // columnHelper.accessor("progress", {
  //   header: "Profile Progress",
  //   footer: (info) => info.column.id,
  // }),
]

const Trigger = (props: any) => {
  const isOpen = props["data-state"] === "open"

  return (
    <button {...props}>
      {props.children}
      <div className="ml-4 text-gray-600">
        {isOpen ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </div>
    </button>
  )
}

const Table = () => {
  const [data, setData] = React.useState(() => [...defaultData])
  const rerender = React.useReducer(() => ({}), {})[1]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <div className="mt-8 flex w-full md:hidden">
        <Accordion
          type="single"
          className="relative w-full border-x border-t"
          collapsible
        >
          {defaultData.map((item) => (
            <AccordionItem
              key={item.address}
              value={item.address}
              className="relative border-b border-slate-200"
            >
              <AccordionTrigger
                className="bg-white p-4 text-left data-[state=open]:border-b"
                asChild
              >
                <Trigger>
                  <div className="flex flex-col">
                    <h3 className="text-sm">{item.name}</h3>
                    <p className="mt-1 text-xs text-gray-500">{item.address}</p>
                  </div>
                </Trigger>
              </AccordionTrigger>
              <AccordionContent className="">
                <div className="p-4 text-sm">
                  <span className="inline-flex font-semibold">
                    Години роботи:
                  </span>
                  {item.workingHours.map((w) => (
                    <p>{w}</p>
                  ))}
                </div>
                <div className="p-4 text-sm">
                  <span className="inline-flex font-semibold">
                    Забір біоматеріалу:
                  </span>
                  {item.biomaterial.map((b) => (
                    <p>{b}</p>
                  ))}
                </div>
                <div className="flex items-center gap-2 p-4">
                  {item.terminal && (
                    <>
                      <span className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 152.407 108"
                          className="h-5"
                        >
                          <g>
                            <rect
                              width="152.407"
                              height="108"
                              style={{ fill: "none" }}
                            />
                            <g>
                              <rect
                                x="60.4117"
                                y="25.6968"
                                width="31.5"
                                height="56.6064"
                                style={{ fill: "#ff5f00" }}
                              />
                              <path
                                d="M382.20839,306a35.9375,35.9375,0,0,1,13.7499-28.3032,36,36,0,1,0,0,56.6064A35.938,35.938,0,0,1,382.20839,306Z"
                                transform="translate(-319.79649 -252)"
                                style={{ fill: "#eb001b" }}
                              />
                              <path
                                d="M454.20349,306a35.99867,35.99867,0,0,1-58.2452,28.3032,36.00518,36.00518,0,0,0,0-56.6064A35.99867,35.99867,0,0,1,454.20349,306Z"
                                transform="translate(-319.79649 -252)"
                                style={{ fill: "#f79e1b" }}
                              />
                              <path
                                d="M450.76889,328.3077v-1.1589h.4673v-.2361h-1.1901v.2361h.4675v1.1589Zm2.3105,0v-1.3973h-.3648l-.41959.9611-.41971-.9611h-.365v1.3973h.2576v-1.054l.3935.9087h.2671l.39351-.911v1.0563Z"
                                transform="translate(-319.79649 -252)"
                                style={{ fill: "#f79e1b" }}
                              />
                            </g>
                          </g>
                        </svg>
                      </span>
                      <span className="">
                        <Image src={visa} alt="Visa" className="h-3 w-full" />
                      </span>
                    </>
                  )}
                  {item.kid && (
                    <div className="relative flex items-center">
                      <div className="ml-7 bg-auto font-medium before:absolute before:-top-0.5 before:left-0 before:h-full before:w-full before:bg-[url('../../public/img/kid.png')] before:bg-[length:22px] before:bg-no-repeat">
                        {item.kid}+
                      </div>
                    </div>
                  )}
                  {item.femaleSex && (
                    <div className="relative flex items-center">
                      <Image
                        src={femaleSexGender}
                        alt="Female Sex"
                        className="h-4 w-full"
                      />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="hidden grid-cols-4 gap-y-8 md:grid" id="list">
        <table className="col-span-4 grid w-auto min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="relative grid grid-cols-4 items-start"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-3 pb-2.5 text-left text-m font-semibold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="relative mb-2 block py-1 before:absolute before:-right-px before:left-1/4 before:top-0 before:-z-[1] before:h-full before:rounded-lg before:bg-white before:shadow-card-small">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="grid grid-cols-4">
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={clsx(
                      index === 0
                        ? "relative z-[1] p-3 pr-4 text-right text-m font-semibold sm:pr-8"
                        : "relative flex min-h-[56px] items-center p-3 text-start text-m md:min-h-[48px]",
                      {
                        "before:absolute before:top-2 before:left-0 before:bottom-2 before:w-px before:bg-[rgba(66,71,112,0.06)]":
                          index > 1,
                      }
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {/* <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
        </table>
        {/* <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Rerender
      </button> */}
      </div>
    </>
  )
}

const Laboratories = () => {
  return (
    <>
      <Head
        title="Пункти - українська медична лабораторія VitaLab"
        description="Медичні лабораторні дослідження у Дніпрі. Понад 400 аналізів. Європейське обладнання та стандарти якості."
      />
      <Section>
        <div className="pb-20">
          <div
            className="section__row-layout gap-16"
            // style={
            //   {
            //     "--row-layout-gap": `var(--row-layout-gap-xlarge)`,
            //   } as React.CSSProperties
            // }
          >
            <Breadcrumbs title="Пункти" />
            <Card className="mt-9 bg-white md:mt-0" shadow="medium">
              <Map
                zoom={12}
                centers={defaultData.map((lab) => lab.coordinates)}
              />
            </Card>
            <Table />
          </div>
        </div>
      </Section>
    </>
  )
}

Laboratories.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Laboratories
