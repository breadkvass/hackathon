import { FC } from 'react';
import { Employee } from '../../../utils/types';
import Badge from '../../icons/badge/badge';
import styles from './employeeAssessment.module.css';

type EmployeeAssessmentProps = {
    employee?: Employee;
}

const EmployeeAssessment: FC<EmployeeAssessmentProps> = ({employee}) => {
    console.log('Сотрудник:', employee);
    return (
        <div className={styles.content}>
            <div className={styles.summary}>
                <Badge />
                В процессе оценки руководителем
            </div>
            <div className={styles.assessments}>
                <div className={styles.assessment}>
                    <p className={styles.type}>Самооценка</p>
                    <p className={styles.status + ' ' + styles.result}>Пройдено</p>
                </div>
                <div className={styles.assessment}>
                    <p className={styles.type}>Оценка руководителя</p>
                    <p className={styles.status + ' ' + styles.process}>В процессе</p>
                </div>
                <div className={styles.assessment}>
                    <p className={styles.type}>Оценка коллеги</p>
                </div>
            </div>
        </div>
    )
}

export default EmployeeAssessment;