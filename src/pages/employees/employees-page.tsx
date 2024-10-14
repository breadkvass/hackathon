import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import Header from "../../components/header/header";
import TabMenu from "../../components/tabMenu/tabMenu";
import EmployessInfo from "../../components/employees/employeesInfo/employeesInfo";
import styles from './employees-page.module.css';

function EmployeesPage() {
    const navigate = useNavigate();

    const [ checkedTab, setCheckedTab ]= useState<'teams' | 'employees'>('employees');
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
        <Layout>
            <Header isAuth={true} isNotifications={true} />
            <div className={styles.content}>
                <TabMenu
                    onTeamsClickHandler={() => setChecked('teams')}
                    onEmployeesClickHandler={() => setChecked('employees')}
                    onItemClickHandler={(e: any) => checkInfo(e)}
                    checkedTab={checkedTab}
                />
               <EmployessInfo checkedInfo={checkedInfo}/>
            </div>
        </Layout>
    );
}

export default EmployeesPage;