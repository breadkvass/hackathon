import { FC } from 'react';
// import userIcon from '../../../assets/images/icons/user.svg';
import UserIcon from '../../icons/userIcon/userIcon';
import TeamsIcon from '../../icons/teamsIcon/teamsIcon';
import UnWrap from '../../icons/unWrap/unWrap';
import RollUp from '../../icons/rollUp/rollUp';
import styles from './tab.module.css';

type TabProps = {
    tab: 'teams' | 'employees';
    items: string[];
    onClickHandler: () => void;
    checkedTab: 'teams' | 'employees';
}

const Tab: FC<TabProps> = ({tab, items, onClickHandler, checkedTab}) => {
    const icon = tab === 'teams' ? <TeamsIcon /> : <UserIcon />;
    const name = tab === 'teams' ? 'Команды' : 'Сотрудники';
    const arrow = tab === checkedTab ? <RollUp /> : <UnWrap />;
    const style = tab === checkedTab ? styles.button + ' ' + styles.checked : styles.button;

    return (

        <li className={styles.element}>
            <button className={style} onClick={onClickHandler} name={tab}>
                {icon}
                <p className={styles.name}>{name}</p>
                {arrow}
            </button>
            {checkedTab === tab &&
                <ul className={styles.items}>
                    {items.map((item, i) =>
                        <li className={styles.item} key={i}>
                            <button className={styles.button}><p className={styles.name}>{item}</p></button>
                        </li>
                    )}
                </ul>
            }
                                
        </li>
    )
}

export default Tab;