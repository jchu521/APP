import React from "react";
import { useStoreValue } from "../../../redux/store";

export default function Home() {
  const [{ user }] = useStoreValue();
  return (
    <div>
      {!user ? (
        <>Home</>
      ) : (
        <div>
          {user.data}
          {user.firstName} {user.lastName}
        </div>
      )}
    </div>
  );
}
