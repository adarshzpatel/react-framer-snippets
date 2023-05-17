"use client";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";
import { TabsList } from "./ui/tabs";
import { CopyButton } from "./copy-button";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

interface DemoComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
}

// TODO :
// Get the component from source
const DemoComponent = ({
  children,
  src = "/components/examples/button.tsx",
  ...props
}: DemoComponentProps) => {
  const [Example, Code, ...Children] = React.Children.toArray(
    children
  ) as React.ReactElement[];
  const codeString = React.useMemo(() => {
    if (
      typeof Code?.props["data-rehype-pretty-code-fragment"] !== "undefined"
    ) {
      const [Pre] = React.Children.toArray(
        Code.props.children
      ) as React.ReactElement[];
      return Pre.props?.__rawstring || ""
    }
  }, [Code]);


  return (
    <div className="group relative my-4 flex bg-neutral-950 border border-neutral-600 rounded-xl flex-col overflow-hidden ">
      <Tabs defaultValue="preview" className="relative mr w-full">
        <TabsList className="flex">
          <TabsTrigger
            value="preview"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code" >
            Code
          </TabsTrigger>
         <CopyButton value={codeString}/>
        </TabsList>
        <TabsContent value="preview">
          <div className="flex items-center justify-center w-full rounded-lg p-8 aspect-[4/3]">
            {Example}
          </div>
        </TabsContent>
        <TabsContent value="code">{Code}</TabsContent>
      </Tabs>
    </div>
  );
};

export default DemoComponent;
