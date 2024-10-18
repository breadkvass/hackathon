import { FC } from 'react';
import InfoIcon from '../icons/infoIcon/infoIcon';
import BadgeIcon from '../icons/badgeIcon/badgeIcon';
import styles from './summaryContainer.module.css';

type SummaryContainerProps = {
    numberResult?: number;
    textResult?: string;
    type: string;
    factor: boolean;
    style?: string;
}

const SummaryContainer: FC<SummaryContainerProps> = ({numberResult, textResult, type, factor, style}) => {
    return (
        <div className={styles.container}>
            { !factor
            ? 
            <p className={styles.number}>{textResult}</p>
            :
            <div className={styles.summary}>
                <BadgeIcon style={styles.margin + ' ' + style}/>
                <p className={styles.number}>{numberResult}</p>
                <InfoIcon />
            </div>
            }
            <p className={styles.type}>{type}</p>
        </div>
    )
}

export default SummaryContainer;