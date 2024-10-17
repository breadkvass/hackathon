import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, ChangeEvent } from 'react';
import Header from '../../components/header/header';
import Layout from '../../components/layout/layout';
import TabMenu from '../../components/tabMenu/tabMenu';
import styles from './employee-page.module.css';
import { getEmployee } from '../../utils/api';
import { Employee } from '../../utils/types';
import SummaryContainer from '../../components/summaryContainer/summaryContainer';
import { Tabs } from 'antd';
import EmployeeAnalytics from '../../components/employees/employeeAnalytics/employeeAnalytics';
import EmployeeAssessment from '../../components/employees/employeeAssessment/employeeAssessment';
import IPR from '../../components/IPR/IPR';

const EmployeePage = () => {
    let { id } = useParams<string>();
    const navigate = useNavigate();
    const [ employee, setEmployee ] = useState<Employee>();
    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('employees');
    const [ selectedInfo, setSelectedInfo ] = useState('');
    const employeeId = Number(id);

    const tabList = [
        {
          key: "1",
          label: "Аналитика",
          children: <EmployeeAnalytics employee={employee} />,
        },
        {
          key: "2",
          label: "Оценка",
          children: <EmployeeAssessment employee={employee} />,
        },
        {
            key: "3",
            label: "ИПР",
            children: <IPR />,
          },
      ];

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
        getEmployee(employeeId)
        .then(res => setEmployee(res));
        if (employee) {
            setSelectedInfo(employee.last_name + ' ' + employee.first_name)
        }
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
                    employee={selectedTab}
                />
                <div className={styles.info}>
                    <div className={styles.desc}>
                        <div className={styles.top}>
                            <h1 className={styles.title}>{selectedInfo}</h1>
                        </div>
                        <div className={styles.summary}>
                            <SummaryContainer result={employee?.job_title} type='Должность' factor={false}/>
                            <SummaryContainer result={employee?.grade} type='Грейд' factor={false}/>
                            <SummaryContainer result={1.0} type='Коэф. стресса' factor={true}/>
                            <SummaryContainer result={1.0} type='Коэф. соответствия' factor={true}/>
                        </div>
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

export default EmployeePage;