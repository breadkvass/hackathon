import { FC } from 'react';
import styles from './teamSummary.module.css';

type TeamSummaryProps = {
    number: string | number;
    type: string;
}

const TeamSummary: FC<TeamSummaryProps> = ({number, type}) => {
    return (
        <div className={styles.block}>
            <p className={styles.result}>{number}</p>
            <p className={styles.type}>{type}</p>
        </div>
    )
}

export default TeamSummary;