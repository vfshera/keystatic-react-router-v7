import { Link } from "react-router";

export default function Home() {
  return (
    <div className="h-screen md:px-10">
      <div className="mx-auto h-full max-w-6xl">
        <header className="flex items-center justify-between border-b border-dashed border-gray-400 pt-5 pb-4">
          <h1 className="text-xl font-bold">Keystatic with React Router v7</h1>
          <nav className="text-gray-600">
            <Link to="/keystatic" className="transition-colors hover:text-blue-600 hover:underline">
              Keystatic Dashboard
            </Link>
          </nav>
        </header>
      </div>
    </div>
  );
}
