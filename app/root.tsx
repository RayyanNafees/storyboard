import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
// import process from "node:process";

import type { Route } from "./+types/root";
import "./app.css";
import './styles.css'
import mongoose from "mongoose";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];



export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="description" content="Story board with AI Prompts & Images" />
        <meta name="author" content="RayyanNafees" />

        <meta property="og:title" content="Story AI" />
        <meta property="og:description" content="Story board with AI Prompts & Images" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" /> */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@NafeesRayyan" />
        {/* <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" /> */}

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

const { MONGO_URI } = process.env
if (!MONGO_URI) {
  console.error("MONGO_URI is not defined", {MONGO_URI})
}

mongoose.connect(process.env.MONGO_URI as string).then((db) => console.log("MongoDB connected", db.connection.port))