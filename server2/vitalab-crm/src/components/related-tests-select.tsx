"use client";

import { type getTests } from "@/server/db/queries";
import { use } from "react";
// import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Product, RelatedTest, relatedTests } from "@/server/db/schema";
import { useAction } from "next-safe-action/hooks";
import { addRelatedTestAction } from "@/actions/add-related-test-action";
import { removeRelatedTestAction } from "@/actions/remove-related-test-action";

export function RelatedTestsSelect({
  test,
  relatedTestsPromise,
}: {
  test: {
    id: string;
    mid_code: string;
    title: string;
    relatedTests: RelatedTest[];
  };
  relatedTestsPromise: ReturnType<typeof getTests>;
}) {
  const data = use(relatedTestsPromise);
  const addRelatedTest = useAction(addRelatedTestAction);
  const removeRelatedTest = useAction(removeRelatedTestAction);

  const selectedValues = new Set(
    test.relatedTests?.map((test) => test.relatedTestId) ?? [],
  );

  return (
    <div className="mt-10 flex flex-col gap-y-5">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-start rounded-none border-[#ccc] px-4"
          >
            {addRelatedTest.isPending || removeRelatedTest.isPending ? (
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
                className="mr-2 size-4 animate-spin"
              >
                <path d="M12 2v4" />
                <path d="m16.2 7.8 2.9-2.9" />
                <path d="M18 12h4" />
                <path d="m16.2 16.2 2.9 2.9" />
                <path d="M12 18v4" />
                <path d="m4.9 19.1 2.9-2.9" />
                <path d="M2 12h4" />
                <path d="m4.9 4.9 2.9 2.9" />
              </svg>
            ) : (
              // <Loader2 className="mr-2 size-4 animate-spin" />
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
                className="mr-2 size-4"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            )}
            З цим аналізом замовляють...
            {selectedValues?.size > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal"
                >
                  {selectedValues.size}
                </Badge>
                {/* <div className="hidden space-x-1 lg:flex">
                  {selectedValues.size > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValues.size} selected
                    </Badge>
                  ) : (
                    data.products
                      .filter((option) => selectedValues.has(option.id))
                      .map((option) => (
                        <Badge
                          variant="secondary"
                          key={option.id}
                          className="rounded-sm px-1 font-normal"
                        >
                          {option.title}
                        </Badge>
                      ))
                  )}
                </div> */}
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[--radix-popover-trigger-width] p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder={test.title} />
            <CommandList className="max-h-full">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
                {data.products.map((option) => {
                  const isSelected = selectedValues.has(option.id);

                  return (
                    <CommandItem
                      key={option.id}
                      onSelect={() => {
                        if (isSelected) {
                          const id = test.relatedTests.find(
                            (test) => test.relatedTestId === option.id,
                          )?.id;

                          if (!id) return;

                          selectedValues.delete(option.id);
                          removeRelatedTest.execute({
                            id,
                          });
                        } else {
                          console.log("addRelatedTest", test);
                          selectedValues.add(option.id);
                          addRelatedTest.execute({
                            testId: test.id,
                            code: test.mid_code,
                            title: test.title,
                            relatedTestId: option.id,
                          });
                        }
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
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
                          className="size-4"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>

                      <span>
                        {option.mid_code} - {option.title}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {/* {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )} */}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap gap-2">
        {data.products
          .filter((option) => selectedValues.has(option.id))
          .map((option) => (
            <Badge
              variant="secondary"
              key={option.id}
              className="rounded-sm px-1 font-normal"
            >
              {option.title}
            </Badge>
          ))}
      </div>
    </div>
  );
}
