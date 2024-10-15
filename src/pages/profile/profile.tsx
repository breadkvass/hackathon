import { ChangeEvent, useState } from 'react';
import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import TabMenu from '../../components/tabMenu/tabMenu';
import styles from './teams-page.module.css';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {
    const navigate = useNavigate();
    
    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('teams');
    const [ selectedInfo, setSelectedInfo ] = useState('');

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
                <>Профиль инфо</>                    
            </div>
        </Layout>
    );
}

export default ProfilePage;