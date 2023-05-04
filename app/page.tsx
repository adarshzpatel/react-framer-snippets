"use client";

import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";
import { openStdin } from "process";

export default async function Home() {
  return (
    <div className="prose dark:prose-invert">
      {allPosts?.map(post => <Link key={post._id} href={"posts/"+post?.slugAsParams}>{post.title}</Link>)}
    </div>
  );
}
