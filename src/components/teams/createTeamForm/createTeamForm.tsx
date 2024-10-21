import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { EmployeesContext } from '../../../utils/employeesContext';
import { getEmployees } from '../../../utils/api';
import Layout from '../../layout/layout';
import Header from '../../header/header';
import Sidebar from '../../sidebar/sidebar';
import StepperLine from '../../icons/stepperLine/stepperLine';
import { CreationTeamContextProvider } from '../../../utils/creationTeamContext';
import CreationTeamStepOne from './creationTeamStepOne/creationTeamStepOne';
import styles from './createTeamForm.module.css';
import CreationTeamStepTwo from './creationTeamStepTwo/creationTeamStepTwo';

const CreateTeamPage = () => {
    const navigate = useNavigate();
    const [ , setEmployees ] = useContext(EmployeesContext);
    const [ selectedTab, setSelectedTab ]= useState<'teams' | 'employees'>('teams');
    const [ selectedInfo, setSelectedInfo ] = useState('');
    const [ selectedStepTwo, isSelectedStepTwo ] = useState(false);

    const stepTwoStyles = !selectedStepTwo ? styles.nonSelected : styles.selectedStep;

    const setSelected = (tab: 'teams' | 'employees') => {
        setSelectedTab(tab);
        setSelectedInfo('');
        navigate(`/${tab}`);
    }

    const checkInfo = (e: ChangeEvent<HTMLButtonElement>) => {
        if (selectedInfo !== e.target.textContent) {
            setSelectedInfo('');
        }
    }

    useEffect(() => {
        getEmployees()
        .then(res => setEmployees(res.results));
    },[])

    return (
        <CreationTeamContextProvider>
            <Layout>
                <Header isAuth={true} isNotifications={true} />
                <div className={styles.content}>
                    <Sidebar
                        onTeamsClickHandler={() => setSelected('teams')}
                        onEmployeesClickHandler={() => setSelected('employees')}
                        onItemClickHandler={(e: any) => checkInfo(e)}
                        selectedTab={selectedTab}
                        employee={selectedTab}
                    />
                    <div className={styles.info}>
                        <div className={styles.desc}>
                            <div className={styles.top}>
                                <h1 className={styles.title}>Создание команды</h1>
                                <div className={styles.stepper}>
                                    <div className={styles.step + ' ' + styles.selectedStep}>
                                        <button className={styles.stepButton} onClick={() => isSelectedStepTwo(false)}>
                                            1
                                        </button>
                                        <StepperLine />
                                    </div>
                                    <div className={styles.step + ' ' + stepTwoStyles}>
                                        <StepperLine />
                                        <button className={styles.stepButton} onClick={() => isSelectedStepTwo(true)}>
                                            2
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {!selectedStepTwo ?
                                <CreationTeamStepOne selectStepTwo={() => isSelectedStepTwo(true)} /> :
                                <CreationTeamStepTwo backToStepOne={() => isSelectedStepTwo(false)}/>}
                        </div>
                    </div>
                </div>
            </Layout>
        </CreationTeamContextProvider>
    )
}




export default CreateTeamPage;