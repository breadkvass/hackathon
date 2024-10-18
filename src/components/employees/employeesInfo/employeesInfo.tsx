import { FC, useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Table } from "antd";
import { Tabs } from 'antd';
import { Select } from 'antd';
import { dataColumns } from '../../../data/dataEmployees';
import { EmployeesContext } from '../../../utils/employeesContext';
import SearchIcon from '../../icons/searchIcon/searchIcon';
import UnWrapIcon from '../../icons/unWrapIcon/unWrapIcon';
import SummaryContainer from '../../summaryContainer/summaryContainer';
import EmployeeAssessment from '../employeeAssessment/employeeAssessment';
import EmployeeAnalytics from '../employeeAnalytics/employeeAnalytics';
import IPR from '../../IPR/IPR';
import styles from './employeesInfo.module.css';

type SelectedEmplyeeInfoProps = {
    selectedEmployee: string;
}

type EmployessInfoProps = {
    selectedInfo: string;
}

type EmployeeRecord = {
    key: number;
    number: number;
    name: string;
    position: string;
    grade: string;
    hard: number;
    soft: number;
    compliance: 1.0;
    team: string
}

const EmployessInfo: FC<EmployessInfoProps> = ({selectedInfo}) => {
    return (
        <>
        {!selectedInfo ? <AllEmployeesInfo /> : <SelectedEmployeeInfo selectedEmployee={selectedInfo} />}
        </>
    )
}

const AllEmployeesInfo = () => {
    const [ employees ] = useContext(EmployeesContext);
    const navigate = useNavigate();
    const [ jobFilter, setJobFilter ] = useState<string | null>('');
    const [ teamFilter, setTeamFilter ] = useState('');
    const [ searchValue, setSearchValue ] = useState('');

    const employeesData: EmployeeRecord[] = employees.map((employee, i) => ({
        key: employee.id,
        number: i+1,
        name: employee.last_name + ' ' + employee.first_name,
        position: employee.job_title,
        hard: employee.competence.hard_skills,
        soft: employee.competence.soft_skills,
        grade: employee.grade,
        compliance: 1.0,
        team: employee.teams.join(', ')
    }));

    const teams = Array.from(new Set(employees.map(employee => employee.teams[0]))).filter(team => team !== undefined);
    const teamsOptions = teams.map(team => {
        let teamsOption = {
            value: team,
            label: team
        }
        return teamsOption;
    })

    const jobs = Array.from(new Set(employees.map(employee => employee.job_title)));
    const jobsOptions = jobs.map(job => ({value: job, label: job}));

    const filtredData = useMemo(() => {
        let arrayToShow = employeesData;

        if (jobFilter) {
            arrayToShow = employeesData.filter(employee => employee.position === jobFilter)
        } 

        if (teamFilter) {
            arrayToShow = employeesData.filter(employee => employee.team.includes(teamFilter))
        } 

        if (searchValue) {
            arrayToShow = employeesData.filter(employee => employee.name.includes(searchValue))
        } 

        return arrayToShow;

    }, [employees, jobFilter, teamFilter, searchValue]);
    
    return (

        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>Сотрудники</h1>
                    <p className={styles.sum}>100</p>
                </div>
                <div className={styles.filter}>
                    <Input
                        className={styles.search}
                        placeholder="Поиск"
                        onChange={(e) => setSearchValue(e.target.value)}
                        prefix={<SearchIcon />} />
                    <Select
                        suffixIcon={<UnWrapIcon />}
                        className={styles.dropdown}
                        onChange={(value) => setTeamFilter(value)}
                        placeholder='Команда'
                        options={teamsOptions}
                    />
                    <Select
                        suffixIcon={<UnWrapIcon />}
                        className={styles.dropdown}
                        onChange={(value) => setJobFilter(value)}
                        placeholder='Должность'
                        options={jobsOptions}
                    />
                </div>
            </div>
            <div className={styles.table}>
                <Table
                    dataSource={filtredData}
                    columns={dataColumns} 
                    pagination={false}
                    onRow={(record) => {
                        return {
                          onClick: () => {navigate(`${record.key}`)},
                        };
                    }}
                />
            </div>
        </div>
    )
}

const SelectedEmployeeInfo: FC<SelectedEmplyeeInfoProps> = ({selectedEmployee}) => {
    const tabList = [
        {
          key: "1",
          label: "Аналитика",
          children: <EmployeeAnalytics />,
        },
        {
          key: "2",
          label: "Оценка",
          children: <EmployeeAssessment />,
        },
        {
            key: "3",
            label: "ИПР",
            children: <IPR />,
          },
      ];
    
    return (
        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{selectedEmployee}</h1>
                </div>
                <div className={styles.summary}>
                    <SummaryContainer result={'Дизайнер'} type='Должность' factor={false}/>
                    <SummaryContainer result={'Middle'} type='Грейд' factor={false}/>
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
    )
}

export default EmployessInfo;