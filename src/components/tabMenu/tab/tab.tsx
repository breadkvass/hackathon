import { FC, MouseEventHandler } from 'react';
import UserIcon from '../../icons/userIcon/userIcon';
import TeamsIcon from '../../icons/teamsIcon/teamsIcon';
import UnWrap from '../../icons/unWrap/unWrap';
import RollUp from '../../icons/rollUp/rollUp';
import styles from './tab.module.css';

type TabProps = {
    tab: 'teams' | 'employees';
    items: string[];
    onTabClickHandler: MouseEventHandler;
    selectedTab: 'teams' | 'employees';
    onItemClickHandler: MouseEventHandler;
}

const Tab: FC<TabProps> = ({tab, items, onTabClickHandler, selectedTab, onItemClickHandler}) => {
    const icon = tab === 'teams' ? <TeamsIcon /> : <UserIcon />;
    const name = tab === 'teams' ? 'Команды' : 'Сотрудники';
    const arrow = tab === selectedTab ? <RollUp /> : <UnWrap />;
    const style = tab === selectedTab ? styles.button + ' ' + styles.selected : styles.button;

    return (

        <li className={styles.element}>
            <button className={style} onClick={onTabClickHandler} name={tab}>
                {icon}
                <p className={styles.name}>{name}</p>
                {arrow}
            </button>
            {selectedTab === tab &&
                <ul className={styles.items}>
                    {items.map((item, i) =>
                        <li className={styles.item} key={i}>
                            <button className={styles.button} onClick={onItemClickHandler} name={item}><p className={styles.name}>{item}</p></button>
                        </li>
                    )}
                </ul>
            }
                                
        </li>
    )
}

export default Tab;