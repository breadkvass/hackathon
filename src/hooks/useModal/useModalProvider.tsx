import React, { FC, ReactElement } from "react";
import useModal, { UseModalType } from "./useModal";
import Modal from "./modal";



const ModalContext = React.createContext<UseModalType>([()=>{},()=>{}, null]);

type ModalContextProviderProps = {
    children: ReactElement;
}

const ModalContextProvider: FC<ModalContextProviderProps> = ({ children }) => {
  const [open, close, content] = useModal();

  return (
    <ModalContext.Provider value={[open, close, content]}>
      <Modal />
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };