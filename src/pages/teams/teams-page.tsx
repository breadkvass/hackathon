import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { TeamsContext } from '../../utils/teamsContext';
import { EmployeesContext } from '../../utils/employeesContext';
import { getEmployees, getTeams } from '../../utils/api';
import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import styles from './teams-page.module.css';
import AllTeamsInfo from '../../components/teams/allTeamsInfo/allTeamsInfo';

const TeamsPage = () => {
    const navigate = useNavigate();
    const [ , setTeams ] = useContext(TeamsContext);
    const [ , setEmployees ] = useContext(EmployeesContext);
    
    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('teams');
    const [ selectedInfo, setSelectedInfo ] = useState('');
    const [ isLoading, setIsLoading ] = useState(true);

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

    return (
        <Layout>
            <Header isAuth={true} isNotifications={true} />
            
            <div className={styles.content}>
                <Sidebar
                    onTeamsClickHandler={() => setSelected('teams')}
                    onEmployeesClickHandler={() => setSelected('employees')}
                    onItemClickHandler={(e: any) => selectInfo(e)}
                    selectedTab={selectedTab}
                />
                {isLoading ?
                    <div className={styles.spinner}>
                        <Spin size="large" />
                    </div>
                    :
                    <AllTeamsInfo />
                }
            </div>
            
        </Layout>
    );
}

export default TeamsPage;