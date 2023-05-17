"use client"
import { cn } from "@/lib/utils";
import React from "react";
import {ClipboardIcon,ClipboardDocumentCheckIcon, ClipboardDocumentIcon} from '@heroicons/react/24/outline'

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
}



export const CopyButton = ({value,className,...props}:CopyButtonProps) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
 
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button
    onClick={copy}
    disabled={isCopied}
    className="ml-auto disabled:opacity-50 px-3 border-l text-neutral-400 hover:text-white  flex gap-2 whitespace-nowrap items-center  border-neutral-700"
      >

        <ClipboardDocumentIcon className="h-5 w-5"/>

{isCopied ? "Copied" : "Copy"}
    </button>
  );
};
