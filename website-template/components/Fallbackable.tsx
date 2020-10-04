import { ReactChildren, ReactElement } from "react";

import React from "react";
import { useRouter } from "next/router";

export function Fallbackable<T>({ render }: { render: () => ReactElement }) {
  const router = useRouter();

  if (router.isFallback)
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <p>Loading...</p>
      </div>
    );

  return render();
}
