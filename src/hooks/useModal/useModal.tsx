import {ReactElement, useState} from "react";

export type UseModalType = [
    open: (content: ReactElement) => void,
    close: () => void,
    content: ReactElement | null,
]

const useModal = () => {
  const [content, setContent] = useState<ReactElement | null>(null);

  const open = (content: ReactElement) => {
    setContent(content);
  };

  const close = () => {
    setContent(null);
  }

  return [open, close, content] as UseModalType;
};

export default useModal;