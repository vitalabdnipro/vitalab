import React, { Dispatch, SetStateAction, useState } from "react"
import { cn } from "@utils/cn"
import { UseHitsProps, useHits } from "react-instantsearch-hooks-web"

import { ProductHit } from "../hit"

type HitsProps<THit> = React.ComponentProps<"div"> &
  UseHitsProps & {
    hitComponent: (props: {
      hit: THit
      loading: boolean
      isDisabled: boolean
      close: () => void
      setIsDisabled: Dispatch<SetStateAction<boolean>>
    }) => JSX.Element
  } & {
    close: () => void
  }

const DesktopHits = ({
  hitComponent: Hit,
  className,
  close,
  ...props
}: HitsProps<ProductHit>) => {
  const { hits } = useHits(props)
  const [disabled, setDisabled] = useState(false)

  return (
    <div
      className={cn("no-scrollbar flex-1 overflow-y-scroll", {
        "mb-2 border-t border-gray-200": !!hits.length,
      })}
    >
      <div
        className={cn(
          "transition-[max-height,opacity] duration-300 ease-in-out",
          className,
          {
            "max-h-[400px] opacity-100": !!hits.length,
            "max-h-0 opacity-0": !hits.length,
          }
        )}
      >
        <div className="grid grid-cols-1">
          {hits.map((hit, index) => {
            return (
              <div key={index} className="relative">
                <div className="before:absolute before:h-full before:border-black before:transition hover:bg-gray-100 before:hover:border-l-2">
                  <Hit
                    hit={hit as unknown as ProductHit}
                    isDisabled={disabled}
                    setIsDisabled={setDisabled}
                    close={close}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DesktopHits
