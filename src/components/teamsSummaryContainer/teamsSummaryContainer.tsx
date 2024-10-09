import { FC } from 'react';
import styles from './teamsSummaryContainer.module.css';

type TeamsSummaryContainerProps = {
    number: number;
    type: string;
}

const TeamsSummaryContainer: FC<TeamsSummaryContainerProps> = ({number, type}) => {
    return (
        <div className={styles.sumContainer}>
            <p className={styles.number}>{number}</p>
            <p className={styles.type}>{type}</p>
        </div>
    )
}

export default TeamsSummaryContainer;