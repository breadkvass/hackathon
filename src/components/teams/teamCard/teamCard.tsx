import { FC } from 'react';
import TeamSummary from '../teamSummary/teamSummary';
import styles from './teamCard.module.css';
import { Employee } from '../../../utils/types';

type TeamCardProps = {
    team: Team;
}

type Team = {
    name: string;
    stress_level: number;
    employee_count: number;
    average_hard_skills: string;
    average_soft_skills: string;
    bus_factor: number;
    employees: Employee[];
}

const TeamCard: FC<TeamCardProps> = ({team}) => {
    const busFactor = team.employees.filter(employee => employee.bus_factor === true).length;

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{team.name}</h3>
            <div className={styles.info}>
                <TeamSummary number={team.employee_count} type='сотрудников' />
                <TeamSummary number={busFactor} type='Bus factor' />
                <TeamSummary number={team.stress_level} type='Коэф. стресса' />
                <TeamSummary number={team.average_hard_skills} type='Hard skills' />
                <TeamSummary number={team.average_soft_skills} type='Soft Skills' />
            </div>
        </div>
    )
}

export default TeamCard