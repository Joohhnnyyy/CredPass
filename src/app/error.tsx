"use client";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  const message = error.message || "";

  if (
    error.name === "AbortError" ||
    message === "The operation was aborted." ||
    message.toLowerCase().includes("signal is aborted")
  ) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#010107] text-white">
      <h2 className="mb-4 text-xl font-semibold">Something went wrong</h2>
      <button
        className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
