import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import ProfileInfo from '../../components/profileInfo/profileInfo';
import styles from './profilePage.module.css';


const ProfilePage = () => {
    const navigate = useNavigate();
    
    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees' | ''>('');
    const [ selectedInfo, setSelectedInfo ] = useState('');

    const setSelected = (tab: 'teams' | 'employees' | '') => {
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
                <Sidebar
                    onTeamsClickHandler={() => setSelected('teams')}
                    onEmployeesClickHandler={() => setSelected('employees')}
                    onItemClickHandler={(e: any) => selectInfo(e)}
                    selectedTab={selectedTab}
                />
                <ProfileInfo />                    
            </div>
        </Layout>
    );
}

export default ProfilePage;