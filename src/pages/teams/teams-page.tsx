import { ChangeEvent, useState } from 'react';
import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import TabMenu from '../../components/tabMenu/tabMenu';
import TeamsInfo from '../../components/teamsInfo/teamsInfo';
import styles from './teams-page.module.css';
import { ConfigProvider } from 'antd';
import { useNavigate } from 'react-router-dom';


const TeamsPage = () => {
    const navigate = useNavigate();

    const [ checkedTab, setCheckedTab ]= useState<'teams' | 'employees'>('teams');
    const [ checkedInfo, setCheckedInfo ] = useState('');

    const setChecked = (tab: 'teams' | 'employees') => {
        setCheckedTab(tab);
        setCheckedInfo('');
        navigate(`/${tab}`);
    }

    const checkInfo = (e: ChangeEvent<HTMLButtonElement>) => {
        if (checkedInfo !== e.target.textContent) {
            setCheckedInfo(e.target.textContent as string);
            console.log(e.target.textContent);
        }
    }

    return (
        <ConfigProvider>
            <Layout>
                <Header isAuth={true} isNotifications={true} />
                <div className={styles.content}>
                <TabMenu
                    onTeamsClickHandler={() => setChecked('teams')}
                    onEmployeesClickHandler={() => setChecked('employees')}
                    onItemClickHandler={(e: any) => checkInfo(e)}
                    checkedTab={checkedTab}
                />
                    <TeamsInfo checkedInfo={checkedInfo}/>                    
                </div>
            </Layout>
        </ConfigProvider>
    );
}

export default TeamsPage;