import { useContext } from 'react';
import { TeamsContext } from '../../../utils/teamsContext';
import PlusIcon from '../../icons/plusIcon/plusIcon';
import SummaryContainer from '../../summaryContainer/summaryContainer';
import TeamCard from '../teamCard/teamCard';
import styles from './allTeamsInfo.module.css';
import { useNavigate } from 'react-router-dom';

const AllTeamsInfo = () => {
    const [teams] = useContext(TeamsContext);
    const navigate = useNavigate();

    const onClickButtonHadler = () => {
        navigate('/teams/create')
    }

    return (
        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>Команды</h1>
                    <button className={styles.create} onClick={() => onClickButtonHadler()}>
                        <PlusIcon />
                        Создать команду
                    </button>
                </div>
                <div className={styles.summary}>
                    <SummaryContainer numberResult={teams.length} type='команд' factor={false} />
                    <SummaryContainer numberResult={100} type='сотрудников' factor={false} />
                </div>
            </div>
            <div className={styles.cards}>
                {teams.map(team => <TeamCard key={team.id} team={team}/>)}
            </div>
        </div>
    )
}

export default AllTeamsInfo;