import { useState, useContext, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/layout";
import Header from "../../components/header/header";
import TabMenu from "../../components/tabMenu/tabMenu";
import EmployessInfo from "../../components/employees/employeesInfo/employeesInfo";
import styles from './employees-page.module.css';
import { EmployeesContext } from "../../utils/employeesContext";
import { getEmployees } from "../../utils/api";

function EmployeesPage() {
    const navigate = useNavigate();
    const [ employees, setEmployees ] = useContext(EmployeesContext);

    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('employees');
    const [ selectedInfo, setSelectedInfo ] = useState('');

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

    useEffect(() => {
        getEmployees()
        .then(res => setEmployees(res.results));
    },[])

    return (
        <Layout>
            <Header isAuth={true} isNotifications={true} />
            <div className={styles.content}>
                <TabMenu
                    onTeamsClickHandler={() => setSelected('teams')}
                    onEmployeesClickHandler={() => setSelected('employees')}
                    onItemClickHandler={(e: any) => checkInfo(e)}
                    selectedTab={selectedTab}
                />
               <EmployessInfo selectedInfo={selectedInfo}/>
            </div>
        </Layout>
    );
}

export default EmployeesPage;