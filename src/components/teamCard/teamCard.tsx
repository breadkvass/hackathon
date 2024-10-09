import TeamSummary from '../teamSummary/teamSummary';
import styles from './teamCard.module.css';

const TeamCard = () => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Медиа</h3>
            <div className={styles.info}>
                <TeamSummary number={16} type='сотрудников' />
                <TeamSummary number={7} type='Bus factor' />
                <TeamSummary number={2.03} type='Коэф. стресса' />
                <TeamSummary number={4.29} type='Hard skills' />
                <TeamSummary number={16} type='Soft Skills' />
            </div>
        </div>
    )
}

export default TeamCard