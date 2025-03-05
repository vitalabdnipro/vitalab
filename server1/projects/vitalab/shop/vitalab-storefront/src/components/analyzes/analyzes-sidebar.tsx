import React, { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import * as Collapsible from "@radix-ui/react-collapsible"
import { useMediaQuery, useWindowSize } from "@uidotdev/usehooks"
import clsx from "clsx"
import { arrayToTree } from "performant-array-to-tree"

const Content = (props) => {
  const [isOpen, setIsOpen] = React.useState(props.code === "56")
  const router = useRouter()
  const scroll = !!props.executeScroll
  // {size.width < 640 ? (
  //   <a
  //     href={node.data.id.toString()}
  //     onClick={(e) => {
  //       e.preventDefault()
  //       router
  //         .push(node.data.id.toString())
  //         .then(() => executeScroll())
  //     }}
  //   >
  //     {node.data.name}1
  //   </a>
  // ) : (
  //   <Link href={node.data.id.toString()}>
  //     {node.data.name}
  //   </Link>
  // )}
  return (
    <div className="my-[18px] first:mt-0">
      <Collapsible.Root open={isOpen} onOpenChange={setIsOpen} className="test">
        <Collapsible.Trigger
          className="group flex items-center text-left text-sm text-black hover:opacity-60 radix-state-open:font-semibold [&>svg]:mr-[14px]"
          asChild
        >
          <button
            className="flex items-center text-left [&>svg]:mr-[14px]"
            onClick={() => {
              if (props.count > 0 && !isOpen) {
                router
                  .push(`${props.id}`)
                  .then(() => scroll && props.executeScroll())
              }
            }}
          >
            <svg
              fill="none"
              height="10"
              viewBox="0 0 6 10"
              width="6"
              xmlns="http://www.w3.org/2000/svg"
              className="duration-300 ease-in-out group-radix-state-open:rotate-90"
            >
              <path
                d="M1.4 8.56L4.67 5M1.4 1.23L4.66 4.7"
                stroke="#666"
                strokeLinecap="square"
              ></path>
            </svg>
            {props.label}
          </button>
        </Collapsible.Trigger>
        <Collapsible.Content className="my-[18px] first:mt-0">
          <div className="ml-[2px] mt-[18px] border-l border-[#eaeaea] pl-[18px]">
            <ul>
              {props.items
                .sort((a, b) => {
                  return a.data.order > b.data.order ? 1 : -1
                })
                .map((item) => {
                  const isActive = router.query.slug == item.data.id

                  if (
                    item.data.name === "D" ||
                    item.data.name === "Архівні позиції"
                  ) {
                    return null
                  }

                  return item?.children?.length > 0 ? (
                    <Content
                      key={item.data.id}
                      id={item.data.id}
                      label={item.data.name}
                      items={item.children}
                    />
                  ) : (
                    <li
                      key={item.data.id}
                      className={clsx(
                        "link mb-[18px] flex items-center text-sm font-normal text-black ease-hover before:mt-2 before:mr-4 before:block before:h-1 before:w-1 before:shrink-0 before:basis-1 before:self-start before:rounded-full before:bg-[#666] hover:opacity-60",
                        {
                          "font-semibold": isActive,
                          hidden: item.data.productCount === 0,
                        }
                      )}
                    >
                      {/* <Link href={`${item.data.id}`}>{item.data.name}</Link> */}
                      <button
                        className="text-left"
                        onClick={() =>
                          router
                            .push(`${item.data.id}`)
                            .then(() => scroll && props.executeScroll())
                        }
                      >
                        {item.data.name}
                      </button>
                    </li>
                  )
                })}
            </ul>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}

const AnalyzesSidebar = (props) => {
  const size = useWindowSize()

  const router = useRouter()
  // const { data: categories } = props;
  const tree = arrayToTree(props.data, {
    id: "code",
  })

  const executeScroll = () => props.scrollRef.current.scrollIntoView()

  return (
    <aside className="flex flex-col">
      <div className="hidden">search</div>
      {/* content */}
      <div className="px-4">
        {/* level 1 */}
        <div className=""></div>
        {/* sidebar analyzes */}
        <div>
          <h4 className="mb-5 text-lg font-semibold text-gray-900">Аналізи</h4>
          <div className="">
            {tree
              .sort((a, b) => {
                return a.data.order > b.data.order ? 1 : -1
              })
              .map((node) => {
                const isActive = router.query.slug === node.data.id.toString()
                // console.log("node", node)
                if (
                  node.data.name === "D" ||
                  node.data.name === "Архівні позиції"
                )
                  return null

                return node?.children?.length > 0 ? (
                  <Content
                    key={node.data.id}
                    id={node.data.id}
                    label={node.data.name}
                    items={node.children}
                    code={node.data.code}
                    count={node.data.count}
                    executeScroll={size.width < 640 ? executeScroll : null}
                  />
                ) : (
                  <li
                    key={node.data.id}
                    className={clsx(
                      "link mb-[18px] flex items-center text-sm font-normal text-black before:mt-2 before:mr-4 before:block before:h-1 before:w-1 before:shrink-0 before:basis-1 before:self-start before:rounded-full before:bg-[#666] hover:opacity-60",
                      {
                        "font-semibold": isActive,
                        hidden: node.data.productCount === 0,
                      }
                    )}
                  >
                    {size.width < 640 ? (
                      <a
                        href={node.data.id.toString()}
                        onClick={(e) => {
                          e.preventDefault()
                          router
                            .push(node.data.id.toString())
                            .then(() => executeScroll())
                        }}
                      >
                        {node.data.name}
                      </a>
                    ) : (
                      <Link href={node.data.id.toString()}>
                        {node.data.name}
                      </Link>
                    )}
                  </li>
                )
              })}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AnalyzesSidebar
