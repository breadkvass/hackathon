import { FC } from 'react';
// import Info from '../../assets/images/icons/info.svg';
import Info from '../icons/info/info';
import Badge from '../icons/badge/badge';
import styles from './teamsSummaryContainer.module.css';

type TeamsSummaryContainerProps = {
    number: number;
    type: string;
    factor: boolean;
}

const TeamsSummaryContainer: FC<TeamsSummaryContainerProps> = ({number, type, factor}) => {
    return (
        <div className={styles.container}>
            { !factor
            ? 
            <p className={styles.number}>{number}</p>
            :
            <div className={styles.summary}>
                <Badge style={styles.margin}/>
                <p className={styles.number}>{number}</p>
                <Info />
            </div>
            }
            <p className={styles.type}>{type}</p>
        </div>
    )
}

export default TeamsSummaryContainer;