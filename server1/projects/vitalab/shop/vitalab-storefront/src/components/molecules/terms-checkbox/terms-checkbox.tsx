"use client"

import { Checkbox } from "@components/atoms/checkbox"

export function TermsCheckbox({
  checked,
  setChecked,
}: {
  checked: boolean
  setChecked: (checked: boolean) => void
}) {
  return (
    // <div className="items-top flex justify-end space-x-2">
      <div className="grid justify-end gap-1.5 leading-none">
        <div className="flex items-center justify-end gap-1.5">
          <Checkbox
            id="terms"
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Прийняти умови
          </label>
        </div>
        <p className="text-xs text-muted-foreground">
          Ви погоджуєтеся з нашим договором про надання медичних послуг.
        </p>
      </div>
    // </div>
  )
}
