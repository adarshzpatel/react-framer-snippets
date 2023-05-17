
import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypePrettyCode from "rehype-pretty-code"
import { codeImport } from "remark-code-import"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import {rehypeComponent} from "./lib/rehype-component"
import { visit } from "unist-util-visit"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}))

export const Example = defineDocumentType(() => ({
  name: "Example",
  filePathPattern: `examples/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    featured: {
      type: "boolean",
    }
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Example, Page],
  mdx:{
    remarkPlugins:[remarkGfm,codeImport],
    rehypePlugins:[
      rehypeSlug,
      rehypeComponent,
      () => (tree) => {
        visit(tree,(node) => {
          // visit pre element and add raw string to raw prop in pre tag
          if(node?.type === 'element' && node?.tagName === 'pre'){
            const [codeEl] = node.children;
            if(codeEl.tagName !== "code") return;
            node.__rawstring__ = codeEl.children?.[0].value;
            node.__src__ = node.properties?.__src
          }
        })
      },
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and
            // allow empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{type: 'text', value: ' '}];
            }
          },
          onVisitHighlightedLine(node) {
            // Each line node by default has `class="line"`.
            node.properties.className.push('highlighted');
          },
          onVisitHighlightedWord(node) {
            // Each word node has no className by default.
            node.properties.className = ['word'];
          },
        }
      ],    
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return
            }

            const preElement = node.children.at(-1)
            if (preElement.tagName !== "pre") {
              return
            }

            preElement.properties["__rawstring__"] = node.__rawstring__

            if (node.__src__) {
              preElement.properties["__src__"] = node.__src__
            }

          }
        })
      },
  ]
  }
})
