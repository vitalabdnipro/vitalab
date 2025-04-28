import { Button } from "@components/atoms/button";
import { Disclosure } from "@headlessui/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import useToggleState from "@lib/hooks/use-toggle-state";
// import Button from "@modules/common/components/button"
import clsx from "clsx";
import { Edit, Loader2, X } from "lucide-react";
import { useEffect } from "react";

type AccountInfoProps = {
  label: string;
  currentInfo: string | React.ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
  clearState: () => void;
  children?: React.ReactNode;
};

const AccountInfo = ({
  label,
  currentInfo,
  isLoading,
  isSuccess,
  isError,
  clearState,
  errorMessage = "An error occurred, please try again",
  children,
}: AccountInfoProps) => {
  const { state, close, toggle } = useToggleState();

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess, close]);

  return (
    <div className="text-small-regular">
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
          <span className="text-gray-700">{label}</span>
          <div className="flex flex-1 basis-0 items-center gap-x-4">
            {typeof currentInfo === "string" ? (
              <span className="font-semibold">{currentInfo}</span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <div>
          {/* <Button
            variant="secondary"
            className="min-h-[25px] w-[100px] py-1"
            onClick={handleToggle}
            type={state ? "reset" : "button"}
          >
            {state ? "Cancel" : "Edit"}
          </Button> */}
          <button
            onClick={handleToggle}
            type={state ? "reset" : "button"}
            className="py-1"
          >
            {state ? <X className="h-5 w-5" /> : <Edit className="h-5 w-5"/>}
          </button>
        </div>
      </div>

      {/* Success state */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clsx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": isSuccess,
              "max-h-0 opacity-0": !isSuccess,
            }
          )}
        >
          <div className="my-4 bg-green-100 p-4 text-green-500">
            <span>{label} успішно оновлено</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error state  */}
      <Disclosure>
        <Disclosure.Panel
          static
          className={clsx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": isError,
              "max-h-0 opacity-0": !isError,
            }
          )}
        >
          <div className="mt-4 bg-rose-100 p-4 text-rose-500">
            <span>{errorMessage}</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      <Disclosure>
        <Disclosure.Panel
          static
          className={clsx(
            "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className="flex flex-col gap-y-2 py-4">
            <div>{children}</div>
            <div className="mt-7 flex items-center justify-end">
              <Button disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Зберегти зміни
              </Button>
              {/* <Button
                isLoading={isLoading}
                className="w-full small:max-w-[140px]"
                type="submit"
              >
                Save changes
              </Button> */}
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};

export default AccountInfo;
