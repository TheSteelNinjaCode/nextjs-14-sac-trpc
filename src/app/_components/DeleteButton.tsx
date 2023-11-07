"use client";

import { User } from "@prisma/client";
import { FaTrashCan } from "react-icons/fa6";
import { deleteUser } from "../_actions/actions";

export default function DeleteButton({ user }: { user: User }) {
  return (
    <button
      type="submit"
      className="btn btn-error btn-sm"
      onClick={async () => {
        await deleteUser(user);
      }}
    >
      <FaTrashCan />
    </button>
  );
}
