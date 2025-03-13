import { ReactElement, useEffect, useState } from "react"
import { useRouter } from "next/router"
import * as Modal from "@components/atoms/dialog"
import { Layout } from "@components/common"
import { Breadcrumbs, Card, Heading, Section } from "@components/ui"
import { InformationCircleIcon } from "@heroicons/react/24/solid"
import { MEDUSA_BACKEND_URL } from "@lib/config"
import { useStore } from "@lib/context/store-context"
import Head from "@modules/common/components/head"
import { useQuery } from "@tanstack/react-query"
import { api } from "@utils/api"
import { cn } from "@utils/cn"
import { eCommerceCart, transformCategories } from "@utils/ecommerce"
import clsx from "clsx"
import { Clock3Icon, Loader2 } from "lucide-react"
import { useCart, useProduct } from "medusa-react"

const Button = ({ children, loading, ...props }) => (
  <button
    className="group inline-flex h-9 w-full items-center justify-center rounded-full bg-emerald-700 py-1.5 text-[15px] font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-gray-600"
    {...props}
  >
    {!loading ? children : <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
  </button>
)

const RelatedTestCard = ({ id }: { id: string }) => {
  const { product, isLoading } = useProduct(id)
  const { storeCart } = useStore()
  const { cart, setCart } = useCart()
  const [loading, setLoading] = useState(false)

  const mutation = api.cart.add.useMutation({
    onSuccess: (cart) => {
      setCart(cart)
      storeCart(cart.id)
      setLoading(false)
      // timedOpen();
    },
  })

  // if (isLoading) {
  //   return <div>loading...</div>
  // }

  if (!cart?.id) {
    return <div className="">...</div>
  }

  const inCart = cart?.items.some(
    (item) => item.variant.product.id === product?.id
  )

  const isSale =
    product?.variants[0]?.prices.length > 1 &&
    (product?.variants[0]?.prices[0].amount -
      product?.variants[0]?.prices[1].amount) /
      product?.variants[0]?.prices[0].amount >
      0.11

  const tooltipContent = product?.description.split(";")

  return (
    <Card
      className={cn(
        "min-h-[20px] border border-gray-200 bg-white bg-gradient-to-r from-[hsla(0,0%,100%,.8)] to-[hsla(0,0%,100%,.8)] bg-clip-padding transition ease-hover md:h-[125px]",
        {
          "!border-transparent": isSale,
        }
      )}
    >
      <div className="grid h-full gap-x-6 md:grid-cols-[1fr_150px]">
        <div className="flex-col items-center gap-x-2 p-4">
          <div className="flex flex-row items-center gap-x-3">
            <div className="text-xs text-gray-400"># {product?.mid_code}</div>
            <div
              className="flex items-center text-xs text-gray-500"
              title="Срок виконання"
            >
              <Clock3Icon className="mr-1 h-3.5 w-3.5" />{" "}
              {product?.metadata?.days}{" "}
              {product?.metadata?.days === 1
                ? "день"
                : product?.metadata?.days > 1 && product?.metadata?.days < 5
                ? "дні" // 2, 3, 4
                : "днів"}
            </div>
            {product?.description && (
              <Modal.Root>
                <Modal.Trigger className="z-10">
                  <InformationCircleIcon className="h-5 w-5 text-green-600 transition ease-hover hover:text-green-800 z-10" />
                </Modal.Trigger>
                <Modal.Body>
                  <Modal.Title className="text-base">
                    {tooltipContent[0]}
                  </Modal.Title>
                  {tooltipContent.map((c, index) => {
                    return (
                      index !== 0 && (
                        <div key={c} className="text-sm">
                          {c}
                        </div>
                      )
                    )
                  })}
                </Modal.Body>
              </Modal.Root>
              //
            )}
            {product?.variants[0].calculated_price_type === "sale" && isSale ? (
              <>
                <span className="inline-flex items-center rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                  Акція
                </span>
              </>
            ) : (
              <div></div>
            )}
          </div>
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-slate-800">
              {product?.title}
            </h4>
          </div>
        </div>
        <div className="h-full items-center p-1 pr-2">
          <div
            className={clsx(
              "flex p-2 md:p-0 md:flex-col items-center h-full justify-center",
              {
                "h-full rounded bg-white p-2": isSale,
              }
            )}
          >
            <div className="flex w-full items-center md:flex-col md:justify-center">
              {product?.variants[0].prices.length > 1 ? (
                <>
                  <span className="mr-2 font-normal text-gray-400 line-through md:mb-1 md:mr-0">
                    {product?.variants[0].prices[0].amount / 100}
                  </span>
                  <span className="text-lg font-semibold leading-none text-slate-900 md:mb-4">
                    {product?.variants[0].prices[1].amount / 100} грн
                  </span>
                </>
              ) : (
                <div className="h-[26px]">
                  <span className="text-xl font-normal text-black/70 line-through">
                    {product?.variants[0].prices[0].amount / 100} грн
                  </span>
                </div>
              )}
            </div>
            <div className="flex max-w-[142px] w-full z-10">
              {!inCart ? (
                <Button
                  loading={mutation.isLoading || isLoading}
                  disabled={loading || isLoading}
                  onClick={() => {
                    setLoading(true)
                    eCommerceCart({
                      cardId: cart?.id,
                      event: "add_to_cart",
                      data: {
                        items: [
                          {
                            item_name: product?.title,
                            item_id: product?.mid_code,
                            price: (product.variants[0]?.prices.length > 1
                              ? product.variants[0]?.prices[1].amount / 100
                              : product.variants[0]?.prices[0].amount / 100
                            ).toFixed(2),
                            item_brand: "Vitalab",
                            quantity: 1,
                            ...transformCategories(
                              product?.metadata?.category_tree as any
                            ),
                          },
                        ],
                      },
                    })
                    mutation.mutate({
                      cartId: cart?.id,
                      manipulationId: product?.metadata?.manipulation_id,
                      variantId: product?.variants[0].id,
                    })
                  }}
                >
                  Замовити
                </Button>
              ) : (
                <Button disabled>У кошику</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

// const fetchManipulation = async (id: string) => {
//   const res = await fetch(
//     `${MEDUSA_BACKEND_URL}/store/products/retrieveByExternalId/${id}`
//   )
//   const json = await res.json()

//   return json.product
// }

const fetchTest = async (id: string) => {
  const res = await fetch(`https://cms.vitalab.com.ua/api/tests/${id}`)
  const json = await res.json()

  return json
}

const Tests = () => {
  const router = useRouter()
  const { id } = router.query

  const { storeCart } = useStore()
  const { cart, setCart } = useCart()
  const { product, isLoading } = useProduct(id as string)
  const [loading, setLoading] = useState(false)
  // const { data: productData } = api.product.getById.useQuery(
  //   {
  //     id: id as string,
  //   },
  //   {
  //     enabled: !!id,
  //   }
  // )

  // const {
  //   data: manipulation,
  //   isLoading: isLoadingManipulation,
  //   isError,
  // } = useQuery(
  //   ["get_manipulation", product?.metadata?.manipulation_id],
  //   () => fetchManipulation(product?.metadata?.manipulation_id as string),
  //   {
  //     enabled: !!product?.metadata?.manipulation_id,
  //     staleTime: Infinity,
  //   }
  // )

  const {
    data: testInfo,
    isLoading: isLoadingTest,
    isError: isErrorTest,
  } = useQuery(
    ["get_test", product?.id],
    () => fetchTest(product?.id as string),
    {
      enabled: !!product?.id,
    }
  )

  const mutation = api.cart.add.useMutation({
    onSuccess: (cart) => {
      setCart(cart)
      storeCart(cart.id)
      setLoading(false)
      // timedOpen();
    },
  })

  if (isLoading || !cart?.id) {
    return <Loader2 className="h-5 w-5 animate-spin" />
  }

  const inCart = cart?.items.some(
    (item) => item.variant.product.id === product?.id
  )

  const isSale =
    product?.variants[0].prices.length > 1 &&
    (product.variants[0].prices[0].amount -
      product.variants[0].prices[1].amount) /
      product.variants[0].prices[0].amount >
      0.11

  const description = product?.description?.split(";")

  return (
    <>
      <Head
        title={`${product?.title} - українська медична лабораторія VitaLab`}
        description="Медичні лабораторні дослідження у Дніпрі. Понад 400 аналізів. Європейське обладнання та стандарти якості."
      />
      <Section>
        <div className="mt-9 md:mt-0 md:pb-24 relative h-full flex flex-1 gap-10 flex-col relative">
          <div className="section__row-layout gap-16">
            <Breadcrumbs title={""} />
            <div className="z-[0] rounded-lg border bg-white">
              <div className="p-4 md:px-6 grid gap-4 grid-cols-2">
                <div className="grid grid-cols-[1fr,auto] col-span-4">
                  <h1 className="font-semibold text-sm md:text-xl">
                    {product?.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    {isSale && (
                      <div className="font-semibold text-xl text-red-500">
                        Акція!
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-[max-content,1fr] gap-x-10 mt-5 gap-y-4 md:gap-y-6 text-sm col-span-4">
                  <div className="font-semibold">Код аналізу:</div>
                  <div className="">{product?.mid_code}</div>
                  <div className="font-semibold">Термін виконання:</div>
                  <div className="">
                    {product?.metadata?.days}{" "}
                    {product?.metadata?.days === 1
                      ? "робоча доба"
                      : product?.metadata?.days > 1 &&
                        product?.metadata?.days < 5
                      ? "робочі доби" // 2, 3, 4
                      : "робочих діб"}
                  </div>
                  {testInfo?.biomaterial && (
                    <>
                      <div className="font-semibold">Біоматеріал:</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: testInfo?.biomaterial,
                        }}
                      ></div>
                    </>
                  )}
                  {testInfo?.otherNames && (
                    <>
                      <div className="font-semibold">Інші назви:</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: testInfo?.otherNames,
                        }}
                      ></div>
                    </>
                  )}
                  {description?.[0] !== "" && (
                    <>
                      <div className="font-semibold">Інформація:</div>
                      <div>
                        {description?.length === 1 ? (
                          <div className="text-sm">{description?.[0]}</div>
                        ) : (
                          description?.map(
                            (c, index) =>
                              index !== 0 && (
                                <div key={c} className="text-sm">
                                  {c}
                                </div>
                              )
                          )
                        )}
                      </div>
                    </>
                  )}
                  {testInfo?.preparation && (
                    <>
                      <div className="font-semibold">Підготовка:</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: testInfo?.preparation,
                        }}
                      ></div>
                    </>
                  )}
                </div>
                <div className="md:col-start-2 md:col-end-5 bg-white z-10 col-span-4 md:col-span-2">
                  <div className="grid grid-cols-[1fr,142px] md:grid-cols-[1fr,142px] mt-5 md:mt-0 w-full">
                    <div className="place-content-center">
                      <div className="flex w-full items-center md:justify-center gap-4 shrink-0">
                        <span className="font-semibold text-xl hidden md:block">
                          Вартість:
                        </span>
                        {product?.variants[0].prices.length > 1 ? (
                          <>
                            <span className="text-xl font-normal text-black/70 line-through">
                              {product?.variants[0].prices[0].amount / 100}
                            </span>
                            <div className="text-xl font-semibold leading-none text-red-500">
                              {`${
                                product?.variants[0].prices[1].amount / 100
                              } грн`}
                            </div>
                          </>
                        ) : (
                          <div className="text-xl font-semibold leading-none text-slate-900">
                            {`${
                              product?.variants[0].prices[0].amount / 100
                            } грн`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full z-10 place-content-end">
                      {!inCart ? (
                        <Button
                          loading={mutation.isLoading || isLoading || loading}
                          disabled={isLoading || loading}
                          onClick={() => {
                            if (!product) return
                            setLoading(true)
                            eCommerceCart({
                              cardId: cart?.id,
                              event: "add_to_cart",
                              data: {
                                items: [
                                  {
                                    item_name: product?.title,
                                    item_id: product?.mid_code,
                                    price: (product.variants[0]?.prices.length >
                                    1
                                      ? product.variants[0]?.prices[1].amount /
                                        100
                                      : product.variants[0]?.prices[0].amount /
                                        100
                                    ).toFixed(2),
                                    item_brand: "Vitalab",
                                    quantity: 1,
                                    ...transformCategories(
                                      product?.metadata?.category_tree as any
                                    ),
                                  },
                                ],
                              },
                            })
                            mutation.mutate({
                              cartId: cart?.id,
                              manipulationId:
                                product?.metadata?.manipulation_id,
                              variantId: product?.variants[0].id,
                            })
                          }}
                        >
                          Замовити
                        </Button>
                      ) : (
                        <Button disabled>У кошику</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {testInfo?.description && (
            <div className="z-[0] rounded-lg border bg-white">
              <div className="p-4 md:px-6 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h2 className="font-semibold text-xl">Опис дослідження:</h2>
                </div>
                <div className="text-sm col-span-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: testInfo?.description,
                    }}
                  ></div>
                </div>
                <div className="md:col-start-2 md:col-end-5 bg-white z-10 col-span-4 md:col-span-2">
                  <div className="grid grid-cols-[1fr,142px] md:grid-cols-[1fr,142px] mt-5 md:mt-0 w-full">
                    <div className="place-content-center">
                      <div className="flex w-full items-center md:justify-center gap-4 shrink-0">
                        <span className="font-semibold text-xl hidden md:block">
                          Вартість:
                        </span>
                        {product?.variants[0].prices.length > 1 ? (
                          <>
                            <span className="text-xl font-normal text-black/70 line-through">
                              {product?.variants[0].prices[0].amount / 100}
                            </span>
                            <div className="text-xl font-semibold leading-none text-red-500">
                              {`${
                                product?.variants[0].prices[1].amount / 100
                              } грн`}
                            </div>
                          </>
                        ) : (
                          <div className="text-xl font-semibold leading-none text-slate-900">
                            {`${
                              product?.variants[0].prices[0].amount / 100
                            } грн`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full z-10 place-content-end">
                      {!inCart ? (
                        <Button
                          loading={mutation.isLoading || isLoading || loading}
                          disabled={isLoading || loading}
                          onClick={() => {
                            if (!product) return
                            setLoading(true)
                            eCommerceCart({
                              cardId: cart?.id,
                              event: "add_to_cart",
                              data: {
                                items: [
                                  {
                                    item_name: product?.title,
                                    item_id: product?.mid_code,
                                    price: (product.variants[0]?.prices.length >
                                    1
                                      ? product.variants[0]?.prices[1].amount /
                                        100
                                      : product.variants[0]?.prices[0].amount /
                                        100
                                    ).toFixed(2),
                                    item_brand: "Vitalab",
                                    quantity: 1,
                                    ...transformCategories(
                                      product?.metadata?.category_tree as any
                                    ),
                                  },
                                ],
                              },
                            })
                            mutation.mutate({
                              cartId: cart?.id,
                              manipulationId:
                                product?.metadata?.manipulation_id,
                              variantId: product?.variants[0].id,
                            })
                          }}
                        >
                          Замовити
                        </Button>
                      ) : (
                        <Button disabled>У кошику</Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {testInfo?.relatedTests?.length > 0 && (
            <div className="z-[0] rounded-lg border bg-white">
              <div className="p-4 md:px-6 grid gap-4">
                <div className="grid">
                  <h2 className="font-semibold text-xl">
                    З цим дослідженням замовляють:
                  </h2>
                </div>
                {testInfo?.relatedTests.map((test) => (
                  <RelatedTestCard
                    key={test.relatedTestId}
                    id={test.relatedTestId}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}

Tests.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Tests
