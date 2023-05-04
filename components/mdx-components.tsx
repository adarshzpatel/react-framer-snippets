
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { cn } from "@/lib/utils";
import { CopyButton } from "@/components/copy-button";
import DemoComponent from "@/components/component-demo"



const components = {
  pre: ({className,...props}:React.HTMLAttributes<HTMLPreElement> & {__rawString__?:string}) => (
      <pre className={cn("relative",className)} {...props}>
        {props?.children}
        <CopyButton value={props['__rawString__'] as string} className="absolute top-2 right-2"/>
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
};
interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
