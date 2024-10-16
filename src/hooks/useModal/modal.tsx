import {useContext} from 'react';
import ReactDOM from "react-dom";
import { ModalContext } from "./useModalProvider";

const modalRootElement = document.getElementById('modal-root')

const Modal = () => {
    const [, close, content] = useContext(ModalContext);

    if (!modalRootElement || !content) {
        return null;
    }
    
    return ReactDOM.createPortal(
        <div><button onClick={() => close()}></button>{content}</div>,
        modalRootElement
    );
};

export default Modal;