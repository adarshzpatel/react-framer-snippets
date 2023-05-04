
import * as React from "react";

interface DemoComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
}


// TODO : 
// Get the component from source
const DemoComponent = ({ children, src="/components/examples/button.tsx", ...props }: DemoComponentProps) => {
  console.log(src)
  return <>
  </>
};

export default DemoComponent;
