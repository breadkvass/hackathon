import { FC, useContext } from 'react';
import { Tabs } from 'antd';
import Plus from '../../icons/plus/plus';
import SummaryContainer from '../../summaryContainer/summaryContainer';
import TeamCard from '../teamCard/teamCard';
import TeamAnalytics from '../teamAnalytics/teamAnalytics';
import TeamEmployees from '../teamEmployees/teamEmployees';
import { TeamsContext } from '../../../utils/context';
import styles from './teamsInfo.module.css';

type SelectedTeamInfoProps = {
    selectedTeam: string;
}

type TeamsInfoProps = {
    selectedInfo: string;
}

const TeamsInfo: FC<TeamsInfoProps> = ({selectedInfo}) => {
    return (
        <>
        {!selectedInfo ? <AllTeamsInfo /> : <SelectedTeamInfo selectedTeam={selectedInfo} />}
        </>
    )
}

const AllTeamsInfo = () => {
    const [teams] = useContext(TeamsContext);

    return (
        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>Команды</h1>
                    <button className={styles.create}>
                        <Plus />
                        Создать команду
                    </button>
                </div>
                <div className={styles.summary}>
                    <SummaryContainer result={teams.length} type='команд' factor={false} />
                    <SummaryContainer result={100} type='сотрудников' factor={false} />
                </div>
            </div>
            <div className={styles.cards}>
                {teams.map(team => <TeamCard key={team.id} team={team}/>)}
            </div>
        </div>
    )
}

const SelectedTeamInfo: FC<SelectedTeamInfoProps> = ({selectedTeam}) => {
    const [ teams ] = useContext(TeamsContext);
    const team = teams.find(team => team.name === selectedTeam);
    const employeeCount = team?.employee_count;

    const countAverageAssessment = () => {
        if (team && employeeCount) {
           return team.employees
                .map(employee => employee.competence)
                .map(competence => ( Number( ((competence.hard_skills + competence.soft_skills)/2).toFixed(2)) ) )
                .reduce((a, b) => a+b) / employeeCount
        } else new Error('Ошибка вычисления средней оценки')
    }
    
    const averageAssessment = countAverageAssessment()?.toFixed(2);

    const tabList = team && [
        {
          key: "1",
          label: "Аналитика",
          children:
            <TeamAnalytics team={team}/>,
        },
        {
          key: "2",
          label: "График обучения сотрудников",
          children: <>График обучения сотрудников</>,
        },
        {
            key: "3",
            label: "Сотрудники",
            children: <TeamEmployees team={team}/>,
          },
      ];
    
    return (
        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{team?.name}</h1>
                </div>
                {team &&
                <div className={styles.summary}>
                    <SummaryContainer result={team.employee_count} type='Количество сотрудников' factor={false}/>
                    <SummaryContainer result={averageAssessment ? averageAssessment : ''} type='Средняя оценка команды' factor={true}/>
                    <SummaryContainer result={team.average_soft_skills} type='Soft Skills' factor={true}/>
                    <SummaryContainer result={team.average_hard_skills} type='Hard Skills' factor={true}/>
                    <SummaryContainer result={team.bus_factor ? 1 : 0} type='Bus factor' factor={true}/>
                    <SummaryContainer result={team.stress_level} type='Коэффициент стресса средний' factor={true}/>
                </div>}
                
            </div>
            <div className={styles.charts}>
                <Tabs
                    defaultActiveKey="1"
                    style={{ width: "100%" }}
                    items={tabList}
                />
            </div>
        </div>
    )
}

export default TeamsInfo;