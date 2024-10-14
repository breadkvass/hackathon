import { Select } from 'antd';
import TableComponent from '../table/table';
import { dataColumns, dataSource } from '../../data/teamEmployees';
import UnWrap from '../icons/unWrap/unWrap';
import styles from './teamEmployees.module.css';
import Plus from '../icons/plus/plus';

const TeamEmployees = () => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className={styles.analytics}>
            <div className={styles.top}>
                <Select 
                    suffixIcon={<UnWrap />}
                    className={styles.dropdown}
                    onChange={handleChange}
                    placeholder='Должность'
                    options={[
                        { value: '1', label: 'Дизайнер' },
                        { value: '2', label: 'Бизнес-аналитик' },
                        { value: '3', label: 'Разработчик' },
                    ]}
                />
                <button className={styles.add}>
                    <Plus />
                    Добавить сотрудника
                </button>
            </div>
            <div className={styles.table}>
                <TableComponent data={dataSource} columns={dataColumns}/>
            </div>
        </div>
    )
}

export default TeamEmployees;