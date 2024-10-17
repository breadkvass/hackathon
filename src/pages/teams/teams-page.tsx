import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { TeamsContext } from '../../utils/teamsContext';
import { EmployeesContext } from '../../utils/employeesContext';
import { getEmployees, getTeams } from '../../utils/api';
import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import TabMenu from '../../components/tabMenu/tabMenu';
import TeamsInfo from '../../components/teams/teamsInfo/teamsInfo';
import styles from './teams-page.module.css';
import { Team } from '../../utils/types';

const TeamsPage = () => {
    const navigate = useNavigate();
    const [ teams, setTeams ] = useContext(TeamsContext);
    const [ employees, setEmployees ] = useContext(EmployeesContext);
    
    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('teams');
    const [ selectedInfo, setSelectedInfo ] = useState('');
    const [ selectedTeam, setSelectedTeam ] = useState<Team>()
    const [ isLoading, setIsLoading ] = useState(true);

    console.log('Все команды:', teams);
    console.log('Все сотрудники:', employees);

    useEffect(() => {        
        getTeams()
            .then(res => setTeams(res.results))
            .then(() => setIsLoading(false))
        getEmployees()
            .then(res => setEmployees(res.results))
            .then(() => setIsLoading(false))
    }, [])

    const setSelected = (tab: 'teams' | 'employees') => {
        setSelectedTab(tab);
        setSelectedInfo('');
        navigate(`/${tab}`);
    }

    const selectInfo = async (e: ChangeEvent<HTMLButtonElement>) => {

        if (selectedInfo !== e.target.textContent) {
            setSelectedInfo(e.target.textContent as string);
        }
        
        
    }

    // const findTeamIdByName = () => {
    //     if (selectedInfo) {
    //         const team = teams.filter(team => team.name === selectedInfo)[0];
    //         setSelectedTeam(team);
    //         return team;
    //     }
    // }

    return (
        <Layout>
            <Header isAuth={true} isNotifications={true} />
            {isLoading ?
            <div className={styles.spinner}>
                <Spin size="large" />
            </div>
            :
            <div className={styles.content}>
                <TabMenu
                    onTeamsClickHandler={() => setSelected('teams')}
                    onEmployeesClickHandler={() => setSelected('employees')}
                    onItemClickHandler={(e: any) => selectInfo(e)}
                    selectedTab={selectedTab}
                />
                <TeamsInfo selectedInfo={selectedInfo}/>
            </div>
            }
        </Layout>
    );
}

export default TeamsPage;