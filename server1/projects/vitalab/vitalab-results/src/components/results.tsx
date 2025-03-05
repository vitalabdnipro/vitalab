"use client";

import { useAtom, useAtomValue } from "jotai";
import { Button } from "./ui";
import { phoneAtom, orderAtom } from "~/atoms";
import { Download } from "lucide-react";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { cn } from "~/utils/cn";
import PDFMerger from "pdf-merger-js/browser";
import { useState } from "react";
import { pdfMerge } from "~/utils/pdf-merge";
import { StatusDot } from "~/components/status";
// import { fetcher } from "~/utils/fetcher";

// // const sendRequest = async (args) => {
// //   // console.log("11s",args)
// //   const [url, obj] = args
// //   console.log ("a", obj)

// //   // console.log("args", arg);
// //   const response = await fetch(
// //     "http://mirthOUT.vitalab.com.ua:55080/results/get_by_order_num",
// //     {
// //       method: "POST",
// //       headers: {
// //         token: "3cf9db27be144476b963e54889c1f127",
// //         "Content-Type": "application/json",
// //         // Accept: "application/json",
// //       },
// //       body: JSON.stringify({
// //         num: "555000000131",
// //         phone: null,
// //       }),
// //     }
// //   );

async function fetcher(key) {
  const [url, params] = key;

  const queryParams = new URLSearchParams(params);
  const urlWithParams = `${url}?${queryParams.toString()}`;

  const res = await fetch(urlWithParams);

  return res.json();
}

export function Results() {
  const { phone } = useAtomValue(phoneAtom);
  const number = useAtomValue(orderAtom);
  const { data, error, isLoading } = useSWR(
    // ["/api/order", { phone: phone, num: number }],
    ["/api/order", { phone: "+380958493258", num: "555000009053" }],
    fetcher
  );

  if (isLoading || !data) {
    return <div>loading1...</div>;
  }

  console.log(data);
  // data.data[0].forms.forEach((form) => {
  //   // form.tests.forEach((test) => console.log(test.name));
  //   console.log(form.name);
  // });

  // data.data[0].forms.length
  // data.data[0].forms.forEach(element => {
  //   element.tests.forEach(element1 => {
  //     console.log(element1)
  //   });
  // });

  // const flattenedArray = data.data[0].forms.reduce((acc, curr) => {
  //   return Array.isArray(curr.tests)
  //     ? acc.concat(flatten(curr.tests))
  //     : acc.concat(curr);
  // }, []);

  // const nestedArray = [1, [2, [3, 4]], [5, [6]]];
  // const flattenedArray = nestedArray.reduce((acc, curr) => {
  //   // @ts-ignore
  //   return Array.isArray(curr) ? acc.concat(flatten(curr)) : acc.concat(curr);
  // }, []);
  // console.log(flattenedArray); // Output: [1, 2, 3, 4, 5, 6]

  const flattenedArray = data.data[0].forms.reduce((acc, curr) => {
    const form = curr;
    // console.log(form)
    return acc.concat(
      curr.tests.map((test) => ({
        test,
        content: form.content,
        status: form.status,
      }))
    );
  }, []);

  const handleDownloadPdf = async () => {
    const mergedPdfBlob = await pdfMerge(data.data[0].forms); // assuming forms is an array of PDF forms
    const url = URL.createObjectURL(mergedPdfBlob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${number}-results-vitalab.pdf`;
    link.click();
  };

  return (
    <>
      <div className="h-10 flex justify-between items-center">
        <div>Замовлення #{number}</div>
        <div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleDownloadPdf}
          >
            <span className="relative z-[1] flex items-center justify-center space-x-1.5 text-xs">
              <Download className="w-4 h-4" />
              <span>Завантажити результати</span>
            </span>
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg flex flex-1 flex-col px-2 py-3 gap-4">
        {flattenedArray.map((form) => (
          <div
            key={form.test.code}
            className="grid grid-cols-[60px_1fr_100px] text-xs items-center"
          >
            <div>{form.test.code}.</div>
            <div
              className={cn("text-xs mr-6", {
                "line-through": form.status === "no file",
              })}
            >
              {form.test.name}
            </div>
            <div className="flex flex-col relative min-w-[1px] max-w-full flex-1 justify-start items-end mr-1">
              <StatusDot status={form.test.status} label />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
