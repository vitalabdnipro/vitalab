import { useState, useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { styled, keyframes } from "@stitches/react";
// import uk from "date-fns/locale/uk";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import InputField from "../../atoms/text-input/input";
import generator from "generate-password";
import ClipboardCopyIcon from "../../fundamentals/icons/clipboard-copy-icon";
import Switch from "../../atoms/switch";

dayjs.extend(utc);
dayjs.extend(customParseFormat);

//TODO Clean modals
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
  zIndex: 55,
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 30px 60px rgba(0,0,0,.12)", // "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  color: "#000",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500, //"90vw",
  maxWidth: "100%",
  overflow: "hidden",
  overflowY: "auto",
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

const generatePw = () => {
  const pw = generator.generate({
    length: 11,
    numbers: true,
  });

  return pw;
};

const EditPartnerModal = ({ open, partner, onOpenChange }) => {
  const [isOpen, setOpen] = useState(false);
  const [generatePassword, setGeneratePassword] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [password, setPassword] = useState(null);

  const router = useRouter();
  // console.log(partner?.isActive);
  useEffect(() => {
    // console.log(generatePassword);
    if (!generatePassword) {
      setPassword(generatePw());
      // setValue("password", password);
    } else {
      setPassword(null);
    }

    setValue("password", password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatePassword]);

  useEffect(() => {
    if (partner) {
      setValue("organization", partner.organization.name);
      setValue("lisId", partner.lisId);
      setValue("lastName", partner.lastName);
      setValue("firstName", partner.firstName);
      setValue("middleName", partner.middleName);
      setValue("phone", partner.phone);
      setValue("email", partner.email);
      setValue("isActive", partner.isActive === "TRUE");

      // setIsActive(partner.isActive === "TRUE");
      setOpen(open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, partner]);

  useEffect(() => setGeneratePassword(false), [isOpen]);

  // console.log(`p: ${partner?.isActive} a: ${isActive}`);
  const { register, control, handleSubmit, reset, watch, setValue } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log(isActive);
    const response = await fetch(`/api/partners/${partner.id}`, {
      body: JSON.stringify({
        data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    // const partner = await response.json();

    setOpen(false);
  };

  const handleGeneratePasswordSwitch = () => {
    setGeneratePassword(!generatePassword);
  };

  // const handleDeactivateSwitch = () => {
  //   setIsActive(!isActive);
  //   console.log(!isActive);
  // };

  // const ControlledSwitch = (props) => (
  //   <Controller
  //     {...props}
  //     render={({ field }) => (
  //       <Switch
  //         {...field}
  //         value={props.value}
  //         checked={field.value === props.value}
  //         onCheckedChange={(checked) => {
  //           field.onChange(checked ? props.value : null);
  //         }}
  //       />
  //     )}
  //   />
  // );

  const ControlledSwitch = (props) => (
    <Controller
      {...props}
      render={({ field }) => {
        console.log("field:", field);
        // console.log("field:1", isActive);
        return (
          <Switch
            {...field}
            // defaultChecked={field.value}
            value={props.value}
            checked={field.value === props.value}
            onCheckedChange={(checked) => {
              field.onChange(checked ? true : false);
            }}
            // onClick={() => setIsActive(!isActive)}
          />
        );
      }}
    />
  );

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <button
          type="button"
          // className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition ease-out duration-200"
          // className="inline-flex h-10 leading-10 items-center px-[14px] py-2 border border-transparent text-sm font-medium rounded-[4px] shadow-md text-white bg-blue-500 hover:bg-blue-400 hover:-translate-y-px focus:outline-none transition ease-linear duration-150"
          // className="font-medium text-sm bg-white border-0 h-7 flex items-center py-1 px-2 rounded duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-[#3c4257] shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-[#4f566b]"
          // className="font-medium text-sm bg-blue-500 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe hover:text-[#1a1f36] hover:shadow-stripeHover hover:fill-[#1a1f36] fill-white"
          className="text-sm bg-blue-600 border-0 h-7 flex items-center py-1 px-2 rounded-md duration-[240ms] transition-all ease-[cubic-bezier(.25,.1,.25,1)] text-white shadow-stripe fill-white outline-none focus:ring focus:ring-[rgba(58,151,212,0.36)]"
          // transition: background-color 0.24s, box-shadow 0.24s, color 0.24s;
        >
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
          Додати партнера
        </button>
      </DialogTrigger> */}
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          onOpenChange(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <DialogTitle>Редагувати партнера</DialogTitle>
          </div>
          <div className="p-6 border-t bg-[#fafafa]">
            <div>
              <div className="flex flex-col flex-wrap w-full justify-center items-stretch basis-auto">
                <div className="flex flex-col flex-1">
                  <InputField
                    label={"Організація"}
                    name={"organization"}
                    {...register("organization", {
                      required: true,
                    })}
                  />
                </div>
                <div className="flex flex-col flex-1 mt-5">
                  <InputField
                    label={"ID"}
                    name={"lisId"}
                    {...register("lisId", {
                      required: true,
                    })}
                  />
                </div>
                <div className="grid gap-2 items-center grid-cols-3 mt-12">
                  <div className="col-span-1">
                    <InputField
                      label={"Прізвище"}
                      name={"lastName"}
                      {...register("lastName", {
                        required: true,
                        pattern: /^\S*$/,
                      })}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      label={"Ім'я"}
                      name={"firstName"}
                      {...register("firstName", {
                        required: true,
                        pattern: /^\S*$/,
                      })}
                    />
                  </div>
                  <div className="col-span-1">
                    <InputField
                      label={"По-батькові"}
                      name={"middleName"}
                      {...register("middleName", {
                        required: true,
                        pattern: /^\S*$/,
                      })}
                    />
                  </div>
                </div>
                <div className="grid gap-2 items-center grid-cols-3 mt-5">
                  <div className="col-span-1">
                    <InputField
                      label={"Телефон"}
                      name={"phone"}
                      {...register("phone", {
                        required: true,
                        pattern: /^\+[1-9]\d{1,11}$/,
                      })}
                    />
                  </div>
                  <div className="col-span-2">
                    <InputField
                      label={"Електронна пошта"}
                      name={"email"}
                      {...register("email", {
                        required: false,
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                  </div>
                </div>
                {/* <div className="flex flex-row flex-1 mt-6 text-sm items-center justify-end"> */}
                {/* <Controller
                    control={control}
                    name="deactivate"
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        {...field}
                        id="s1"
                        value={deactivate}
                        checked={deactivate}
                        onCheckedChange={(c) => setDeactivate(c)}
                        onClick={handleDeactivateSwitch}
                      />
                    )}
                  /> */}
                {/* <label>
                    <ControlledSwitch control={control} name="deactivate" value="true" />
                    Деактивувати партнера
                  </label>
                </div> */}
                <div className="flex flex-row flex-1 mt-6 text-sm items-center justify-end">
                  <label htmlFor="s1" style={{ paddingRight: 15 }}>
                    Партнер активний
                  </label>
                  <ControlledSwitch
                    control={control}
                    name="isActive"
                    value={true}
                  />
                  {/* <Switch
                    id="s1"
                    name={"activate"}
                    checked={isActive}
                    value={isActive}
                    onCheckedChange={(c) => setIsActive(c)}
                    onClick={handleDeactivateSwitch}
                    {...register("activate", { required: false })}
                  /> */}
                  {/* <Controller
                    control={control}
                    name="ReactDatepicker"
                    render={({ field }) => {
                      console.log("field:", field);
                      console.log("field:1", isActive);
                      return (
                        <Switch
                          {...field}
                          value={isActive}
                          checked={field.value === isActive}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? "TRUE" : "null");
                          }}
                          // onClick={() => setIsActive(!isActive)}
                        />
                      );
                    }}
                  /> */}
                </div>
                <div className="flex flex-row flex-1 mt-6 text-sm items-center justify-end">
                  <label htmlFor="s2" style={{ paddingRight: 15 }}>
                    Згенерувати новий пароль
                  </label>
                  <Switch
                    id="s2"
                    checked={generatePassword}
                    onCheckedChange={(c) => setGeneratePassword(c)}
                    onClick={handleGeneratePasswordSwitch}
                    // onClick={() => handleSwitchClick setChecked(!checked)}
                  />
                </div>
                {generatePassword ? (
                  <div className="flex flex-col flex-1 mt-6">
                    <InputField
                      label={"Пароль"}
                      name={"password"}
                      {...register("password", {
                        required: true,
                      })}
                      // value={password}
                      actions={{
                        label: <ClipboardCopyIcon size={18} />,
                        onClick: () => navigator.clipboard.writeText(password),
                      }}
                      readOnly
                    />
                  </div>
                ) : null}
                {/* <div className="grid gap-3 items-center grid-cols-2 mt-5"></div> */}
              </div>
            </div>
          </div>
          {/* <DialogClose asChild>
            <IconButton>X</IconButton>
          </DialogClose> */}

          <div className="sticky bottom-0 border-t rounded-b-lg flex border-gray-200">
            <button
              type="button"
              className="cursor-pointer m-0 flex-auto flex text-black outline-none py-6 items-center justify-center border-r basis-1/2"
              onClick={() => {
                setOpen(false);
                onOpenChange(false);
              }}
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="cursor-pointer m-0 flex-auto flex text-black outline-none py-6 items-center justify-center basis-1/2"
            >
              Оновити
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPartnerModal;
