"use client";

import { useAtomValue } from "jotai";
import { notFound } from "next/navigation";
import { phoneAtom } from "~/atoms";

function downloadPDF(pdf) {
  const linkSource = `data:application/pdf;base64,${pdf.data}`;
  const downloadLink = document.createElement("a");
  const fileName = "vct_illustration.pdf";

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

export const Test = (data) => {
  const verified = useAtomValue(phoneAtom)
  console.log(verified)
  // notFound();
  return (
    <>
      <button
        onClick={() => {
          // downloadPDF(data);
        }}
      >
        test
      </button>
      <br/>
      {/* <a download="pdfTitle" href={data} title="Download pdf document">a</a> */}
    </>
  );
};
