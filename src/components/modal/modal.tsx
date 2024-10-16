import { useEffect, useCallback, SyntheticEvent, ReactNode, FC } from 'react';
import ModalOverlay from "../modalOverlay/modalOverlay";
import styles from "./modal.module.css";
import Cross from "../icons/cross/cross";

type ModalProps = {
    // padding?: string;
    title?: string;
    children: ReactNode;
    closeHandler: Function;
}

const stopPropagation = (e: SyntheticEvent<Element, Event>) => e.stopPropagation();

const Modal: FC<ModalProps> = ({closeHandler, children, title}) => {
    const escHandler = useCallback((e: KeyboardEvent) => {
        if (e.key === "Escape") {
            e.stopPropagation();
            closeHandler;
        }
    }, []);
    
    useEffect(() => {
        document.addEventListener("keydown", escHandler, false);

        return () => {
            document.removeEventListener("keydown", escHandler, false);
        };

    }, [escHandler]);
    
    const onClickHandler = () => {
        closeHandler();
    }

    return (
        <ModalOverlay closeHandler={closeHandler}>
            <div className={styles.modal} onClick={stopPropagation}>
                <button className={styles.close} onClick={onClickHandler}><Cross /></button>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </ModalOverlay>
    );
}

export default Modal;