import { FC } from 'react';
import { dataStress } from '../../../data/data';
import BarChart from '../../charts/barChart/barChart';
import ChartLayout from '../../charts/chartLayout/chartLayout';
import LineChart from '../../charts/lineChart/lineChart';
import styles from './teamAnalytics.module.css';
import { Team } from '../../../utils/types';
import { Table } from 'antd';
import { Column } from '@ant-design/plots';

type TeamAnalyticsProps = {
    team: Team;
}

type EmployeeRecord = {
    key: number,
    number: number,
    name: string,
    position: string,
}

const TeamAnalytics: FC<TeamAnalyticsProps> = ({team}) => {
    const hardSkillsData = team.employees
        .map(employee => {
            const hardSkills = {
                'skills': 'Hard Skills',
                'assessment': employee.competence.hard_skills,
                'person': employee.last_name + ' ' + employee.first_name
            }

            return hardSkills;
        });

    const softSkillsData = team.employees
        .map(employee => {
            const softSkills = {
                'skills': 'Soft Skills',
                'assessment': employee.competence.soft_skills,
                'person': employee.last_name + ' ' + employee.first_name
            }
            return softSkills;
        });


    const dataSkillsAssessment = hardSkillsData.concat(softSkillsData);

    const busFactorEmployees = team && team.employees.filter(employee => employee.bus_factor === true);

    const dataBus: EmployeeRecord[] = busFactorEmployees.map((employee, i) => ({
        key: employee.id,
        number: i+1,
        name: employee.last_name + ' ' + employee.first_name,
        position: employee.job_title
    }));

    return (
        <div className={styles.analytics}>
            <h3 className={styles.title}>2024 год</h3>
            <div className={styles.graphics}>
                <BarChart
                    type='Средняя оценка скиллов по сотруднику'
                    value={dataSkillsAssessment}
                    width={686}
                    colors={[
                        'linear-gradient(180deg, rgba(235, 72, 105, 0.25) 0%, rgba(235, 72, 105, 0.3) 25%, rgba(235, 72, 105, 0.35) 50%, rgba(235, 72, 105, 0.45) 75%)',
                        'linear-gradient(180deg, rgba(70, 135, 255, 0.25) 0%, rgba(70, 135, 255, 0.3) 25%, rgba(70, 135, 255, 0.35) 50%, rgba(70, 135, 255, 0.45) 75%)']}
                />
                <LineChart
                    type='Уровень стресса'
                    value={dataStress}
                    maxY={5}
                    width={312}
                />
                <ChartLayout type='Bus фактор' style={styles.table}>
                    <Table dataSource={dataBus} pagination={false}>
                        <Column
                            title='№'
                            dataIndex='number'
                            key='number'
                        />
                        <Column
                            title='Фамилия и имя'
                            key='name'
                            dataIndex='name'
                        />
                        <Column
                            width='max-content'
                            title='Должность'
                            key='position'
                            dataIndex='position'
                        />
                    </Table>
                </ChartLayout>
            </div>
        </div>
    )
}

export default TeamAnalytics;