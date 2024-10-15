import { FC, useContext } from 'react';
import { Input } from "antd";
import { Tabs } from 'antd';
import { Select } from 'antd';
import { dataSource, dataColumns } from '../../../data/dataEmployees';
import { EmployeesContext } from '../../../utils/employeesContext';
import SearchIcon from '../../icons/loupe/loupe';
import UnWrap from '../../icons/unWrap/unWrap';
import TableComponent from '../../table/table';
import SummaryContainer from '../../summaryContainer/summaryContainer';
import EmployeeAssessment from '../employeeAssessment/employeeAssessment';
import EmployeeAnalytics from '../employeeAnalytics/employeeAnalytics';
import IPR from '../../IPR/IPR';
import styles from './employeesInfo.module.css';

type SelectedEmplyeeInfoProps = {
    selectedEmployee: string;
}

type EmployessInfoProps = {
    selectedInfo: string;
}

const EmployessInfo: FC<EmployessInfoProps> = ({selectedInfo}) => {
    return (
        <>
        {!selectedInfo ? <AllEmployeesInfo /> : <SelectedEmployeeInfo selectedEmployee={selectedInfo} />}
        </>
    )
}

const AllEmployeesInfo = () => {
    const [ employees ] = useContext(EmployeesContext);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    
    return (

        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>Сотрудники</h1>
                    <p className={styles.sum}>100</p>
                </div>
                <div className={styles.filter}>
                    <Input className={styles.search} placeholder="Поиск" prefix={<SearchIcon />} />
                    <Select
                        suffixIcon={<UnWrap />}
                        className={styles.dropdown}
                        onChange={handleChange}
                        placeholder='Команда'
                        options={[
                            { value: '1', label: 'Медиа' },
                            { value: '2', label: 'ФЛ' },
                            { value: '3', label: 'ЮЛ' },
                        ]}
                    />
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
                </div>
            </div>
            <div className={styles.table}>
                <TableComponent data={dataSource} columns={dataColumns}/>
            </div>
        </div>
    )
}

const SelectedEmployeeInfo: FC<SelectedEmplyeeInfoProps> = ({selectedEmployee}) => {
    const tabList = [
        {
          key: "1",
          label: "Аналитика",
          children: <EmployeeAnalytics />,
        },
        {
          key: "2",
          label: "Оценка",
          children: <EmployeeAssessment />,
        },
        {
            key: "3",
            label: "ИПР",
            children: <IPR />,
          },
      ];
    
    return (
        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{selectedEmployee}</h1>
                </div>
                <div className={styles.summary}>
                    <SummaryContainer result={'Дизайнер'} type='Должность' factor={false}/>
                    <SummaryContainer result={'Middle'} type='Грейд' factor={false}/>
                    <SummaryContainer result={1.0} type='Коэф. стресса' factor={true}/>
                    <SummaryContainer result={1.0} type='Коэф. соответствия' factor={true}/>
                </div>
            </div>
            <div className={styles.charts}>
                <Tabs
                    defaultActiveKey="1"
                    style={{ width: "100%" }}
                    items={tabList}
                />
            </div>
        </div>
    )
}

export default EmployessInfo;