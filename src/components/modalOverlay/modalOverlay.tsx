import styles from './modalOverlay.module.css';
import { FC, ReactNode, SyntheticEvent } from "react";

type ModalOverlayProps = {
    closeHandler: Function;
    children: ReactNode;
}

const ModalOverlay: FC<ModalOverlayProps> = ({closeHandler, children}) => {
    const onClickHandler = (e: SyntheticEvent<Element, Event>) => {
        e.stopPropagation();
        closeHandler();
    }

    return (
        <div className={styles.overlay} onClick={onClickHandler}>
            {children}
        </div>
    )
}

export default ModalOverlay;