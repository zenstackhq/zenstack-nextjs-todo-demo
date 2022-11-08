import React from "react";
import { useCurrentUser } from "../lib/context";

export default function Home() {
  const user = useCurrentUser();

  return (
    <>
      {user && (
        <div className="mt-8 text-center flex flex-col items-center w-full">
          <h1 className="text-2xl text-gray-800">Welcome {user.name || user.email}!</h1>
        </div>
      )}
    </>
  );
}
