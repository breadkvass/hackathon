import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import Search from '../../assets/images/icons/search.svg';
import Bell from '../../assets/images/icons/bell-simple.svg';
import Avatar from '../../assets/images/avatar.jpeg';
import BadgeIcon from '../../assets/images/icons/badge.svg';
import styles from './header.module.css';

type HeaderProps = {
    isAuth: boolean;
    isNotifications?: boolean;
}

const Header: FC<HeaderProps> = (isAuth, isNotifications) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate('/profile')
    }

    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <img className={styles.logo} src={Logo}/>
                {isAuth &&
                    <div className={styles.right}>
                        <div className={styles.notifications}>
                            <img className={styles.headerIcon} src={Search} />
                        </div>
                        <div className={styles.notifications}>
                            <img className={styles.headerIcon} src={Bell} />
                            {isNotifications && <img className={styles.badge} src={BadgeIcon}/>}
                        </div>
                        <div className={styles.profile} onClick={clickHandler}>
                            <img className={styles.avatar} src={Avatar} />
                            <p className={styles.name}>Екатерина Смирнова</p>
                        </div>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header;