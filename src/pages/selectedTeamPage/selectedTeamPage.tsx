import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { Team } from '../../utils/types';
import { getTeam } from '../../utils/api';
import Header from '../../components/header/header';
import Layout from '../../components/layout/layout';
import Sidebar from '../../components/sidebar/sidebar';
import SummaryContainer from '../../components/summaryContainer/summaryContainer';
import TeamAnalytics from '../../components/teams/teamAnalytics/teamAnalytics';
import TeamEmployees from '../../components/teams/teamEmployees/teamEmployees';
import TeamEmployeesShedule from '../../components/teams/teamEmployeesShedule/teamEmployeesShedule';
import styles from './selectedTeamPage.module.css';

const SelectedTeamPage = () => {
    let { id } = useParams<string>();
    const navigate = useNavigate();
    const [ team, setTeam ] = useState<Team>();

    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('teams');
    const [ selectedInfo, setSelectedInfo ] = useState('');
    const teamId = Number(id);

    const setSelected = (tab: 'teams' | 'employees') => {
        setSelectedTab(tab);
        setSelectedInfo('');
        navigate(`/${tab}`);
    }

    const checkInfo = (e: ChangeEvent<HTMLButtonElement>) => {
        if (selectedInfo !== e.target.textContent) {
            setSelectedInfo(e.target.textContent as string);
        }
    }

    const employeeCount = team?.employee_count;

    const countAverageAssessment = () => {
        if (team && employeeCount) {
           return team.employees
                .map(employee => employee.competence)
                .map(competence => ( Number( ((competence.hard_skills + competence.soft_skills)/2).toFixed(2)) ) )
                .reduce((a, b) => a+b) / employeeCount
        } else new Error('Ошибка вычисления средней оценки')
    }
    
    const averageAssessment = Number(countAverageAssessment()?.toFixed(2));

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
          children: <TeamEmployeesShedule team={team} />,
        },
        {
            key: "3",
            label: "Сотрудники",
            children: <TeamEmployees team={team}/>,
          },
      ];
    

    useEffect(() => {
        getTeam(teamId)
        .then(res => setTeam(res));
        if (team) {
            setSelectedInfo(team.name)
        }
    }, [teamId])

    return (
        <Layout>
            <Header isAuth={true} isNotifications={true} />
            <div className={styles.content}>
                <Sidebar
                    onTeamsClickHandler={() => setSelected('teams')}
                    onEmployeesClickHandler={() => setSelected('employees')}
                    onItemClickHandler={(e: any) => checkInfo(e)}
                    selectedTab={selectedTab}
                    employee={selectedTab}
                />
               <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{team?.name}</h1>
                </div>
                {team &&
                <div className={styles.summary}>
                    <SummaryContainer numberResult={team.employee_count} type='Количество сотрудников' factor={false}/>
                    <SummaryContainer numberResult={averageAssessment} type='Средняя оценка команды' factor={true}/>
                    <SummaryContainer numberResult={team.bus_factor ? 1 : 0} type='Bus factor' factor={true}/>
                    <SummaryContainer numberResult={team.stress_level} type='Коэффициент стресса средний' factor={true}/>
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
            </div>
        </Layout>
    )
}

export default SelectedTeamPage;