import { FC, FormEvent, useContext, useMemo, useState } from 'react';
import type { TableProps } from 'antd';
import { Input, Select, Table } from 'antd';
import { CreationTeamContext } from '../../../../utils/creationTeamContext';
import { dataColumns } from '../../../../data/dataEmployees';
import { EmployeesContext } from '../../../../utils/employeesContext';
import SearchIcon from '../../../icons/searchIcon/searchIcon';
import UnWrapIcon from '../../../icons/unWrapIcon/unWrapIcon';
import CheckedUserIcon from '../../../icons/checkedUserIcon/checkedUserIcon';
import styles from './creationTeamStepOne.module.css';

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

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type FirstStepProps = {
    selectStepTwo: any;
}

const CreationTeamStepOne: FC<FirstStepProps> = ({selectStepTwo}) => {
    const [ , {setMembersId} ] = useContext(CreationTeamContext);
    const [ employees ] = useContext(EmployeesContext);
    const [ jobFilter, setJobFilter ] = useState<string | null>('');
    const [ teamFilter, setTeamFilter ] = useState('');
    const [ searchValue, setSearchValue ] = useState('');
    const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>([]);

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
    
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection: TableRowSelection<EmployeeRecord> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const submitButtonHandler = (e: FormEvent) => {
        e.preventDefault();
        setMembersId(rowSelection.selectedRowKeys as number[]);
        selectStepTwo();
    }
    
    return (

        <div className={styles.container}>
            <form className={styles.firstForm}>
                <div className={styles.stepDescription}>
                    <p className={styles.text}>Выберите сотрудников, которых хотите включить в команду</p>
                    <div className={styles.buttons}>
                        {hasSelected &&
                        <div className={styles.selectedUsers}>
                            <CheckedUserIcon />
                            <p className={styles.selected}>{`Выбрано ${selectedRowKeys.length}`}</p>
                        </div>}
                        <button type="submit" className={styles.submit} disabled={selectedRowKeys.length >= 3 ? false : true} onClick={e => submitButtonHandler(e)}>Далее</button>
                    </div>
                </div>
                <div className={styles.filter}>
                    <Input
                        className={styles.search}
                        placeholder="Поиск"
                        onChange={(e) => setSearchValue(e.target.value)}
                        prefix={<SearchIcon />} />
                    <div className={styles.selects}>
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
            </form>
            <div className={styles.table}>
                <Table
                    rowSelection={rowSelection}
                    dataSource={filtredData}
                    columns={dataColumns} 
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default CreationTeamStepOne;