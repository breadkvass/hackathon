import { FC } from 'react';
import { dataCompliance, dataHard, dataSoft, dataEmployeeAssessment } from '../../../data/data';
import { Employee } from '../../../utils/types';
import BarChart from '../../charts/barChart/barChart';
import ColumnChart from '../../charts/columnChart/columnChart';
import styles from './employeeAnalytics.module.css';
 
type EmployeeAnalyticsProps = {
    employee?: Employee;
}

const EmployeeAnalytics: FC<EmployeeAnalyticsProps> = ({employee}) => {
    console.log('Сотрудник:', employee);
    return (
        <div className={styles.analytics}>
            <h3 className={styles.title}>2024 год</h3>
            <div className={styles.graphics}>
                <ColumnChart
                    type='Hard skills'
                    value={dataHard}
                    colors={[
                        'linear-gradient(90deg, rgba(235, 72, 105, 0.25) 0%, rgba(235, 72, 105, 0.3) 25%, rgba(235, 72, 105, 0.35) 50%, rgba(235, 72, 105, 0.45) 75%)']}
                    maxY={5}
                    width={309}
                />
                <ColumnChart
                    type='Soft skills'
                    value={dataSoft}
                    colors={[
                        'linear-gradient(90deg, rgba(70, 135, 255, 0.25) 0%, rgba(70, 135, 255, 0.3) 25%, rgba(70, 135, 255, 0.35) 50%, rgba(70, 135, 255, 0.45) 75%)']}
                    maxY={5}
                    width={309}
                />
                <ColumnChart
                    type='Коэфициент соответствия'
                    value={dataCompliance}
                    colors={[
                        'linear-gradient(90deg, rgba(181, 147, 252, 0.25) 0%, rgba(181, 147, 252, 0.3) 25%, rgba(181, 147, 252, 0.35) 50%, rgba(181, 147, 252, 0.45) 76.5%)']}
                    maxY={1}
                    width={309}
                />
                <BarChart
                    type='Баллы в рамках ежеквартального тестирования'
                    value={dataEmployeeAssessment}
                    width={1072}
                    colors={[
                        'linear-gradient(180deg, rgba(235, 72, 105, 0.25) 0%, rgba(235, 72, 105, 0.3) 25%, rgba(235, 72, 105, 0.35) 50%, rgba(235, 72, 105, 0.45) 75%)',
                        'linear-gradient(180deg, rgba(70, 135, 255, 0.25) 0%, rgba(70, 135, 255, 0.3) 25%, rgba(70, 135, 255, 0.35) 50%, rgba(70, 135, 255, 0.45) 75%)']}
                />
            </div>
        </div>
    )
}

export default EmployeeAnalytics;