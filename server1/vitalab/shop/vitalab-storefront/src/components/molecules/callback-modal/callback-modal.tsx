import React from "react"
import { Button } from "@components/atoms/button"
import { Input } from "@components/atoms/input"
import { Label } from "@components/atoms/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/molecules/dialog"

export const CallbackModal = () => {
  return (
    <>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Замовити зворотній дзвінок</DialogTitle>
          {/* <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription> */}
        </DialogHeader>
        <form>
          <div className="mt-3 space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Ім'я</Label>
              <Input
              // placeholder="0"
              // defaultValue="0"
              // {...register("cod")}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Телефон</Label>
              <Input
              // placeholder="0"
              // defaultValue="0"
              // {...register("cod")}
              />
            </div>
            {/* <Collapsible.Root
              open={isCollapsibleOpen}
              onOpenChange={setIsCollapsibleOpen}
            >
              <Collapsible.Trigger asChild>
                <div className="text-m group mt-6 mb-2 block max-w-full font-medium text-gray-700">
                  <div className="flex items-center">
                    <span className="group-radix-state-open:rotate-90 mr-2 inline-flex transition duration-200">
                      <svg
                        data-testid="geist-icon"
                        fill="none"
                        height="17"
                        shapeRendering="geometricPrecision"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        width="17"
                        // style="color: currentcolor;"
                      >
                        <path d="M9 18l6-6-6-6"></path>
                      </svg>
                    </span>
                    <p className="ease-hover transition-opacity hover:opacity-60">
                      Додати коментар
                    </p>
                  </div>
                </div>
              </Collapsible.Trigger>
              <Collapsible.Content>
                <TextAreaField />
              </Collapsible.Content>
            </Collapsible.Root> */}
            <div className="flex justify-end">
              <Button>Надіслати</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
