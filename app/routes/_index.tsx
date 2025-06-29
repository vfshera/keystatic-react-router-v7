import type { Route } from "./+types/_index";
import { Link, href } from "react-router";
import { reader } from "~/reader.server";

export async function loader() {
  const posts = await reader.collections.posts.all();
  return { posts };
}
export default function Home({ loaderData: { posts } }: Route.ComponentProps) {
  return (
    <div className="h-screen md:px-10">
      <div className="mx-auto h-full max-w-6xl">
        <header className="mb-5 flex items-center justify-between border-b border-dashed border-gray-400 pt-5 pb-4">
          <h1 className="text-xl font-bold">Keystatic with React Router v7</h1>
          <nav className="text-gray-600">
            <Link to="/keystatic" className="transition-colors hover:text-blue-600 hover:underline">
              Keystatic Dashboard
            </Link>
          </nav>
        </header>
        <div>
          <h2 className="font-semibold">Posts</h2>
          <ul className="list-inside list-disc">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link to={`/posts/${post.slug}`} className="text-blue-500">
                  {post.entry.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
