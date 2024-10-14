import UnWrap from '../icons/unWrap/unWrap';
import styles from './employeeAssessment.module.css';

const EmployeeAssessment = () => {
    return (
        <div className={styles.content}>
            <div className={styles.summary}>В процессе оценки руководителем</div>
            <div className={styles.assessments}>
                <div className={styles.assessment}>
                    <p className={styles.type}>Самооценка</p>
                    <p className={styles.status + ' ' + styles.result}>Пройдено</p>
                    <UnWrap />
                </div>
                <div className={styles.assessment}>
                    <p className={styles.type}>Оценка руководителя</p>
                    <p className={styles.status + ' ' + styles.process}>В процессе</p>
                    <UnWrap />
                </div>
                <div className={styles.assessment}>
                    <p className={styles.type}>Оценка коллеги</p>
                    {/* <p className={styles.result}>Пройдено</p> */}
                    <UnWrap />
                </div>
            </div>
        </div>
    )
}

export default EmployeeAssessment;