import { FC, useState, useMemo, useContext, FormEvent, useCallback } from 'react';
import { Team } from '../../../utils/types';
import { Select } from 'antd';
import { EmployeesContext } from '../../../utils/employeesContext';
import UnWrap from '../../icons/unWrap/unWrap';
import styles from './addEmployeeToTeamComponent.module.css';
import { addEmployeeToTeam } from '../../../utils/api';
import { DefaultOptionType } from 'antd/es/select';

type AddEmployeeToTeamComponentProps = {
    team: Team;
}

// type SelectedEmployee = {
//         value: string;
//         id: number;
//     } | {
//         value: string;
//         id: number;
//     }[];

const AddEmployeeToTeamComponent: FC<AddEmployeeToTeamComponentProps> = ({team}) => {
    const [ jobFilter, setJobFilter ] = useState('');
    const [ gradeFilter, setGradeFilter ] = useState('');
    const [ employees ] = useContext(EmployeesContext);
    const [ employee, setEmployee ] = useState<DefaultOptionType>();

    // const selectedEmployeeName = employee?.value;
    // console.log(employee);

    const employeesData = employees.map((employee, i) => {
        let employeeInfo = {
            key: employee.id,
            number: i+1,
            name: employee.last_name + ' ' + employee.first_name,
            position: employee.job_title,
            grade: employee.grade
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

    const grades = Array.from(new Set(team.employees.map(employee => employee.grade)));
    const gradeOptions = grades.map(grade => {
        let jobsOption = {
            value: grade,
            label: grade
        }
        return jobsOption;
    })

    const filtredData = useMemo(() => {
        let arrayToShow = employeesData;

        if (jobFilter) {
            arrayToShow = employeesData.filter(employee => employee.position === jobFilter)
        }

        if (gradeFilter) {
            arrayToShow = employeesData.filter(employee => employee.grade === gradeFilter)
        }

        return arrayToShow;

    }, [jobFilter, gradeFilter]);


    const handleChange =  (_:string, option: DefaultOptionType) => {
        setEmployee(option);
    }

    const employeesOptions = filtredData.map(employee => {
        let jobsOption = {
            value: employee.name,
            id: employee.key
        }
        return jobsOption;
    })

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (employee) {  
            addEmployeeToTeam(employee.id);
        }
    }

    console.log(team);

    const resetHandler = (e: FormEvent) => {
        e.preventDefault();
        // console.log('reset', jobFilter, gradeFilter);
        setGradeFilter('');
        setJobFilter('')
    }

    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={(e) => submitHandler(e)} onReset={(e) => resetHandler(e)}>
                <label className={styles.label}>
                    <p className={styles.type}>Команда</p>
                    <input disabled placeholder='Медиа'></input>
                </label>
                <div className={styles.selects}>
                    <div className={styles.filter}>
                        <label className={styles.label}>
                            <p className={styles.type}>Должность</p>
                            <Select
                                value={jobFilter}
                                suffixIcon={<UnWrap />}
                                style={{ width: '204px', height: "48px" }}
                                onChange={(value) => setJobFilter(value)}
                                placeholder='Должность'
                                options={jobsOptions}
                            />
                        </label>
                        <label className={styles.label}>
                            <p className={styles.type}>Грейд</p>
                            <Select
                                value={gradeFilter}
                                suffixIcon={<UnWrap />}
                                style={{ width: '204px', height: "48px" }}
                                onChange={(value) => setGradeFilter(value)}
                                placeholder='Грейд'
                                options={gradeOptions}
                            />
                        </label>
                    </div>
                    <label className={styles.label}>
                        <p className={styles.type}>Сотрудник</p>
                        <Select
                            suffixIcon={<UnWrap />}
                            style={{ width: '100%', height: "48px" }}
                            onChange={handleChange}
                            placeholder='Сотрудник'
                            options={employeesOptions}
                        />
                    </label>
                </div>
                <div className={styles.buttons}>
                    <button type='reset' className={styles.button + ' ' + styles.reset} disabled={!jobFilter && !gradeFilter}>Отменить</button>
                    <button type='submit' className={styles.button + ' ' + styles.submit} disabled={!employee}>Добавить</button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployeeToTeamComponent;