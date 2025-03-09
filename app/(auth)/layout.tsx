import { GalleryVerticalEnd } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-4 py-6 sm:p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href="https://nguyentruonggiang.id.vn/"
          className="flex items-center gap-2 self-center font-medium"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Axyl Inc.
        </a>
        {children}
      </div>
    </div>
  );
}
