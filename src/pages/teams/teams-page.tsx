import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TeamsContext } from '../../utils/teamsContext';
import { getEmployees, getTeams } from '../../utils/api';
import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import TabMenu from '../../components/tabMenu/tabMenu';
import TeamsInfo from '../../components/teams/teamsInfo/teamsInfo';
import styles from './teams-page.module.css';
import { EmployeesContext } from '../../utils/employeesContext';


const TeamsPage = () => {
    const navigate = useNavigate();
    const [ teams, setTeams ] = useContext(TeamsContext);
    const [ employees, setEmployees ] = useContext(EmployeesContext);
    
    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('teams');
    const [ selectedInfo, setSelectedInfo ] = useState('');

    console.log('Все команды:', teams);
    console.log('Все сотрудники:', employees);

    useEffect(() => {
        getTeams()
            .then(res => setTeams(res.results));
        getEmployees()
            .then(res => setEmployees(res.results))
    },[])

    const setSelected = (tab: 'teams' | 'employees') => {
        setSelectedTab(tab);
        setSelectedInfo('');
        navigate(`/${tab}`);
    }

    const selectInfo = (e: ChangeEvent<HTMLButtonElement>) => {
        if (selectedInfo !== e.target.textContent) {
            setSelectedInfo(e.target.textContent as string);
        }
    }

    return (
        <Layout>
            <Header isAuth={true} isNotifications={true} />
            <div className={styles.content}>
                <TabMenu
                    onTeamsClickHandler={() => setSelected('teams')}
                    onEmployeesClickHandler={() => setSelected('employees')}
                    onItemClickHandler={(e: any) => selectInfo(e)}
                    selectedTab={selectedTab}
                />
                <TeamsInfo selectedInfo={selectedInfo}/>                    
            </div>
        </Layout>
    );
}

export default TeamsPage;