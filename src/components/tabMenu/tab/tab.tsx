import { FC, MouseEventHandler, useContext } from 'react';
import { TeamsContext } from '../../../utils/teamsContext';
import { useNavigate } from 'react-router-dom';
import UserIcon from '../../icons/userIcon/userIcon';
import TeamsIcon from '../../icons/teamsIcon/teamsIcon';
import UnWrapIcon from '../../icons/unWrapIcon/unWrapIcon';
import RollUp from '../../icons/rollUp/rollUp';
import styles from './tab.module.css';

type TabProps = {
    tab: 'teams' | 'employees';
    items?: string[];
    onTabClickHandler: MouseEventHandler;
    selectedTab: 'teams' | 'employees' | '';
    onItemClickHandler?: MouseEventHandler;
}

const Tab: FC<TabProps> = ({tab, onTabClickHandler, selectedTab, onItemClickHandler}) => {
    const [ teams ] = useContext(TeamsContext);
    const navigate = useNavigate();
    const icon = tab === 'teams' ? <TeamsIcon /> : <UserIcon />;
    const name = tab === 'teams' ? 'Команды' : 'Сотрудники';
    const arrow = tab === selectedTab ? <RollUp /> : <UnWrapIcon />;
    const style = tab === selectedTab ? styles.button + ' ' + styles.selected : styles.button;

    const onTeamClickHandler = (teamId: number) => {
        onItemClickHandler;
        navigate(`/teams/${teamId}`);
    }

    return (

        <li className={styles.element}>
            <button className={style} onClick={onTabClickHandler} name={tab}>
                {icon}
                <p className={styles.name}>{name}</p>
                {arrow}
            </button>
            {selectedTab === 'teams' && teams &&
                <ul className={styles.items}>
                    {teams.map((team, i) =>
                        <li className={styles.item} key={i}>
                            <button className={styles.button} onClick={() => onTeamClickHandler(team.id)} name={team.name}><p className={styles.name}>{team.name}</p></button>
                        </li>
                    )}
                </ul>
            }                
        </li>
    )
}

export default Tab;