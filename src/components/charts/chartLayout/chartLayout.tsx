import { FC, ReactNode } from 'react';
import styles from './chartLayout.module.css';

type ChartLayoutProps = {
    children: ReactNode;
    type: string;
    style?: string;
}

const ChartLayout: FC<ChartLayoutProps> = ({children, type, style}) => {
    return (
        <div className={styles.container + ' ' + style}>
            <p className={styles.type}>{type}</p>
            {children}
        </div>
    )
}

export default ChartLayout;