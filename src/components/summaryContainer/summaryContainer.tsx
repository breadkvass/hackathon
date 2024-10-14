import { FC } from 'react';
// import Info from '../../assets/images/icons/info.svg';
import Info from '../icons/info/info';
import Badge from '../icons/badge/badge';
import styles from './summaryContainer.module.css';

type SummaryContainerProps = {
    result: number | string;
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
                <Badge style={styles.margin}/>
                <p className={styles.number}>{result}</p>
                <Info />
            </div>
            }
            <p className={styles.type}>{type}</p>
        </div>
    )
}

export default SummaryContainer;