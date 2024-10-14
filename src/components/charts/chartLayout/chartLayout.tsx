import { FC, ReactNode } from 'react';
import styles from './chartLayout.module.css';

type ChartLayoutProps = {
    children: ReactNode;
    type: string;
}

const ChartLayout: FC<ChartLayoutProps> = ({children, type}) => {
    return (
        <div className={styles.container}>
            <p className={styles.type}>{type}</p>
            {children}
        </div>
    )
}

export default ChartLayout;