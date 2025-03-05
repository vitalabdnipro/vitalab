import { Button } from "@components/atoms/button"
import * as Modal from "@components/atoms/modal"
import { Text } from "@components/atoms/text/text"

export const AddProfileModal = ({ active, close, onClickOutside }) => {
  return (
    <Modal.Root active={active} onClickOutside={onClickOutside}>
      <Modal.Body>
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <p className="text-base font-normal text-slate-900">Modal content</p>
      </Modal.Body>
      <Modal.Actions>
        <Button variant="outline" onClick={close}>test</Button>
        <Button variant="default">test</Button>
      </Modal.Actions>
    </Modal.Root>
  )
}
