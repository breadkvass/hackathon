import { dataDynamics, dataSkillsAssessment, dataStress } from '../../data/data';
import BarChart from '../barChart/barChart';
import ColumnChart from '../columnChart/columnChart';
import LineChart from '../lineChart/lineChart';
import styles from './analytics.module.css';

const Analytics = () => {

    return (
        <div className={styles.analytics}>
            <h3 className={styles.title}>2024 год</h3>
            <div className={styles.graphics}>
                    <ColumnChart
                        type='Динамика средней оценки по доменам'
                        value={dataDynamics}
                        colors={[
                            'linear-gradient(90deg, rgba(235, 72, 105, 0.25) 0%, rgba(235, 72, 105, 0.3) 25%, rgba(235, 72, 105, 0.35) 50%, rgba(235, 72, 105, 0.45) 75%)',
                            'linear-gradient(90deg, rgba(70, 135, 255, 0.25) 0%, rgba(70, 135, 255, 0.3) 25%, rgba(70, 135, 255, 0.35) 50%, rgba(70, 135, 255, 0.45) 75%)']}
                        maxY={5}
                        width={686}
                    />
                    <LineChart
                        type='Уровень стресса'
                        value={dataStress}
                        // colors={['#EB4869']}
                        maxY={5}
                        width={312}
                    />
                    <BarChart
                        type='Средняя оценка скиллов по сотруднику'
                        value={dataSkillsAssessment}
                        width={686}
                        colors={[
                            'linear-gradient(180deg, rgba(235, 72, 105, 0.25) 0%, rgba(235, 72, 105, 0.3) 25%, rgba(235, 72, 105, 0.35) 50%, rgba(235, 72, 105, 0.45) 75%)',
                            'linear-gradient(180deg, rgba(70, 135, 255, 0.25) 0%, rgba(70, 135, 255, 0.3) 25%, rgba(70, 135, 255, 0.35) 50%, rgba(70, 135, 255, 0.45) 75%)']}
                    />
            </div>
        </div>
    )
}

export default Analytics;