import { FC, MouseEventHandler } from 'react';
import Tab from './tab/tab';
import styles from './tabMenu.module.css';

type TabMenuProps = {
    onTeamsClickHandler: MouseEventHandler;
    onEmployeesClickHandler: MouseEventHandler;
    onItemClickHandler: MouseEventHandler;
    selectedTab: 'teams' | 'employees' | '';
    employee?: string
}

const TabMenu: FC<TabMenuProps> = ({onTeamsClickHandler,onEmployeesClickHandler, onItemClickHandler, selectedTab}) => {
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.list}>
                <Tab tab={'teams'}
                    onTabClickHandler={onTeamsClickHandler}
                    selectedTab={selectedTab}
                    onItemClickHandler={onItemClickHandler}
                />
                <Tab tab={'employees'}
                    onTabClickHandler={onEmployeesClickHandler}
                    selectedTab={selectedTab}
                    onItemClickHandler={onItemClickHandler}
                />
            </ul>
        </nav>
    );
}

export default TabMenu;