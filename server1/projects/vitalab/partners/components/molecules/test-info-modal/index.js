import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

const TestInfoModal = ({ name, description, large }) => {
  const splitedDescription = description.split("•").map((item) => item.trim());

  return (
    <Dialog.Root>
      <Dialog.Trigger className="z-50">
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
          className={clsx(
            "w-4 h-4 text-green-600 transition ease-hover hover:text-green-800",
            { "w-6 h-6": large }
          )}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0 z-[100]" />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="z-[110] data-[state=open]:animate-contentShow text-sm fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <Dialog.Title className="m-0 font-medium mb-4">
            {splitedDescription[0]}
          </Dialog.Title>
          <div className="grid gap-4 text-sm">
            {splitedDescription.map((element, index) => {
              return (
                index !== 0 && (
                  <div key={element}>
                    <span className="font-medium mr-2 tabular-nums">
                      {index}.
                    </span>
                    {element}
                  </div>
                )
              );
            })}
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
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
                className="size-5 text-black"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default TestInfoModal;
