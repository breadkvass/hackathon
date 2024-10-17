import { FC, useState, useContext, useMemo, FormEvent } from 'react';
import { Employee, Team } from '../../../utils/types';
import { Select } from 'antd';
import styles from './replaceEmployeeForm.module.css';
import { EmployeesContext } from '../../../utils/employeesContext';
import { DefaultOptionType } from 'antd/es/select';
import UnWrap from '../../icons/unWrap/unWrap';
import { ModalContext } from '../../../hooks/useModal/useModalProvider';
import { updateEmployee } from '../../../utils/api';

type ReplaceEmployeeFormProps = {
    employeeToDelete: Employee;
    team: Team
}

const ReplaceEmployeeForm: FC<ReplaceEmployeeFormProps> = ({employeeToDelete, team}) => {
    const [ , closeModal ] = useContext(ModalContext);
    const [ jobFilter, setJobFilter ] = useState('');
    const [ teamFilter, setTeamFilter ] = useState('');
    const [ employees ] = useContext(EmployeesContext);
    const [ newEmployee, setNewEmployee ] = useState<DefaultOptionType>();

    const employeesData = employees.map((employee, i) => {
        const employeeInfo = {
            key: employee.id,
            number: i+1,
            name: employee.last_name + ' ' + employee.first_name,
            position: employee.job_title,
            grade: employee.grade,
            teams: employee.teams
        }

        return employeeInfo;
    });

    const jobs = Array.from(new Set(employees.map(employee => employee.job_title)));
    const jobsOptions = jobs.map(job => {
        const jobsOption = {
            value: job,
            label: job
        }
        return jobsOption;
    })

    const teams = Array.from(new Set(employees.map(employee => employee.teams[0]))).filter(team => team !== undefined);
    const teamsOptions = teams.map(team => {
        const teamsOption = {
            value: team,
            label: team
        }
        return teamsOption;
    })

    const filtredData = useMemo(() => {
        let arrayToShow = employeesData;

        if (jobFilter) {
            arrayToShow = employeesData.filter(employee => employee.position === jobFilter)
        }

        if (teamFilter) {
            arrayToShow = employeesData.filter(employee => employee.teams.includes(teamFilter))
        }

        return arrayToShow;

    }, [jobFilter, teamFilter]);

    console.log(employeesData.filter(employee => employee.teams.includes(teamFilter)))
    console.log(teamFilter)


    const handleChange =  (_:string, option: DefaultOptionType) => {
        setNewEmployee(option);
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
        
        if (employeeToDelete && newEmployee) {
            try {
                updateEmployee(employeeToDelete.id, newEmployee.id, team.id);
                closeModal();
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
                    <p className={styles.type}>Сотрудник</p>
                    <input disabled placeholder={employeeToDelete.last_name + ' ' + employeeToDelete.first_name}></input>
                </label>
                <div className={styles.selects}>
                    <div className={styles.filter}>
                        <label className={styles.label}>
                            <p className={styles.type}>Из какой команды</p>
                            <Select
                                value={teamFilter}
                                suffixIcon={<UnWrap />}
                                style={{ width: '204px', height: "48px" }}
                                onChange={(value) => setTeamFilter(value)}
                                placeholder='Должность'
                                options={teamsOptions}
                            />
                        </label>
                        <label className={styles.label}>
                            <p className={styles.type}>Грейд</p>
                            <Select
                                value={jobFilter}
                                suffixIcon={<UnWrap />}
                                style={{ width: '204px', height: "48px" }}
                                onChange={(value) => setJobFilter(value)}
                                placeholder='Грейд'
                                options={jobsOptions}
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
                    <button type='submit' className={styles.button + ' ' + styles.submit} disabled={!newEmployee}>Заменить</button>
                </div>
            </form>
        </div>
    )
}

export default ReplaceEmployeeForm;