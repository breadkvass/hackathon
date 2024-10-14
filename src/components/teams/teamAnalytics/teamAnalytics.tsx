import { FC } from 'react';
import { dataDynamics, dataStress } from '../../../data/data';
import { dataBus, dataBusColumns } from '../../../data/dataBus';
import BarChart from '../../charts/barChart/barChart';
import ChartLayout from '../../charts/chartLayout/chartLayout';
import ColumnChart from '../../charts/columnChart/columnChart';
import LineChart from '../../charts/lineChart/lineChart';
import TableComponent from '../../table/table';
import styles from './teamAnalytics.module.css';
import { Team } from '../../../utils/types';

type TeamAnalyticsProps = {
    team: Team;
}

const TeamAnalytics: FC<TeamAnalyticsProps> = ({team}) => {

    const hardSkillsData = team.employees
        .map(employee => {
            let hardSkills = {
                'skills': 'Hard Skills',
                'assessment': employee.competence.hard_skills,
                'person': employee.last_name + ' ' + employee.first_name
            }

            return hardSkills;
        });

    const softSkillsData = team.employees
        .map(employee => {
            let softSkills = {
                'skills': 'Soft Skills',
                'assessment': employee.competence.soft_skills,
                'person': employee.last_name + ' ' + employee.first_name
            }
            return softSkills;
        });


    const dataSkillsAssessment = hardSkillsData.concat(softSkillsData);

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
                    <ChartLayout type='Bus фактор'>
                        <TableComponent data={dataBus} columns={dataBusColumns} />
                    </ChartLayout>
                    
            </div>
        </div>
    )
}

export default TeamAnalytics;