import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-3 p-24">
      <Link className="btn btn-primary" href="/sac">
        SAC
      </Link>
      <Link className="btn btn-secondary" href="/trpc">
        tRPC
      </Link>
    </main>
  );
}
