import styles from './header.module.css';
import Logo from '../../assets/images/logo.png';
import { FC, PropsWithChildren } from 'react';

type children = PropsWithChildren;

type HeaderProps = {
    children?: children;
    isAuth: boolean;
}

const Header: FC<HeaderProps> = ({children}, isAuth) => {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <img className={styles.logo} src={Logo}/>
                {isAuth && children}
            </div>
        </header>
    )
}

export default Header;