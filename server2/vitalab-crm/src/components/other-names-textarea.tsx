"use client";

import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { useAction } from "next-safe-action/hooks";
import { safeDescriptionAction } from "@/actions/safe-description-action";
import { useParams } from "next/navigation";
import { type Product } from "@/server/db/schema";
import Link from "next/link";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type TextEditorProps = {
  id: string;
  mid_code: string;
  title: string;
  description?: string | null;
};

export const OtherNamesTextarea = ({ data }: { data: TextEditorProps }) => {
  // const { id } = useParams<{ id: string }>();
  const { id, mid_code, title, description } = data;
  const { execute, isPending } = useAction(safeDescriptionAction);
  //state to handle the changes in text editor
  const [content, setContent] = useState(description ?? "");

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { header: "3" }],
      // [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  if (!id) {
    return <div>Loading...</div>;
  }

  const isDisabled = content === description || isPending || content === "";

  const handleSave = () => execute({ text: content, id, mid_code });

  return (
    <div className="flex-no-wrap flex h-full flex-col gap-8 overflow-y-auto overscroll-y-none">
      <div className="sticky top-0 z-10 min-h-0 min-w-0 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-gray-500">{mid_code}</span>{" "}
            <span className="font-medium">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <Link href={`/`}>
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
                  className="lucide lucide-arrow-left"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </Link>
            </Button>
            <Button onClick={handleSave} disabled={isDisabled} size="sm">
              {isPending ? "Оновлюється..." : "Оновити"}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <ReactQuill
          theme="snow"
          formats={[
            "header",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "indent",
            "link",
          ]}
          placeholder="Інші назви"
          modules={modules}
          onChange={setContent}
          value={content}
        />
        {/* <div>
          <h2 className="mt-8 flex justify-center text-xl font-bold">
            Preview
          </h2>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </div> */}
      </div>
    </div>
  );
};
