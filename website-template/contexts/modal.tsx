import { Transition } from "@headlessui/react";
import React, { createContext, useState } from "react";

export const ModalContext = createContext(undefined);

export function ModalProvider({ children }: { children: any }) {
  const [modal, setModal] = useState(null);
  const [prev, setPrev] = useState(null);

  const updateModal = (newModal) => {
    setPrev(modal);
    setModal(newModal);
  };

  return (
    <ModalContext.Provider value={[modal, updateModal]}>
      {children}
      <Transition
        show={!!modal}
        enter="transition-all ease-out duration-300 transform"
        enterFrom="scale-75 opacity-0"
        enterTo="scale-100 opacity-100"
        leave="transition-all ease-in duration-300 transform"
        leaveFrom="scale-100 opacity-100"
        leaveTo="scale-75 opacity-0"
        className="fixed inset-0"
      >
        {!!modal ? modal : prev}
      </Transition>
    </ModalContext.Provider>
  );
}
