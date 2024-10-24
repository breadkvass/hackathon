import { useState, useContext, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeesContext } from "../../utils/employeesContext";
import { getEmployees } from "../../utils/api";
import Layout from "../../components/layout/layout";
import Header from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import styles from './employeesPage.module.css';
import AllEmployeesInfo from "../../components/employees/allEmployeesInfo/allEmployeesInfo";

function EmployeesPage() {
    const navigate = useNavigate();
    const [ , setEmployees ] = useContext(EmployeesContext);
    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('employees');
    const [ selectedInfo, setSelectedInfo ] = useState('');

    const setSelected = (tab: 'teams' | 'employees') => {
        setSelectedTab(tab);
        setSelectedInfo('');
        navigate(`/${tab}`);
    }

    const checkInfo = (e: ChangeEvent<HTMLButtonElement>) => {
        if (selectedInfo !== e.target.textContent) {
            setSelectedInfo('');
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
                <Sidebar
                    onTeamsClickHandler={() => setSelected('teams')}
                    onEmployeesClickHandler={() => setSelected('employees')}
                    onItemClickHandler={(e: any) => checkInfo(e)}
                    selectedTab={selectedTab}
                    employee={selectedTab}
                />
               <AllEmployeesInfo />
            </div>
        </Layout>
    );
}

export default EmployeesPage;