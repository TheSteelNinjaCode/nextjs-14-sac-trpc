"use client";

import { FaPenToSquare, FaTrashCan } from "react-icons/fa6";
import { createUser, deleteUser, updateUser } from "../_actions/actions";
import { User } from "@prisma/client";
import { ChangeEvent, useRef, useState } from "react";

export default function UserForm({ users }: { users: User[] }) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const userFormRef = useRef<HTMLFormElement | null>(null);
  const defaultUser = {
    id: 0,
    firstName: "",
    lastName: "",
    login: "",
    email: "",
    age: 0,
    password: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  } as const;

  const [selectedUser, setSelectedUser] = useState<User>(defaultUser);
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdateUser = async () => {
    if (selectedUser && userFormRef.current) {
      await updateUser(selectedUser);
      userFormRef.current.reset();
      setSelectedUser(defaultUser);
      setIsEdit(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setSelectedUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  return (
    <>
      <div className="flex gap-4 divide-x-2 divide-dotted">
        <div className="flex flex-col items-center justify-center gap-4">
          <form
            ref={userFormRef}
            className="flex flex-col gap-2"
            action={async (e) => {
              createUser(e);
              userFormRef.current?.reset();
              setSelectedUser(defaultUser);
            }}
          >
            <input
              type="text"
              name="login"
              value={selectedUser?.login}
              required
              placeholder="Login"
              className="input input-bordered"
              onChange={handleInputChange}
              autoFocus
            />
            <input
              type="email"
              name="email"
              value={selectedUser?.email}
              required
              placeholder="Email"
              className="input input-bordered"
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              value={selectedUser?.password}
              required
              placeholder="Password"
              minLength={3}
              className="input input-bordered"
              onChange={handleInputChange}
            />
            <div className="space-x-4">
              <button
                type="submit"
                className="btn btn-primary disabled:bg-gray-500 disabled:text-gray-300"
                disabled={isEdit}
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-accent disabled:bg-gray-500 disabled:text-gray-300"
                disabled={!isEdit}
                onClick={handleUpdateUser}
              >
                Update
              </button>
              <button
                type="button"
                className="btn btn-primary disabled:bg-gray-500 disabled:text-gray-300"
                disabled={!isEdit}
                onClick={() => {
                  userFormRef.current?.reset();
                  setIsEdit(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <div className="overflow-auto ps-4">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Login</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.login}</td>
                  <td>{user.email}</td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEdit(true);
                      }}
                    >
                      <FaPenToSquare />
                    </button>
                    <button
                      type="submit"
                      className="btn btn-error btn-sm"
                      onClick={() => {
                        setSelectedUser(user);
                        modalRef.current?.showModal();
                      }}
                    >
                      <FaTrashCan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <dialog ref={modalRef} id="deleteModal" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            ✕
          </button>
          <h3 className="text-lg font-bold">Delete</h3>
          <p className="py-4">
            Are you sure you want to delete this{" "}
            <strong>{selectedUser?.login}</strong>?
          </p>
          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={async () => {
                await deleteUser(selectedUser);
                setSelectedUser(defaultUser);
                modalRef.current?.close();
              }}
            >
              Yes
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
