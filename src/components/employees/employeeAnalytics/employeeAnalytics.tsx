import { FC, useEffect, useState } from 'react';
import { dataEmployeeAssessment } from '../../../data/data';
import { Employee } from '../../../utils/types';
import { getEmployeeSkills } from '../../../utils/api';
import BarChart from '../../charts/barChart/barChart';
import ColumnChart from '../../charts/columnChart/columnChart';
import styles from './employeeAnalytics.module.css';
 
type EmployeeAnalyticsProps = {
    employee?: Employee;
}

type dataHardSkills = {
    hard_skills_one: number;
    hard_skills_two: number;
    hard_skills_three: number;
    hard_skills_four: number;
}

type dataSoftSkills = {
    soft_skills_one: number;
    soft_skills_two: number;
    soft_skills_three: number;
    soft_skills_four: number;
}

type dataAccordanceFactor = {
    accordance_one: number;
    accordance_two: number;
    accordance_three: number;
    accordance_four: number;
}

type EmployeeAnalytics = {
    hard_skills: dataHardSkills;
    soft_skills: dataSoftSkills;
    accordance: dataAccordanceFactor;
}

const EmployeeAnalytics: FC<EmployeeAnalyticsProps> = ({employee}) => {
    const [ employeeAnalytics, setEmployeeAnalytics ] = useState<EmployeeAnalytics>();

    useEffect(() => {
        if (employee) {
            getEmployeeSkills(employee.id).then(res => setEmployeeAnalytics(res.analytics));
        }
    }, [employee])

    const dataHard = employeeAnalytics && [
        {
          "skills": "Hard Skills",
          "kvartal": "1 квартал",
          "assessment": employeeAnalytics.hard_skills.hard_skills_one
        },
        {
          "skills": "Hard Skills",
          "kvartal": "2 квартал",
          "assessment": employeeAnalytics.hard_skills.hard_skills_two
        },
        {
          "skills": "Hard Skills",
          "kvartal": "3 квартал",
          "assessment": employeeAnalytics.hard_skills.hard_skills_three
        },
        {
          "skills": "Hard Skills",
          "kvartal": "4 квартал",
          "assessment": employeeAnalytics.hard_skills.hard_skills_four
        }
    ];

    const dataSoft = employeeAnalytics && [
        {
          "skills": "Soft Skills",
          "kvartal": "1 квартал",
          "assessment": employeeAnalytics.soft_skills.soft_skills_one
        },
        {
          "skills": "Soft Skills",
          "kvartal": "2 квартал",
          "assessment": employeeAnalytics.soft_skills.soft_skills_two
        },
        {
          "skills": "Soft Skills",
          "kvartal": "3 квартал",
          "assessment": employeeAnalytics.soft_skills.soft_skills_three
        },
        {
          "skills": "Soft Skills",
          "kvartal": "4 квартал",
          "assessment": employeeAnalytics.soft_skills.soft_skills_four
        }
    ];

    const dataAccordanceFactor = employeeAnalytics && [
        {
          "skills": "Коэффициент соответствия",
          "kvartal": "1 квартал",
          "assessment": employeeAnalytics.accordance.accordance_one
        },
        {
          "skills": "Коэффициент соответствия",
          "kvartal": "2 квартал",
          "assessment": employeeAnalytics.accordance.accordance_two
        },
        {
          "skills": "Коэффициент соответствия",
          "kvartal": "3 квартал",
          "assessment": employeeAnalytics.accordance.accordance_three
        },
        {
          "skills": "Коэффициент соответствия",
          "kvartal": "4 квартал",
          "assessment": employeeAnalytics.accordance.accordance_four
        }
    ];

    console.log(dataHard);

    return (
        <div className={styles.analytics}>
            <h3 className={styles.title}>2024 год</h3>
            <div className={styles.graphics}>
                {dataHard &&
                <ColumnChart
                    type='Hard skills'
                    value={dataHard}
                    colors={[
                        'linear-gradient(90deg, rgba(235, 72, 105, 0.25) 0%, rgba(235, 72, 105, 0.3) 25%, rgba(235, 72, 105, 0.35) 50%, rgba(235, 72, 105, 0.45) 75%)']}
                    maxY={5}
                    width={309}
                    height={386}
                    style={styles.graphic}
                />}
                {dataSoft && <ColumnChart
                    type='Soft skills'
                    value={dataSoft}
                    colors={[
                        'linear-gradient(90deg, rgba(70, 135, 255, 0.25) 0%, rgba(70, 135, 255, 0.3) 25%, rgba(70, 135, 255, 0.35) 50%, rgba(70, 135, 255, 0.45) 75%)']}
                    maxY={5}
                    width={309}
                    height={386}
                />}
                {dataAccordanceFactor && <ColumnChart
                    type='Коэфициент соответствия'
                    value={dataAccordanceFactor}
                    colors={[
                        'linear-gradient(90deg, rgba(181, 147, 252, 0.25) 0%, rgba(181, 147, 252, 0.3) 25%, rgba(181, 147, 252, 0.35) 50%, rgba(181, 147, 252, 0.45) 76.5%)']}
                    maxY={1}
                    width={309}
                    height={386}
                />}
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