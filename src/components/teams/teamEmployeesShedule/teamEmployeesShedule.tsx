import { useState, useMemo, useEffect } from 'react';
import { Select } from 'antd';
import { Team } from '../../../utils/types';
import UnWrap from '../../icons/unWrap/unWrap';
import styles from './teamEmployeesShedule.module.css';
import { FC } from 'react';
import { getTrainingSchedule } from '../../../utils/api';

type TeamEmployeesSheduleProps = {
    team: Team;
}


const TeamEmployeesShedule: FC<TeamEmployeesSheduleProps> = ({team}) => {
    const [ jobFilter, setJobFilter ] = useState('');
    const [ trainingShedule, setTrainingShedule ] = useState([])

    const employeesData = team.employees.map((employee, i) => {
        const employeeInfo = {
            key: employee.id,
            number: i+1,
            name: employee.last_name + ' ' + employee.first_name,
            position: employee.job_title,
        }

        return employeeInfo;
    });

    const jobs = Array.from(new Set(team.employees.map(employee => employee.job_title)));
    const jobsOptions = jobs.map(job => {
        const jobsOption = {
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

    console.log('Отфильтрованная дата:', filtredData)

    useEffect(() => {
        getTrainingSchedule()
        .then(res => setTrainingShedule(res.results));
    }, [])

    const shedule = trainingShedule;
    console.log(shedule);

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
            </div>
            <div className={styles.table}>
                
            </div>
        </div>
    )
}

export default TeamEmployeesShedule;