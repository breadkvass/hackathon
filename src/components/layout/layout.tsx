import { FC, ReactNode } from 'react';
import styles from './layout.module.css';

type LayoutProps = {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
    return (
        <div className={styles.layout}>
            {children}
        </div>
    )
}

export default Layout;