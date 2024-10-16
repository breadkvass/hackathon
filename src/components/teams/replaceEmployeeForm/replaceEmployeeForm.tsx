import { FC, useState, useContext, useMemo, FormEvent } from 'react';
import { Employee, Team } from '../../../utils/types';
import { Select } from 'antd';
import styles from './replaceEmployeeForm.module.css';
import { EmployeesContext } from '../../../utils/employeesContext';
import { DefaultOptionType } from 'antd/es/select';
import UnWrap from '../../icons/unWrap/unWrap';
import { ModalContext } from '../../../hooks/useModal/useModalProvider';
import { updateTeam } from '../../../utils/api';

type ReplaceEmployeeFormProps = {
    employee: Employee;
    team: Team
}

const ReplaceEmployeeForm: FC<ReplaceEmployeeFormProps> = ({employee, team}) => {
    const [ , closeModal ] = useContext(ModalContext);
    const [ jobFilter, setJobFilter ] = useState('');
    const [ teamFilter, setTeamFilter ] = useState('');
    const [ employees ] = useContext(EmployeesContext);
    const [ employeeToReplace, setEmployeeToReplace ] = useState<DefaultOptionType>();

    const employeesData = employees.map((employee, i) => {
        let employeeInfo = {
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
        let jobsOption = {
            value: job,
            label: job
        }
        return jobsOption;
    })

    const teams = Array.from(new Set(employees.map(employee => employee.teams[0]))).filter(team => team !== undefined);
    const teamsOptions = teams.map(team => {
        let teamsOption = {
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
        const employeeToDelete = employee;
        
        
        if (employeeToReplace) {  
            // const employeeToDelete = employees.filter(employee => employee.id === employeeToDelete.id)[0];
            const users = team.employees.filter(employee => employee.id !== employeeToDelete.id);
            const selectedEmployee = employees.filter(employee => employee.id === employeeToReplace.id)[0]
            users.push(selectedEmployee);

            team.users = users.map(user => user.id);

            

            try {
                updateTeam(team);
                console.log(team);
                // closeModal()
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
                    <input disabled placeholder={employee.last_name + ' ' + employee.first_name}></input>
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
                            // value={}
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
                    <button type='submit' className={styles.button + ' ' + styles.submit} disabled={!employee}>Заменить</button>
                </div>
            </form>
        </div>
    )
}

export default ReplaceEmployeeForm;