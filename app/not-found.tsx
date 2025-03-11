import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-background text-primary grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-gray-200">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8 dark:text-gray-200">
          Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/">
            <Button className="bg-indigo-600 font-bold hover:bg-indigo-500">
              Go back home
            </Button>
          </Link>
          <a
            href="https://github.com/Axyl1410/"
            className="dark:text-background-light text-sm font-semibold text-gray-900"
            target="_blank"
          >
            Contact support <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
