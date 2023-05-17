
import { allExamples } from "@/.contentlayer/generated";
import MagnifiedDock from "@/components/examples/navigation/magnified-dock";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section>
        <h1 className="text-6xl font-bold leading-snug text-center my-16">
          Framer motion components <br /> for React Developers
        </h1>
        <div className="grid gap-4   border-neutral-700 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allExamples?.map((example) => (
            <Link
            href={`/example/${example.slugAsParams}`}
              key={example._id}
              className="border border-g hover:border-indigo-400 hover:shadow-xl group border-neutral-600 rounded-xl overflow-hidden"
            >
              <div className="bg-neutral-950/50 aspect-square"></div>
              <div className="border-t group-hover:border-indigo-400 border-neutral-600 bg-neutral-800/50 p-3">
                {example.title}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
