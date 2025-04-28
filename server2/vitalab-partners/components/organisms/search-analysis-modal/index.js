import { useState, useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
import AsyncSelect from "react-select/async";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import debounce from "lodash/debounce";
import axios from "axios";
import TestInfoModal from "../../molecules/test-info-modal";

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 0.25 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "#000",
  position: "fixed",
  opacity: 0.25,
  zIndex: 50,
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 350ms cubic-bezier(.4,0,.2,1) forwards`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: "#fff",
  borderRadius: 8,
  display: "flex",
  zIndex: 55,
  flexDirection: "column",
  boxShadow: "0 30px 60px rgba(0,0,0,.12)", // "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  color: "#fff",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  maxWidth: "100%",
  // minHeight: 200,
  // maxHeight: "85vh",
  // padding: "16px 25px",
  //   borderWidth: "1px",
  //   "@media (prefers-reduced-motion: no-preference)": {
  //     animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  //   },
  "&:focus": { outline: "none" },
});

function Content({ children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  margin: 0,
  fontWeight: 400,
  color: "black",
  fontSize: "1.5rem",
  textAlign: "center",
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: "10px 0 20px",
  color: "green",
  fontSize: 15,
  lineHeight: 1.5,
});

// Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = Content;
export const DialogTitle = StyledTitle;
export const DialogDescription = StyledDescription;
export const DialogClose = DialogPrimitive.Close;

// Your app...
const Flex = styled("div", { display: "flex" });
const Box = styled("div", {});

// const Button = styled("button", {
//   all: "unset",
//   display: "inline-flex",
//   width: "100%",
//   alignItems: "center",
//   justifyContent: "center",
//   borderRadius: 4,
//   padding: "0 15px",
//   fontSize: 15,
//   lineHeight: 1,
//   fontWeight: 500,
//   height: 35,

//   variants: {
//     variant: {
//       violet: {
//         backgroundColor: "white",
//         color: "black",
//         boxShadow: `0 2px 10px black`,
//         "&:hover": { backgroundColor: "gray" },
//         "&:focus": { boxShadow: `0 0 0 2px black` },
//       },
//       close: {
//         backgroundColor: "green",
//         color: "White",
//         "&:hover": { backgroundColor: "green" },
//         "&:focus": { boxShadow: `0 0 0 2px green` },
//       },
//     },
//   },

//   defaultVariants: {
//     variant: "violet",
//   },
// });

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: "green" },
  "&:focus": { boxShadow: `0 0 0 2px green` },
});

const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  //   gap: 20,
  //   paddingLeft: "1.25rem",
  //   paddingRight: "1.25rem",
  alignItems: "center",
  marginBottom: 15,
});

const Label = styled("label", {
  fontSize: 15,
  color: "black",
  width: 90,
  textAlign: "right",
});

const Input = styled("input", {
  all: "unset",
  width: "100%",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: "black",
  boxShadow: `0 0 0 1px green`,
  height: 35,

  "&:focus": { boxShadow: `0 0 0 2px green` },
});

const SearchAnalysisModal = (props) => {
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => reset(), [open]);
  useEffect(() => {
    if (props.status) {
      setIsDisabled(true);
    }
  }, [props.status]);

  const { register, control, handleSubmit, reset, watch } = useForm();

  const components = {
    DropdownIndicator: null,
    IndicatorSeparator: null,
  };

  const onSubmit = (data) => {
    if (data) {
      // console.log("props", [...props.analysis, data]);
      props.onSetAnalysis([...props.analysis, data]);
    }

    setOpen(false);
  };

  const fieldValue = watch("searchInput");

  const getAsyncOptions = (inputText) => {
    const candidate = inputText.toLowerCase();
    const byLabel = ({ label }) => label.toLowerCase().includes(candidate);
    // remove this line and uncomment below to try with your impementation
    // return new Promise((resolve) =>
    //   setTimeout(resolve, 1, options.filter(byLabel))
    // );

    //TODO rebuild to SWR
    return axios
      .get(`/api/analyzes?s=${inputText}`)
      .then((response) => {
        // console.log(response.data.data.items[0].id);
        const arr = response.data.data.items
          .filter((item) => item.is_active && item.price > 0)
          .map((item) => {
            console.log("item:", item);
            return {
              label: item.name,
              value: item.code,
              id: item.id,
              colorTube: item.container_color ? item.container_color : "0",
              price: item.price,
              containerName: item.container_name,
              description: item.description,
            };
          });
        //   console.log(item);
        //   return {
        //     label: item.name,
        //     value: item.id,
        //   };
        // }),
        console.log("arr", arr);
        return arr;

        // response.data.data.items.map((item) => {
        //   console.log(item);
        //   return {
        //     label: item.name,
        //     value: item.id,
        //   };
        // }),

        // return [
        //   {
        //     label: response.data.data.items.name,
        //     value: response.data.data.items.id,
        //   },
        // ];
      })
      .catch((error) => {
        alert(JSON.stringify(error));
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptions = useCallback(
    debounce((inputText, callback) => {
      getAsyncOptions(inputText).then((options) => callback(options));
    }, 2000),
    []
  );

  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: "100%",
    }),
    singleValue: (provided) => ({
      ...provided,
      // height: "100%",
      // paddingTop: "3px",
      color: "#000",
    }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid rgb(209,213,219)",
      // borderTop: "1px solid rgb(209,213,219)",
      color: "black",
      backgroundColor: "white",
    }),
  };

  const formatOptionLabel = ({ value, label }) => (
    <div className="flex items-center">
      <div className="mr-2 text-gray-500 text-sm">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );

  console.log(fieldValue);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* <Button leftIcon={<AddIcon />} size="sm" colorScheme="green">
          Додати аналіз
        </Button> */}
        {/* <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-gray-200 text-xs leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200"
        >
          Додати аналіз
        </button> */}
        {/* className="inline-flex items-center px-2.5 py-1.5 border border-gray-200 text-xs leading-4 font-semibold rounded shadow-sm text-gray-900 bg-white hover:border-gray-900 focus:outline-none transition ease-out duration-200" */}
        <button
          type="button"
          // className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs leading-4 font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition ease-out duration-200"
          className="text-sm bg-blue-600 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe fill-white outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)] focus:border-blue-500 disabled:opacity-50 disabled:bg-white disabled:text-[#3c4257] disabled:fill-[#4f566b]"
          disabled={isDisabled}
        >
          {/* <MailIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" /> */}
          <svg
            aria-hidden="true"
            height="12"
            width="12"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <path
              d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z"
              fillRule="evenodd"
            ></path>
          </svg>
          Додати аналіз
        </button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription> */}
          <div className="p-6">
            <DialogTitle>Додати аналіз</DialogTitle>
          </div>
          <div className="py-6 pl-6 pr-3 border-t bg-[#fafafa]">
            <div>
              <div className="flex flex-col flex-wrap w-full justify-center items-stretch basis-auto">
                <div className="flex">
                  {/* <Label htmlFor="name">Name</Label> */}
                  <Controller
                    name={`searchInput`}
                    control={control}
                    render={({ field, ref }) => {
                      return (
                        <AsyncSelect
                          // inputRef={ref}
                          key={field.id}
                          styles={customStyles}
                          value={inputValue}
                          loadingMessage={() => "Пошук..."}
                          noOptionsMessage={() => "..."}
                          placeholder="Введіть код або назву аналізу"
                          components={components}
                          // inputValue={inputValue}
                          loadOptions={loadOptions}
                          // defaultValue={[]}
                          // defaultOptions={[]}
                          // onInputChange={(e) => setInputValue(e)}
                          formatOptionLabel={formatOptionLabel}
                          onChange={(e) => setInputValue(e)}
                          isClearable
                          {...field}
                        />
                      );
                    }}
                  />
                  {fieldValue?.description ? (
                    <div
                      className="ml-3 flex items-center"
                      title="Опис аналізу"
                    >
                      <TestInfoModal
                        description={fieldValue.description}
                        large
                      />
                    </div>
                  ) : (
                    <div
                      className="ml-3 flex items-center"
                      title="Опис аналізу відсутній"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6 text-gray-300 cursor-not-allowed"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <input type="submit" style={{ color: "red" }} /> */}

          {/* <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
            <DialogClose asChild>
              <Button type="button" aria-label="Close" variant="close">
                Додати аналіз до списку
              </Button>
            </DialogClose>
          </Flex> */}
          {/* <DialogClose asChild>
            <IconButton>X</IconButton>
          </DialogClose> */}

          <div className="sticky bottom-0 border-t rounded-b-lg flex border-gray-200">
            <button
              type="button"
              className="cursor-pointer m-0 flex-auto flex text-black outline-none py-6 items-center justify-center border-r basis-1/2"
              onClick={() => setOpen(false)}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="cursor-pointer m-0 flex-auto flex text-black outline-none py-6 items-center justify-center basis-1/2"
            >
              Додати
            </button>
          </div>
          {/* <div className="sticky bottom-0 border-t flex border-gray-200">
            <button
              type="submit"
              className="cursor-pointer text-black outline-none py-6 items-center justify-center flex-auto"
            >
              Додати аналіз в замовлення
            </button>
          </div> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchAnalysisModal;
