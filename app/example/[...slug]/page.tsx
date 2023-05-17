import { notFound } from "next/navigation"
import { allExamples } from "contentlayer/generated"

import { Metadata } from "next"
import { Mdx } from "@/components/mdx-components"

interface ExampleProps {
  params: {
    slug: string[]
  }
}

async function getExampleFromParams(params: ExampleProps["params"]) {
  const slug = params?.slug?.join("/")
  const post = allExamples.find((example) => example.slugAsParams === slug)

  if (!post) {
    null
  }

  return post
}

export async function generateMetadata({
  params,
}: ExampleProps): Promise<Metadata> {
  const post = await getExampleFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<ExampleProps["params"][]> {
  return allExamples.map((example) => ({
    slug: example.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: ExampleProps) {
  const example = await getExampleFromParams(params)

  if (!example) {
    notFound()
  }

  return (
    <article className="py-6 container max-w-screen-md  mx-auto ">
      <h1 className="mb-2 text-3xl font-bold text-neutral-300">{example.title}</h1>
      {example.description && (
        <p className="text-xl mt-0 text-neutral-500">
          {example.description}
        </p>
      )}
      <Mdx code={example.body.code} />
    </article>
  )
}
