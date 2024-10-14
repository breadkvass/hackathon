import { FC } from 'react';
import TeamSummary from '../teamSummary/teamSummary';
import styles from './teamCard.module.css';

type TeamCardProps = {
    team: Team;
}

type Team = {
    name: string,
    stress_level: number,
    employee_count: number,
    average_hard_skills: string,
    average_soft_skills: string,
    bus_factor: number
}

const TeamCard: FC<TeamCardProps> = ({team}) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{team.name}</h3>
            <div className={styles.info}>
                <TeamSummary number={team.employee_count} type='сотрудников' />
                <TeamSummary number={team.bus_factor ? 1 : 0} type='Bus factor' />
                <TeamSummary number={team.stress_level} type='Коэф. стресса' />
                <TeamSummary number={team.average_hard_skills} type='Hard skills' />
                <TeamSummary number={team.average_soft_skills} type='Soft Skills' />
            </div>
        </div>
    )
}

export default TeamCard