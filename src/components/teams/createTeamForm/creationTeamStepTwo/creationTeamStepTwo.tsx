import { FC, FormEvent, useContext, useState } from 'react';
import { CreationTeamContext } from '../../../../utils/creationTeamContext';
import { EmployeesContext } from '../../../../utils/employeesContext';
import styles from './creationTeamStepTwo.module.css';
import ArrowLeftIcon from '../../../icons/arrowLeftIcon/arrowLeftIcon';
import { Select } from 'antd';
import UnWrapIcon from '../../../icons/unWrapIcon/unWrapIcon';
import { DefaultOptionType } from 'antd/es/select';
import SummaryContainer from '../../../summaryContainer/summaryContainer';

type SecondStepProps = {
    backToStepOne: any;
}

const CreationTeamStepTwo: FC<SecondStepProps> = ({backToStepOne}) => {
    const [ , { setTeamName, setTeamLeadId } ] = useContext(CreationTeamContext);
    const [ employees ] = useContext(EmployeesContext);
    const [ teamNameValue, setTeamNameValue ] = useState('');
    const [ selectedTeamLead, setSelectedTeamLead ] = useState<DefaultOptionType>();

    const selectedTeamId = selectedTeamLead?.id

    const handleChange =  (_:string, option: DefaultOptionType) => {
        setSelectedTeamLead(option);
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setTeamName(teamNameValue);
        setTeamLeadId(selectedTeamId);
    }

    const onClickPreviousHandler = () => {
        backToStepOne();
    }

    const employeesOptions = employees.map(employee => {
        const employeeOption = {
            value: employee.last_name + ' ' + employee.first_name,
            id: employee.id
        }
        return employeeOption;
    })

    return (
        <div className={styles.container}>
            <form className={styles.firstForm}>
                <div className={styles.stepDescription}>
                    <p className={styles.text}>Дайте название вашей команде и выберите тимлида</p>
                    <div className={styles.buttons}>
                        <button className={styles.previous} onClick={() => onClickPreviousHandler}>
                            <ArrowLeftIcon />
                            Назад
                        </button>
                        <button onClick={e => onSubmitHandler(e)} className={styles.submit} disabled={!teamNameValue}>Создать</button>
                    </div>
                </div>
                <div className={styles.team}>
                    <div className={styles.inputs}>
                        <label className={styles.label}>Название команды
                            <input className={styles.input}
                                type='text'
                                placeholder='Команда'
                                onChange={(e) => setTeamNameValue(e.target.value)}
                                value={teamNameValue}
                                name={'password'}
                            />
                        </label>
                        <label className={styles.label}>Выбрать тимлида
                            <Select
                                suffixIcon={<UnWrapIcon />}
                                style={{ width: '100%', height: "48px" }}
                                onChange={handleChange}
                                placeholder='Сотрудник'
                                options={employeesOptions}
                            />
                        </label>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.characteristic}>Хакартеристика собранной команды</p>
                        <div className={styles.containers}>
                            <SummaryContainer result={16} type='Количество сотрудников' factor={false} />
                            <SummaryContainer style={styles.green} numberResult={4.31} type='Средняя оценка команды' factor={true} />
                            <SummaryContainer style={styles.green} numberResult={4.21} type='Hard skills' factor={true} />
                            <SummaryContainer style={styles.green} numberResult={4.28} type='Soft Skills' factor={true} />
                        </div>
                    </div>

                </div>
                
            </form>
            
        </div>
    )
}

export default CreationTeamStepTwo;