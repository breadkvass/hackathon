import { FC, useState, useMemo} from 'react';
import { Select } from 'antd';
import { dataColumns } from '../../../data/teamEmployees';
import { Team } from '../../../utils/types';
import TableComponent from '../../table/table';
import UnWrap from '../../icons/unWrap/unWrap';
import Plus from '../../icons/plus/plus';
import ThreeDotsCircle from '../../icons/threeDotsCircle/threeDotsCircle';
import styles from './teamEmployees.module.css';

type TeamAnalyticsProps = {
    team: Team;
}

const TeamEmployees: FC<TeamAnalyticsProps> = ({team}) => {
    const [ jobFilter, setJobFilter ] = useState('');

    const employeesData = team.employees.map((employee, i) => {
        let employeeInfo = {
            key: employee.id,
            number: i+1,
            name: employee.last_name + ' ' + employee.first_name,
            position: employee.job_title,
            hard: employee.competence.hard_skills,
            soft: employee.competence.soft_skills,
            bus: 0,
            compliance: 1.0,
            todo: <ThreeDotsCircle />
        }

        return employeeInfo;
    });

    const jobs = Array.from(new Set(team.employees.map(employee => employee.job_title)));
    const jobsOptions = jobs.map(job => {
        let jobsOption = {
            value: job,
            label: job
        }
        return jobsOption;
    })

    const handleChange = (value: string) => {
        setJobFilter(value);
    };

    const filtredData = useMemo(() => {
        let arrayToShow = employeesData;

        if (jobFilter) {
            arrayToShow = employeesData.filter(employee => employee.position === jobFilter)
        } 

        return arrayToShow;

    }, [jobFilter]);


    return (
        <div className={styles.analytics}>
            <div className={styles.top}>
                <Select 
                    suffixIcon={<UnWrap />}
                    className={styles.dropdown}
                    onChange={handleChange}
                    placeholder='Должность'
                    options={jobsOptions}
                />
                <button className={styles.add}>
                    <Plus />
                    Добавить сотрудника
                </button>
            </div>
            <div className={styles.table}>
                <TableComponent data={filtredData} columns={dataColumns}/>
            </div>
        </div>
    )
}

export default TeamEmployees;