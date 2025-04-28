import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  createSerializer,
  parseAsInteger,
  parseAsString,
  createSearchParamsCache,
  createParser,
} from "nuqs/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const searchParams = {
  code: parseAsString.withDefault(""),
  // pageIndex: parseAsInteger.withDefault(1),
  // pageSize: parseAsInteger.withDefault(10),
  // sort: parseAsSorting.withDefault({ by: "", direction: "desc" }),
};

export const searchParamsCache = createSearchParamsCache(searchParams);