import { FC, ReactNode } from 'react';
import Assistant from '../assistant/assistant';
import styles from './layout.module.css';

type LayoutProps = {
    children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => { 
    return (
        <div className={styles.layout}>
            {children}
            <Assistant />
        </div>
    )
}

export default Layout;