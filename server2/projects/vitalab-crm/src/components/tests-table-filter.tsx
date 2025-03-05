"use client";

import React from "react";
import { Input } from "./ui/input";
import { parseAsString, useQueryState } from "nuqs";
import { Button } from "./ui/button";

export function TestsTableFilter() {
  const [isLoading, startTransition] = React.useTransition();
  const [code, setCode] = useQueryState(
    "code",
    parseAsString.withOptions({ startTransition, shallow: false }),
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex items-center gap-1">
      {isLoading ? (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
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
            className="h-4 w-4 animate-spin text-muted-foreground"
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
        </div>
      ) : (
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
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
            className="h-4 w-4"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
      )}
      <Input
        ref={inputRef}
        placeholder="Код дослідження"
        defaultValue={code ?? undefined}
        onChange={(e) => setCode(e.target.value)}
        className="w-[300px] pl-10"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          void setCode(null);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }}
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
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </Button>
    </div>
  );
}
