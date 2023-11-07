"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createUser = async (formData: FormData) => {
  const login = formData.get("login") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await prisma.user.create({
    data: {
      login,
      email,
      password,
    },
  });

  revalidatePath("/sac");
};

export const updateUser = async (user: User) => {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });

  revalidatePath("/sac");
};

export const deleteUser = async (user: User) => {
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  revalidatePath("/sac");
};
