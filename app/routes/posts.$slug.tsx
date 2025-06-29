import type { Route } from "./+types/posts.$slug";
import React from "react";
import { Link } from "react-router";
import { reader } from "~/reader.server";
import { markdocConfig } from "~/markdoc.config";
import Markdoc from "@markdoc/markdoc";

export async function loader({ params: { slug } }: Route.LoaderArgs) {
  if (!slug) {
    throw new Response("Not Found", { status: 404 });
  }

  const post = await reader.collections.posts.read(slug, { resolveLinkedFiles: true });
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  const errors = Markdoc.validate(post.content.node, markdocConfig);
  if (errors.length) {
    console.error(slug, errors);
    throw new Error("Invalid content");
  }
  const content = Markdoc.transform(post.content.node, markdocConfig);

  return { post: { ...post, content } };
}
export default function Post({ loaderData: { post } }: Route.ComponentProps) {
  return (
    <div className="h-screen md:px-10">
      <div className="mx-auto h-full max-w-6xl py-5">
        <Link
          to="/"
          className="text-gray-600 transition-colors hover:text-blue-600 hover:underline"
        >
          {" "}
          &larr; Back to Home
        </Link>
        <article className="prose mt-5 max-w-[80ch]">
          <h1 className="text-4xl font-semibold">{post.title}</h1>
          <p className="mt-1 text-2xl">{post.description}</p>
          <p>
            Published on{" "}
            {new Intl.DateTimeFormat(undefined, {
              month: "short",
              year: "numeric",
              day: "numeric",
            }).format(new Date(post.publishDate))}
          </p>

          <div className="content">{Markdoc.renderers.react(post.content, React)}</div>
        </article>
      </div>
    </div>
  );
}
