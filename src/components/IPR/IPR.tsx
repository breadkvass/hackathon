import { Select } from 'antd';
import UnWrap from '../icons/unWrap/unWrap';
import styles from './IPR.module.css';

const IPR = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    
    return (
        <div className={styles.ipr}>
            <div className={styles.selects}>
                <Select
                    suffixIcon={<UnWrap />}
                    className={styles.dropdown}
                    onChange={handleChange}
                    placeholder='Год'
                    options={[
                        { value: '1', label: '2024' },
                        { value: '2', label: '2023' }
                    ]}
                />
                <Select
                    suffixIcon={<UnWrap />}
                    className={styles.dropdown}
                    onChange={handleChange}
                    placeholder='Квартал'
                    options={[
                        { value: '1', label: '1 квартал' },
                        { value: '2', label: '2 квартал' },
                        { value: '3', label: '3 квартал' },
                        { value: '4', label: '4 квартал' },
                    ]}
                />
            </div>
            <div className={styles.year}>
                <h3 className={styles.title}>2024 год</h3>
                <div className={styles.rows}>
                    <div className={styles.row}>
                        <p className={styles.kvartal}>4 квартал</p>
                        <p className={styles.status + ' ' + styles.create}>Создать</p>
                        <UnWrap />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.kvartal}>3 квартал</p>
                        <p className={styles.status + ' ' + styles.result}>Пройдено</p>
                        <UnWrap />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.kvartal}>2 квартал</p>
                        <p className={styles.status + ' ' + styles.result}>Пройдено</p>
                        <UnWrap />
                    </div>
                    <div className={styles.row}>
                        <p className={styles.kvartal}>1 квартал</p>
                        <p className={styles.status + ' ' + styles.result}>Пройдено</p>
                        <UnWrap />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default IPR;