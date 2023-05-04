import fs from "fs";
import path from "path";
import { UnistNode, UnistTree } from "@/types/unist";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}

function getComponentSourceFileContent(node: UnistNode) {
  const src = getNodeAttributeByName(node, "src")?.value as string;
  if (!src) {
    return null;
  }

  // Read the source file
  const filePath = path.join(process.cwd(), src);
  const source = fs.readFileSync(filePath, "utf-8");

  return source;
}

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // get the source code path from the the src props
      const { value: src } = getNodeAttributeByName(node, "src") || {};

      if (node.name === "DemoComponent") {
        const source = getComponentSourceFileContent(node);
        if (!source) return;

        // Replace the demo component wiht a pre elemetn
        // Replace the Example component with a pre element.
        node.children?.push(
          u("element", {
            tagName: "pre",
            properties: {
              __src__: src,
            },
            children: [
              u("element", {
                tagName: "code",
                properties: {
                  className: ["language-tsx"],
                },
                children: [
                  {
                    type: "text",
                    value: source,
                  },
                ],
              }),
            ],
          })
        );

      }
    });
  };
}
