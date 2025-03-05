import { Button } from "@components/atoms/button"
import * as Modal from "@components/atoms/modal"
import { IModal } from "@hooks/use-modal"

export const OrderCardInfoModal = ({ active, close, order }: IModal & any) => {
  return (
    <Modal.Root active={active} onClickOutside={close}>
      <Modal.Body>
        <Modal.Header>
          <Modal.Title>#{3330011000 + order.display_id}</Modal.Title>
        </Modal.Header>
        <div className="flex flex-col items-stretch justify-start gap-y-2">
          {order.items
            .sort((a, b) => {
              // return a.created_at > b.created_at ? -1 : 1
              if (
                a.variant.product?.metadata?.category?.code === 14 &&
                b.variant.product?.metadata?.category?.code !== 14
              ) {
                return 1
              } else if (
                a.variant.product?.metadata?.category?.code !== 14 &&
                b.variant.product?.metadata?.category?.code === 14
              ) {
                return -1
              } else {
                return a.created_at > b.created_at ? -1 : 1
              }
            })
            .map((i, index) => (
              <div key={i.id} className="flex flex-col">
                <div className="text-small-regular flex items-center text-gray-700">
                  <span className="font-normal text-gray-900">                    
                    <span className="text-gray-500">{index + 1}.</span> {i.title} <span className="text-gray-500">({i.variant?.mid_code})</span>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </Modal.Body>
      <Modal.Actions>
        <Button type="secondary" onClick={close} className="bg-white">
          Закрити
        </Button>
      </Modal.Actions>
    </Modal.Root>
  )
}
