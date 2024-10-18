import { FC } from 'react';
import InfoIcon from '../icons/infoIcon/infoIcon';
import BadgeIcon from '../icons/badgeIcon/badgeIcon';
import styles from './summaryContainer.module.css';

type SummaryContainerProps = {
    result?: number | string;
    type: string;
    factor: boolean;
}

const SummaryContainer: FC<SummaryContainerProps> = ({result, type, factor}) => {
    return (
        <div className={styles.container}>
            { !factor
            ? 
            <p className={styles.number}>{result}</p>
            :
            <div className={styles.summary}>
                <BadgeIcon style={styles.margin}/>
                <p className={styles.number}>{result}</p>
                <InfoIcon />
            </div>
            }
            <p className={styles.type}>{type}</p>
        </div>
    )
}

export default SummaryContainer;