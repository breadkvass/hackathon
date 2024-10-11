import { FC, MouseEventHandler } from 'react';
import Tab from './tab/tab';
import styles from './tabMenu.module.css';

type TabMenuProps = {
    onTabClickHandler: MouseEventHandler;
    onItemClickHandler: MouseEventHandler;
    checkedTab: "teams" | "employees";
}

const TabMenu: FC<TabMenuProps> = ({onTabClickHandler, onItemClickHandler, checkedTab}) => {
    const teams = [ 'Медиа', 'Core', 'Приложение', 'ФЛ', 'Эквайринг', 'ЮЛ'];
    const employees = [ 'Акимов Роберт' ];
    
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.list}>
                <Tab tab={'teams'}
                    teams={teams}
                    onTabClickHandler={onTabClickHandler}
                    checkedTab={checkedTab}
                    onItemClickHandler={onItemClickHandler}
                />
                <Tab tab={'employees'}
                    teams={employees}
                    onTabClickHandler={onTabClickHandler}
                    checkedTab={checkedTab}
                    onItemClickHandler={onItemClickHandler}
                />
            </ul>
        </nav>
    );
}

export default TabMenu;