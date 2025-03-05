// "use client";

import { Suspense } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { getResults } from "~/lib/results";
import { Test } from "./test";
import { useAtom } from "jotai";
import { myStore, phoneAtom } from "~/atoms";
import { useHydrateAtoms } from "jotai/utils";
import { Results } from "~/components/results";

export default function Order({ params }: { params: { order: string } }) {
  // myStore.get(phoneAtom);
  // const [value, setValue] = useAtom(phoneAtom);
  // const results = await getResults("555000008869");

  // if (results.status === "failed") {
  //   notFound();
  // }

  // console.log(searchParams);
  // console.log(value)

  return (
    <div className="p-1.5 w-full flex flex-col gap-2">
      {/* <h1>5 +</h1> */}
      <Suspense fallback={<div>Loading...</div>}>        
        <Results />
        {/* {value} */}
        {/* <Playlists artistID={artist.id} /> */}
        {/* {results.status} */}
        {/* <Test /> */}
        {/* <a href="data:application/pdf;base64,[base64]" download="file.pdf" /> */}

        {/* <embed src={`data:application/pdf;base64,${results.data[0].forms[0].content}`} /> */}
      </Suspense>
    </div>
  );
}
