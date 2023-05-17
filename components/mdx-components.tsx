
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";
import DemoComponent from "@/components/component-demo"
import { examples } from "./examples";



const components = {
  pre: ({className,...props}:React.HTMLAttributes<HTMLPreElement> & {__rawString__?:string}) => (
      <pre className={cn("relative bg-neutral-950 p-2 m-0",className)} {...props}>
        {props?.children}
      </pre>
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded  font-mono text-sm  ",
        className
      )}
      {...props}
    />
  ),
  Image,
  DemoComponent,
  ...examples
};
interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
