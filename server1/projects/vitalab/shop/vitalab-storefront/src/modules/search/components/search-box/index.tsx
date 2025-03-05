import { FormEvent } from "react"
import X from "@modules/common/icons/x"
import { Search } from "lucide-react"

import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from "../search-box-wrapper"

const ControlledSearchBox = ({
  inputRef,
  isSearchStalled,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    if (onSubmit) {
      onSubmit(event)
    }

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    onReset(event)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div {...props} className="w-full">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex items-center justify-between">
          <Search className="mx-4 h-6 w-6" />
          <input
            ref={inputRef}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="focus:placeholder:text-500 flex-1 border-none bg-transparent p-0 py-4 text-lg text-gray-900 placeholder:text-gray-500 placeholder:transition-colors focus:outline-none focus:ring-0"
          />
          {/* {value && (
            <button
              onClick={handleReset}
              type="button"
              className="mr-5 flex h-5 w-5 items-center justify-center text-gray-900"
            >
              <X size={42} />
            </button>
          )} */}
        </div>
      </form>
    </div>
  )
}

const SearchBox = () => {
  return (
    <SearchBoxWrapper>
      {(props) => {
        return (
          <>
            <ControlledSearchBox {...props} />
          </>
        )
      }}
    </SearchBoxWrapper>
  )
}

export default SearchBox
