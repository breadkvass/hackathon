import { FC, useState, useMemo, useContext, FormEvent } from 'react';
import { Team } from '../../../utils/types';
import { Select } from 'antd';
import { EmployeesContext } from '../../../utils/employeesContext';
import UnWrap from '../../icons/unWrap/unWrap';
import styles from './addEmployeeToTeamForm.module.css';
import { DefaultOptionType } from 'antd/es/select';
import { ModalContext } from '../../../hooks/useModal/useModalProvider';
import { updateTeam } from '../../../utils/api';

type AddEmployeeToTeamFormProps = {
    team: Team;
}

const AddEmployeeToTeamForm: FC<AddEmployeeToTeamFormProps> = ({team}) => {
    const [ , closeModal ] = useContext(ModalContext);
    const [ employees ] = useContext(EmployeesContext);
    const [ jobFilter, setJobFilter ] = useState('');
    const [ gradeFilter, setGradeFilter ] = useState('');
    const [ selectedEmployee, setSelectedEmployee ] = useState<DefaultOptionType>();

    const employeesData = employees.map((employee, i) => {
        const employeeInfo = {
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
        const jobsOption = {
            value: job,
            label: job
        }
        return jobsOption;
    })

    const grades = Array.from(new Set(team.employees.map(employee => employee.grade)));
    const gradeOptions = grades.map(grade => {
        const gradeOption = {
            value: grade,
            label: grade
        }
        return gradeOption;
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
        setSelectedEmployee(option);
    }

    const employeesOptions = filtredData.map(employee => {
        const jobsOption = {
            value: employee.name,
            id: employee.key
        }
        return jobsOption;
    })

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        const users = team.employees;
        if (selectedEmployee) {  
            const employee = employees.filter(employee => employee.id === selectedEmployee.id)[0];
            users.push(employee);
            team.users = users.map(user => user.id);
            try {
                updateTeam(team);
                closeModal()
            }
            catch {new Error('Ошибка отправки данных')}
        }
    }

    const resetHandler = (e: FormEvent) => {
        e.preventDefault();
        closeModal();
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
                    <button type='reset' className={styles.button + ' ' + styles.reset}>Отменить</button>
                    <button type='submit' className={styles.button + ' ' + styles.submit} disabled={!selectedEmployee}>Добавить</button>
                </div>
            </form>
        </div>
    )
}

export default AddEmployeeToTeamForm;