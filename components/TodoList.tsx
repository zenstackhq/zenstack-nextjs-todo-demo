import Image from "next/image";
import { List, User } from "@zenstackhq/runtime/types";
import { customAlphabet } from "nanoid";
import { LockClosedIcon, TrashIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useList } from "@zenstackhq/runtime/hooks";
import TimeInfo from "./TimeInfo";

type Props = {
  value: List & { owner: User };
};

export default function TodoList({ value }: Props) {
  const router = useRouter();

  const { del } = useList();

  const deleteList = async () => {
    if (confirm("Are you sure to delete this list?")) {
      try {
        await del(value.id);
      } catch (error: any) {
        if (error.status == 403) {
          alert("You are now allowed to do so");
        }
      }
    }
  };

  return (
    <div className="card w-80 bg-base-100 shadow-xl cursor-pointer hover:bg-gray-50">
      <a>
        <figure>
          <Image src={`https://picsum.photos/300/200?r=${value.title}`} width={320} height={200} alt="Cover" />
        </figure>
      </a>
      <div className="card-body">
        <Link href={`${router.asPath}/${value.id}`}>
          <a>
            <h2 className="card-title line-clamp-1">{value.title || "Missing Title"}</h2>
          </a>
        </Link>
        <div className="card-actions flex w-full justify-between">
          <div>
            <TimeInfo value={value} />
          </div>
          <div className="flex space-x-2">
            <Avatar user={value.owner} size={18} />
            {value.private && (
              <div className="tooltip" data-tip="Private">
                <LockClosedIcon className="w-4 h-4 text-gray-500" />
              </div>
            )}
            <TrashIcon
              className="w-4 h-4 text-gray-500 cursor-pointer"
              onClick={() => {
                deleteList();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
