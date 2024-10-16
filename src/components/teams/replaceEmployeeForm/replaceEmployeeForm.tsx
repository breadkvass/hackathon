import { FC, useState, useContext, useMemo, FormEvent } from 'react';
import { Employee } from '../../../utils/types';
import { Select } from 'antd';
import styles from './replaceEmployeeComponent.module.css';
import { EmployeesContext } from '../../../utils/employeesContext';
import { DefaultOptionType } from 'antd/es/select';
import UnWrap from '../../icons/unWrap/unWrap';

type ReplaceEmployeeFormProps = {
    employee: Employee;
}

const ReplaceEmployeeForm: FC<ReplaceEmployeeFormProps> = ({employee}) => {
    const [ jobFilter, setJobFilter ] = useState('');
    const [ gradeFilter, setGradeFilter ] = useState('');
    const [ employees ] = useContext(EmployeesContext);
    const [ employeeToReplace, setEmployeeToReplace ] = useState<DefaultOptionType>();

    console.log(employee);

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

    const jobs = Array.from(new Set(employees.map(employee => employee.job_title)));
    const jobsOptions = jobs.map(job => {
        let jobsOption = {
            value: job,
            label: job
        }
        return jobsOption;
    })

    const grades = Array.from(new Set(employees.map(employee => employee.grade)));
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
        setEmployeeToReplace(option);
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
        // if (employee) {  
        //     addEmployeeToTeam(employee.id);
        // }
    }

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

export default ReplaceEmployeeForm;