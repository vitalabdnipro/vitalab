import { useMemo, useState } from "react"
import Link from "next/link"
import * as Modal from "@components/atoms/dialog"
import { Card, Tooltip } from "@components/ui"
import { Skeleton } from "@components/v2/skeleton"
import { InformationCircleIcon } from "@heroicons/react/24/outline"
import { useStore } from "@lib/context/store-context"
import { useAddItem } from "@lib/hooks/use-add-Item"
import useProductPrice from "@lib/hooks/use-product-price"
import { useCartStore } from "@lib/store/cart"
import Spinner from "@modules/common/icons/spinner"
import { cn } from "@utils/cn"
import { eCommerceCart, transformCategories } from "@utils/ecommerce"
import clsx from "clsx"
import { Clock3Icon, Loader2 } from "lucide-react"
import { useCart, useProduct } from "medusa-react"
import { api } from "utils/api"

const Button = ({ children, loading, ...props }) => (
  <button
    className="group inline-flex h-9 w-full items-center justify-center rounded-full bg-emerald-700 py-1.5 text-[15px] font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-gray-600"
    {...props}
  >
    {!loading ? children : <Loader2 className="ml-2 h-5 w-5 animate-spin" />}
  </button>
)

const ProductCard = ({ data, loading, setLoading }) => {
  // const {
  //   product,
  //   calculated_price,
  //   original_price,
  //   price_type,
  //   percentage_diff,
  // } = data
  const { storeCart } = useStore()
  const { cart, setCart } = useCart()
  const { product, isLoading } = useProduct(data?.variants[0]?.product_id)

  // const mutation = useAddItem();
  const mutation = api.cart.add.useMutation({
    onSuccess: (cart) => {
      setCart(cart)
      storeCart(cart.id)
      setLoading(false)
      // timedOpen();
    },
  })

  // const price = useProductPrice({
  //   id: data.id,
  //   variantId: data.variants[0]?.id,
  // });

  // const selectedPrice = useMemo(() => {
  //   const { variantPrice, cheapestPrice } = price;

  //   return variantPrice || cheapestPrice || null;
  // }, [price]);

  const getPercentageDiff = useMemo(() => {
    const diff =
      data.variants[0].original_price - data.variants[0].calculated_price
    const decrease = (diff / data.variants[0].original_price) * 100
    const fixed = Math.round(decrease * 1) / 1

    return fixed
  }, [data.variants])

  // const percentageDiff = getPercentageDiff(
  //   data.variants[0].calculated_price,
  //   data.variants[0].original_price
  // )

  if (!cart?.id) {
    return <div className="">...</div>
  }

  const inCart = cart?.items.some((item) => item.variant.product.id === data.id)

  // console.log(
  //   "getPercentageDiff",
  //   getPercentageDiff,
  //   data.variants[0].calculated_price_type === "sale"
  // )

  const tooltipContent = data?.description.split(";")

  return (
    // <Link href={`/analysis/${data.handle}`} passHref>
    //background-image: linear-gradient(165deg,var(--start-color),var(--end-color));
    <>
      {/* {selectedPrice && ( */}
      <div className="relative group">
        <Link
          className="absolute z-[1] h-full w-full rounded-[8px] group-hover:shadow-lg transition-shadow"
          href={`/tests/${data.id}`}
        ></Link>
        {data.variants[0].calculated_price_type === "sale" &&
          getPercentageDiff > 11 && (
            <div
              className={clsx(
                "absolute -z-[2] h-full w-full rounded-[8px] bg-gradient-to-r from-[#ff4d4d] to-[#f9cb28]",
                {
                  "before:absolute before:h-full before:w-full before:border-[12px] before:bg-gradient-to-r before:from-[#ff4d4d] before:to-[#f9cb28] before:blur-lg":
                    data.variants[0].calculated_price_type === "sale" &&
                    getPercentageDiff > 11,
                }
              )}
            >
              {/* <div className="absolute -right-1.5 top-[calc(80%/2)] -rotate-90 transform font-medium text-gray-700">
            Акція
          </div> */}
            </div>
          )}
        <Card
          className={cn(
            "min-h-[20px] border border-gray-200 bg-white bg-gradient-to-r from-[hsla(0,0%,100%,.8)] to-[hsla(0,0%,100%,.8)] bg-clip-padding transition ease-hover md:h-[125px]",
            {
              "!border-transparent": getPercentageDiff > 11,
            }
          )}
        >
          {/* {selectedPrice ? ( */}
          <div className="grid h-full gap-x-6 md:grid-cols-[1fr_150px]">
            <div className="flex-col items-center gap-x-2 p-4">
              <div className="flex flex-row items-center gap-x-3">
                <div className="text-xs text-gray-400"># {data?.mid_code}</div>
                <div
                  className="flex items-center text-xs text-gray-500"
                  title="Срок виконання"
                >
                  <Clock3Icon className="mr-1 h-3.5 w-3.5" />{" "}
                  {data?.metadata?.days}{" "}
                  {data?.metadata?.days === 1
                    ? "день"
                    : data?.metadata?.days > 1 && data?.metadata?.days < 5
                    ? "дні" // 2, 3, 4
                    : "днів"}
                </div>
                {data.description && (
                  // <Tooltip
                  //   content={tooltipContent}
                  //   className="max-h-40 w-[600px] rounded-lg border border-gray-200 bg-white p-4 text-s shadow-sm"
                  //   sideOffset={7}
                  // >
                  //   <InformationCircleIcon className="h-5 w-5 text-gray-400 transition ease-hover hover:text-gray-800" />
                  // </Tooltip>
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
                {data.variants[0].calculated_price_type === "sale" &&
                getPercentageDiff > 11 ? (
                  <>
                    <span className="inline-flex items-center rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                      Акція
                    </span>
                    {/* <span className="inline-flex items-center rounded bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                      {percentage_diff}%
                    </span> */}
                  </>
                ) : (
                  <div></div>
                )}
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-semibold text-slate-800">
                  {data.title}
                </h4>
              </div>
              {/* <div className="mt-2 flex flex-row ">
            <InformationCircleIcon className="h-5 w-5" />
          </div> */}
            </div>
            <div className="h-full items-center p-1">
              <div
                className={clsx(
                  "flex p-2 md:p-0 md:flex-col items-center justify-start h-full justify-center",
                  {
                    "h-full rounded bg-white p-2":
                      data.variants[0].calculated_price_type === "sale",
                  }
                )}
              >
                <div className="flex w-full items-center md:flex-col md:justify-center">
                  {data.variants[0].calculated_price_type === "sale" ? (
                    <span className="mr-2 font-normal text-gray-400 line-through md:mb-1 md:mr-0">
                      {data.variants[0].original_price / 100}
                    </span>
                  ) : (
                    <div className="h-[26px]"></div>
                  )}
                  <div className="text-lg font-semibold leading-none text-slate-900 md:mb-4">
                    {`${data.variants[0].calculated_price / 100} грн`}
                  </div>
                </div>
                {/* {!mutation.isLoading ? ( */}
                <div className="flex w-full z-10">
                  {!inCart ? (
                    // <Button
                    //   type="primary"
                    //   loading={mutation.isLoading}
                    //   disabled={loading}
                    //   onClick={() => {
                    //     setLoading(true)
                    //     mutation.mutate({
                    //       cartId: cart?.id,
                    //       manipulationId: product.metadata?.manipulation_id,
                    //       variantId: product.variants[0].id,
                    //     })
                    //   }}
                    // >
                    //   Замовити
                    // </Button>
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
                                price: (
                                  data.variants[0].calculated_price / 100
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
                          manipulationId: data.metadata?.manipulation_id,
                          variantId: data.variants[0].id,
                        })
                      }}
                    >
                      Замовити
                    </Button>
                  ) : (
                    <Button disabled>У кошику</Button>
                    // <Button
                    //   onClick={() => {
                    //     setLoading(true)
                    //     eCommerceCart({
                    //       cardId: cart?.id,
                    //       event: "purchase",
                    //       data: {
                    //         items: [
                    //           {
                    //             item_name: product?.title,
                    //             item_id: product?.mid_code,
                    //             price: (
                    //               data.variants[0].calculated_price / 100
                    //             ).toFixed(2),
                    //             item_brand: "Vitalab",
                    //             quantity: 1,
                    //             ...transformCategories(
                    //               product?.metadata?.category_tree as any
                    //             ),
                    //           },
                    //         ],
                    //       },
                    //     })
                    //     mutation.mutate({
                    //       cartId: cart?.id,
                    //       manipulationId: data.metadata?.manipulation_id,
                    //       variantId: data.variants[0].id,
                    //     })
                    //   }}
                    // >
                    //   У кошику
                    // </Button>
                  )}
                </div>
                {/* {mutation.error && (
            <p>Something went wrong! {mutation.error.message}</p>
          )} */}
              </div>
            </div>
          </div>
          {/* ) : (
        <div>Loading...</div>
      )} */}
        </Card>
      </div>
      {/* )} */}
    </>
    // </Link>
  )
}

const ProductList = ({ categories, slug }) => {
  const [loading, setLoading] = useState(false)

  const [collectionId] = categories.filter((obj) => obj.id.toString() === slug)

  const { data } = api.product.getByCollection.useQuery(
    {
      id: collectionId.slug,
    },
    {
      enabled: !!collectionId,
    }
  )

  if (!data) {
    return (
      <div className="grid gap-y-4">
        <Card className="min-h-[20px] border border-gray-200 bg-white bg-gradient-to-r from-[hsla(0,0%,100%,.8)] to-[hsla(0,0%,100%,.8)] bg-clip-padding transition ease-hover md:h-[125px]">
          <div className="grid h-full gap-x-6 md:grid-cols-[1fr_150px]">
            <div className="flex-col items-center gap-x-2 p-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="mt-2 h-5 w-[250px]" />
            </div>
            <div className="flex h-full items-center p-1">
              <Skeleton className="m-auto hidden h-24 w-24 rounded-3xl md:flex" />
            </div>
          </div>
        </Card>
        <Card className="min-h-[20px] border border-gray-200 bg-white bg-gradient-to-r from-[hsla(0,0%,100%,.8)] to-[hsla(0,0%,100%,.8)] bg-clip-padding transition ease-hover md:h-[125px]">
          <div className="grid h-full gap-x-6 md:grid-cols-[1fr_150px]">
            <div className="flex-col items-center gap-x-2 p-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="mt-2 h-5 w-[250px]" />
            </div>
            <div className="flex h-full items-center p-1">
              <Skeleton className="m-auto hidden h-24 w-24 rounded-3xl md:flex" />
            </div>
          </div>
        </Card>
        <Card className="min-h-[20px] border border-gray-200 bg-white bg-gradient-to-r from-[hsla(0,0%,100%,.8)] to-[hsla(0,0%,100%,.8)] bg-clip-padding transition ease-hover md:h-[125px]">
          <div className="grid h-full gap-x-6 md:grid-cols-[1fr_150px]">
            <div className="flex-col items-center gap-x-2 p-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="mt-2 h-5 w-[250px]" />
            </div>
            <div className="flex h-full items-center p-1">
              <Skeleton className="m-auto hidden h-24 w-24 rounded-3xl md:flex" />
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return data
    .sort((a, b) => a.mid_code - b.mid_code)
    .map((item) => {
      return (
        <ProductCard
          key={item.title}
          data={item}
          loading={loading}
          setLoading={setLoading}
        />
      )
    })
}

export default ProductList
