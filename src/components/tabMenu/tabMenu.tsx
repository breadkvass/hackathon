import { FC, MouseEventHandler, useContext } from 'react';
import { TeamsContext } from '../../utils/teamsContext';
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
    const [ teams ] = useContext(TeamsContext);
    const teamsNames = teams.map(team => team.name);
    
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.list}>
                <Tab tab={'teams'}
                    items={teamsNames}
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