import { Select } from 'antd';
import UnWrapIcon from '../icons/unWrapIcon/unWrapIcon';
import styles from './IPR.module.css';
import { Employee } from '../../utils/types';
import { FC, useState } from 'react';

type IPRProps = {
    employee?: Employee
}

const IPR: FC<IPRProps> = ({employee}) => {
    const [ year, setYear ] = useState();
    const [ kvartal, setKvartal ] = useState();
    
    console.log('Сотрудник:', employee);
    console.log('Выбранный год:', year);
    console.log('Выбранный квартал:', kvartal);
    return (
        <div className={styles.ipr}>
            <div className={styles.selects}>
                <Select
                    suffixIcon={<UnWrapIcon />}
                    className={styles.dropdown}
                    onChange={(value) => setYear(value)}
                    placeholder='Год'
                    options={[
                        { value: '2024', label: '2024' },
                        { value: '2023', label: '2023' }
                    ]}
                />
                <Select
                    suffixIcon={<UnWrapIcon />}
                    className={styles.dropdown}
                    onChange={(value) => setKvartal(value)}
                    placeholder='Квартал'
                    options={[
                        { value: '1 кв', label: '1 кв' },
                        { value: '2 кв', label: '2 кв' },
                        { value: '3 кв', label: '3 кв' },
                        { value: '4 кв', label: '4 кв' },
                    ]}
                />
            </div>
            <div className={styles.year}>
                <h3 className={styles.title}>2024 год</h3>
                <div className={styles.rows}>
                    <div className={styles.row}>
                        <p className={styles.kvartal}>4 квартал</p>
                        <p className={styles.status + ' ' + styles.create}>Создать</p>
                        <UnWrapIcon />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.kvartal}>3 квартал</p>
                        <p className={styles.status + ' ' + styles.result}>Пройдено</p>
                        <UnWrapIcon />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.kvartal}>2 квартал</p>
                        <p className={styles.status + ' ' + styles.result}>Пройдено</p>
                        <UnWrapIcon />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.kvartal}>1 квартал</p>
                        <p className={styles.status + ' ' + styles.result}>Пройдено</p>
                        <UnWrapIcon />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default IPR;