import { FC, useState, useMemo, useContext} from 'react';
import { Select, Table } from 'antd';
import { Team } from '../../../utils/types';
import UnWrap from '../../icons/unWrap/unWrap';
import Plus from '../../icons/plus/plus';
import Column from 'antd/es/table/Column';
import styles from './teamEmployees.module.css';
import AddEmployeeToTeamForm from '../addEmployeeToTeamForm/addEmployeeToTeamForm';
import ReplaceEmployeeForm from '../replaceEmployeeForm/replaceEmployeeForm';
import { ModalContext } from '../../../hooks/useModal/useModalProvider';
import Modal from '../../modal/modal';

type TeamAnalyticsProps = {
    team: Team;
}

type EmployeeRecord = {
    key: number;
    number: number;
    name: string;
    position: string;
    hard: number;
    soft: number;
    bus: 0,
    compliance: 1.0
}

const TeamEmployees: FC<TeamAnalyticsProps> = ({team}) => {
    const [ openModal, closeModal ] = useContext(ModalContext);
    const [ jobFilter, setJobFilter ] = useState<string | null>('');
    const [ selectedEmployeeId, setSelectedEmployeeId ] = useState(0);
    const selectedEmployee = useMemo(() => team.employees.find(employee => employee.id === selectedEmployeeId), [selectedEmployeeId]);
    
    const employeesData: EmployeeRecord[] = team.employees.map((employee, i) => ({
        key: employee.id,
        number: i+1,
        name: employee.last_name + ' ' + employee.first_name,
        position: employee.job_title,
        hard: employee.competence.hard_skills,
        soft: employee.competence.soft_skills,
        bus: 0,
        compliance: 1.0
    }));
    
    const filtredData = useMemo(() => {
        let arrayToShow = employeesData;

        if (jobFilter) {
            arrayToShow = employeesData.filter(employee => employee.position === jobFilter)
        } 

        return arrayToShow;

    }, [team, jobFilter]);

    const jobs = Array.from(new Set(team.employees.map(employee => employee.job_title)));
    const jobsOptions = jobs.map(job => ({value: job, label: job}));

    const jobFilterChangeHandler = (value: string) => {
        setJobFilter(value);
    };

    const addEmployeeButtonHandler = () => {
        console.log('add employee')
        openModal(
            <Modal closeHandler={closeModal}>
                <AddEmployeeToTeamForm team={team}/>
            </Modal>
    );
    }

    // const closeModal = () => {
    //     // setIsModal('');
    // }

    const replaceEmployeeButtonClickHandler = (employeeId: number) => {
        // setSelectedEmployee(id);
        // setIsModal('replace');
        console.log(`replace ${employeeId}`);
    }

    const deleteEmployeeButtonClickHandler = (employeeId: number) => {
        console.log(`delete ${employeeId}`);
    }

    return (
        <div className={styles.analytics}>
            <div className={styles.top}>
                <Select 
                    suffixIcon={<UnWrap />}
                    className={styles.dropdown}
                    onChange={jobFilterChangeHandler}
                    placeholder='Должность'
                    options={jobsOptions}
                />
                <button className={styles.add} onClick={addEmployeeButtonHandler}>
                    <Plus />
                    Добавить сотрудника
                </button>
            </div>
            <div className={styles.table}>
                <Table dataSource={filtredData} pagination={false}>
                    <Column
                        title="№"
                        key="number"
                        dataIndex='number'
                    />
                    <Column
                        title="Фамилия и имя"
                        key="name"
                        dataIndex='name'
                    />
                    <Column
                        title="Должность"
                        key="position"
                        dataIndex='position'
                    />
                    <Column
                        title="Hard skills"
                        key="hard"
                        dataIndex='hard'
                    />
                    <Column
                        title="Soft skills"
                        key="soft"
                        dataIndex='soft'
                    />
                    <Column
                        title="Bus фактор"
                        key="bus"
                        dataIndex='bus'
                    />
                    <Column
                        title="К. соот-я"
                        key="compliance"
                        dataIndex='compliance'
                    />
                    <Column
                        title="Действие"
                        key="action"
                        render={(_: any, record: EmployeeRecord) => <EmployeeActionButtons employeeId={record.key} onReplace={replaceEmployeeButtonClickHandler} onDelete={deleteEmployeeButtonClickHandler} />}
                    />
                </Table>
            </div>            
        </div>
    )
}

type EmployeeActionButtonsProps = {
    employeeId: number;
    onReplace: (employeeId: number) => void;
    onDelete: (employeeId: number) => void;
}

const EmployeeActionButtons: FC<EmployeeActionButtonsProps> = ({employeeId, onReplace, onDelete}) => {
    return (
        <div className={styles.button}>
            <button className={styles.action} onClick={() => onReplace(employeeId)}>Заменить</button>
            <button className={styles.action} onClick={() => onDelete(employeeId)}>Удалить</button>
        </div>
    )
}

export default TeamEmployees;