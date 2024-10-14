import { FC } from 'react';
import { Input } from "antd";
import { Tabs } from 'antd';
import {Select} from 'antd';
import SearcIcon from '../icons/loupe/loupe';
import UnWrap from '../icons/unWrap/unWrap';
import TableComponent from '../table/table';
import SummaryContainer from '../summaryContainer/summaryContainer';
import EmployeeAssessment from '../employeeAssessment/employeeAssessment';
import styles from './employeesInfo.module.css';
import EmployeeAnalytics from '../employeeAnalytics/employeeAnalytics';
import { dataColumns, dataSource } from '../../data/dataEmployees';

type CheckedEmplyeeInfoProps = {
    checkedEmployee: string;
}

type EmployessInfoProps = {
    checkedInfo: string;
}

const EmployessInfo: FC<EmployessInfoProps> = ({checkedInfo}) => {
    return (
        <>
        {!checkedInfo ? <AllEmployeesInfo /> : <CheckedEmployeeInfo checkedEmployee={checkedInfo} />}
        </>
    )
}

const AllEmployeesInfo = () => {
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
                    <Input className={styles.search} placeholder="Поиск" prefix={<SearcIcon />} />
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

const CheckedEmployeeInfo: FC<CheckedEmplyeeInfoProps> = ({checkedEmployee}) => {
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
            children: <>ИПР</>,
          },
      ];
    
    return (
        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{checkedEmployee}</h1>
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