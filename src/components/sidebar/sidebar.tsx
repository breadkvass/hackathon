import { FC, MouseEventHandler, useContext } from 'react';
import styles from './sidebar.module.css';
import { TeamsContext } from '../../utils/teamsContext';
import { useNavigate } from 'react-router-dom';
import TeamsIcon from '../icons/teamsIcon/teamsIcon';
import UserIcon from '../icons/userIcon/userIcon';
import RollUp from '../icons/rollUp/rollUp';
import UnWrapIcon from '../icons/unWrapIcon/unWrapIcon';

type SidebarProps = {
    onTeamsClickHandler: any;
    onEmployeesClickHandler: MouseEventHandler;
    onItemClickHandler: MouseEventHandler;
    selectedTab: 'teams' | 'employees' | '';
    employee?: string;
}

const Sidebar: FC<SidebarProps> = ({onTeamsClickHandler, onEmployeesClickHandler, onItemClickHandler, selectedTab}) => {
    const [ teams ] = useContext(TeamsContext);
    const navigate = useNavigate();
    const arrow = selectedTab === selectedTab ? <RollUp /> : <UnWrapIcon />;
    const style = selectedTab === selectedTab ? styles.button + ' ' + styles.selected : styles.button;

    const onTeamClickHandler = (teamId: number) => {
        onItemClickHandler;
        navigate(`/teams/${teamId}`);
    }

    return (
        <nav className={styles.sidebar}>
            <ul className={styles.list}>
                <li className={styles.element}>
                    <button className={style} onClick={onTeamsClickHandler} name={'teams'}>
                        <TeamsIcon />
                        <p className={styles.name}>Команды</p>
                        {arrow}
                    </button>
                    {selectedTab === 'teams' && teams &&
                    <ul className={styles.items}>
                        {teams.map((team, i) =>
                            <li className={styles.item} key={i}>
                                <button className={styles.button} onClick={() => onTeamClickHandler(team.id)}>
                                    <p className={styles.name}>{team.name}</p>
                                </button>
                            </li>
                        )}
                    </ul>
                    }                
                </li>
                <li className={styles.element}>
                    <button className={style} onClick={onEmployeesClickHandler} name={selectedTab}>
                        <UserIcon />
                        <p className={styles.name}>Сотрудники</p>
                        {arrow}
                    </button>
                    {/* {selectedTab === 'teams' && items &&
                    <ul className={styles.items}>
                        {items.map((item, i) =>
                            <li className={styles.item} key={i}>
                                <button className={styles.button} onClick={() => onItemClickHandler(item.id)}><p className={styles.name}>{item.name}</p></button>
                            </li>
                        )}
                    </ul>
                    }                 */}
                </li>
            </ul>
        </nav>
    );
}

export default Sidebar;