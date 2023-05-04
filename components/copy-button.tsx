"use client"
import { cn } from "@/lib/utils";
import React from "react";
import {ClipboardIcon,ClipboardDocumentCheckIcon} from '@heroicons/react/24/outline'
interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  src?: string;
}



export const CopyButton = ({value,className,src,...props}:CopyButtonProps) => {
  const [isCopied, setIsCopied] = React.useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
 
    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  return (
    <button
      className={cn("text-white h-6 w-6",
        className
      )}
      onClick={copy}
    >
      <span className="sr-only">Copy</span>
      {isCopied ? (
        <ClipboardDocumentCheckIcon />
        ) : (
          <ClipboardIcon/>
      )}
    </button>
  );
};
