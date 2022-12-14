import { UserContext } from "@lib/context";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useList } from "@zenstackhq/runtime/hooks";
import TodoList from "components/TodoList";

function CreateDialog() {
  const user = useContext(UserContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [_private, setPrivate] = useState(false);

  const { create } = useList();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await create({
        data: {
          title,
          ownerId: user!.id,
          private: _private,
        },
      });
    } catch (err) {
      alert(`Failed to create list: ${err}`);
      return;
    }

    // reset states
    setTitle("");
    setPrivate(false);

    // close modal
    setModalOpen(false);
  };

  return (
    <>
      <input
        type="checkbox"
        id="create-list-modal"
        className="modal-toggle"
        checked={modalOpen}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setModalOpen(e.currentTarget.checked);
        }}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-8">Create a Todo list</h3>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <label htmlFor="title" className="text-lg inline-block w-20">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  placeholder="Title of your list"
                  className="input input-bordered w-full max-w-xs mt-2"
                  value={title}
                  onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="private" className="text-lg inline-block w-20">
                  Private
                </label>
                <input
                  id="private"
                  type="checkbox"
                  className="checkbox"
                  onChange={(e: FormEvent<HTMLInputElement>) => setPrivate(e.currentTarget.checked)}
                />
              </div>
            </div>
            <div className="modal-action">
              <input className="btn btn-primary" type="submit" value="Create" />
              <label htmlFor="create-list-modal" className="btn btn-outline">
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const { find } = useList();

  const { data: lists } = find({
    include: {
      owner: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <>
      <div className="p-8">
        <div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <label htmlFor="create-list-modal" className="btn btn-primary btn-wide modal-button">
            Create a list
          </label>
        </div>

        <ul className="flex flex-wrap gap-6">
          {lists?.map((list) => (
            <li key={list.id}>
              <TodoList value={list} />
            </li>
          ))}
        </ul>

        <CreateDialog />
      </div>
    </>
  );
}
