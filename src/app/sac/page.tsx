import { prisma } from "@/lib/prisma";
import UserForm from "../_components/UserForm";

export default async function SAC() {
  const users = await prisma.user.findMany();

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="mb-4 text-4xl font-bold">SAC Users</h1>
      <div className="card border border-gray-200 bg-base-100 p-4 shadow-xl">
        <UserForm users={users} />
      </div>
    </main>
  );
}
