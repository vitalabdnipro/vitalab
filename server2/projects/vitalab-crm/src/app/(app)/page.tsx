import { TestsTable } from "@/components/tests-table";
import { TestsTableFilter } from "@/components/tests-table-filter";
import { searchParamsCache } from "@/lib/utils";
import { getTests } from "@/server/db/queries";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = searchParamsCache.parse(searchParams);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <section className="container grid w-full max-w-[1400px] items-center gap-2 pb-8 pt-6 md:py-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center">
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
                className="animate-spin size-10"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
          }
        >
          <TestsTableFilter />
          <TestsTable testsPromise={getTests(params)} />
        </Suspense>
      </section>
    </main>
  );
}
