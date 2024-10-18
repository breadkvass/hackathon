import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FC, useContext, useEffect, useMemo, useState } from 'react';
import { EmployeesContext } from '../../utils/employeesContext';
import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import { Input, Select, Table } from 'antd';
import styles from './createTeamPage.module.css';
import StepperLine from '../../components/icons/stepperLine/stepperLine';
import SearchIcon from '../../components/icons/searchIcon/searchIcon';
import UnWrapIcon from '../../components/icons/unWrapIcon/unWrapIcon';
import { dataColumns } from '../../data/dataEmployees';
import AllEmployeesInfo from '../../components/employees/allEmployeesInfo/allEmployeesInfo';
import { getEmployees } from '../../utils/api';

const CreateTeamPage = () => {
    const navigate = useNavigate();
    const [ , setEmployees ] = useContext(EmployeesContext);
    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('teams');
    const [ selectedInfo, setSelectedInfo ] = useState('');
    const [ selectedStepTwo, isSelectedStepTwo ] = useState(false);

    const stepTwoStyles = !selectedStepTwo ? styles.nonSelected : styles.selectedStep;

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
                <div className={styles.info}>
                    <div className={styles.desc}>
                        <div className={styles.top}>
                            <h1 className={styles.title}>Создание команды</h1>
                            <div className={styles.stepper}>
                                <div className={styles.step + ' ' + styles.selectedStep}>
                                    <button className={styles.stepButton} onClick={() => isSelectedStepTwo(false)}>
                                        1
                                    </button>
                                    <StepperLine />
                                </div>
                                <div className={styles.step + ' ' + stepTwoStyles}>
                                    <StepperLine />
                                    <button className={styles.stepButton} onClick={() => isSelectedStepTwo(true)}>
                                        2
                                    </button>
                                </div>
                            </div>
                        </div>
                        {!selectedStepTwo ? <FirstStep /> : <></>}
                    </div>
                </div>
            </div>
        </Layout>
    )
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

const FirstStep = () => {
    const [ employees ] = useContext(EmployeesContext);
    const navigate = useNavigate();
    const [ jobFilter, setJobFilter ] = useState<string | null>('');
    const [ teamFilter, setTeamFilter ] = useState('');
    const [ searchValue, setSearchValue ] = useState('');
    const chekedEmployees = [];

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
                        //   onClick: () => {navigate(`${record.key}`)},
                        };
                    }}
                />
            </div>
        </div>
    )
}

export default CreateTeamPage;