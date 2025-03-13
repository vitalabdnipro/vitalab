import React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/molecules/dialog"
import useToggleState from "@lib/hooks/use-toggle-state"
import { SEARCH_INDEX_NAME, searchClient } from "@lib/search-client"
import Modal from "@modules/common/components/modal"
// import Search from "@modules/common/icons/search"
import DesktopHit from "@modules/search/components/desktop-hit"
import DesktopHits from "@modules/search/components/desktop-hits"
import SearchBox from "@modules/search/components/search-box"
import { Search } from "lucide-react"
import { InstantSearch } from "react-instantsearch-hooks-web"

const DesktopSearchModal = () => {
  // const { state, close, open } = useToggleState()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* <button onClick={open} className="flex h-full items-center gap-x-2">
        <Search />
        Search
      </button>

      <Modal isOpen={state} close={close} size="large">
        <Modal.Body>
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <div className="flex h-full flex-col">
              <div className="flex w-full items-center gap-x-2 bg-gray-50 p-4">
                <Search />
                <SearchBox />
              </div>

              <div className="no-scrollbar mt-6 flex-1 overflow-y-scroll">
                <DesktopHits hitComponent={DesktopHit} />
              </div>
            </div>
          </InstantSearch>
        </Modal.Body>
      </Modal> */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="outline-none">
          <Search
            // onClick={setOpen}
            className="h-6 w-6 transition hover:text-gray-500"
          />
        </DialogTrigger>
        <DialogContent className="p-0 sm:max-w-3xl">
          {/* <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader> */}
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <div className="flex h-full flex-col">
              {/* <div className="pb-large border-grey-20 flex items-center gap-x-4 border-b border-solid "> */}
              <div className="flex items-center">
                <SearchBox />
              </div>
              <DesktopHits hitComponent={DesktopHit} close={setOpen} />
            </div>
          </InstantSearch>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default DesktopSearchModal
