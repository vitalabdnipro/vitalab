import { RelatedTestsSelect } from "@/components/related-tests-select";
import { TextEditor } from "@/components/text-editor";
import { getProduct, getTests } from "@/server/db/queries";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProduct({ id });

  if (!id) {
    notFound();
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log("data", data);
  return (
    <div className="p-4">
      <div className="@container mx-auto h-full min-h-[250px] w-full max-w-[1240px] flex-shrink-0 snap-center rounded-md bg-white md:min-w-96 md:flex-shrink">
        <div className="h-full w-full overflow-hidden rounded-md">
          <TextEditor data={data} />
          <Suspense fallback={<div>Loading...</div>}>
            <RelatedTestsSelect test={data} relatedTestsPromise={getTests()} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
