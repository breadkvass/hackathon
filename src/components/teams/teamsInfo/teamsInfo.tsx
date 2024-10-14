import { FC } from 'react';
import { Tabs } from 'antd';
import Plus from '../../icons/plus/plus';
import SummaryContainer from '../../summaryContainer/summaryContainer';
import TeamCard from '../teamCard/teamCard';
import TeamAnalytics from '../teamAnalytics/teamAnalytics';
import TeamEmployees from '../teamEmployees/teamEmployees';
import styles from './teamsInfo.module.css';

type CheckedTeamInfoProps = {
    checkedTeam: string;
}

type TeamsInfoProps = {
    checkedInfo: string;
}

const TeamsInfo: FC<TeamsInfoProps> = ({checkedInfo}) => {
    return (
        <>
        {!checkedInfo ? <AllTeamsInfo /> : <CheckedTeamInfo checkedTeam={checkedInfo} />}
        </>
    )
}

const AllTeamsInfo = () => {

    return (
        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>Команды</h1>
                    <button className={styles.create}>
                        <Plus />
                        Создать команду
                    </button>
                </div>
                <div className={styles.summary}>
                    <SummaryContainer result={6} type='команд' factor={false} />
                    <SummaryContainer result={100} type='сотрудников' factor={false} />
                </div>
            </div>
            <div className={styles.cards}>
                <TeamCard />
                <TeamCard />
                <TeamCard />
                <TeamCard />
                <TeamCard />
                <TeamCard />
            </div>
        </div>
    )
}

const CheckedTeamInfo: FC<CheckedTeamInfoProps> = ({checkedTeam}) => {
    const tabList = [
        {
          key: "1",
          label: "Аналитика",
          children:
            <TeamAnalytics />,
        },
        {
          key: "2",
          label: "График обучения сотрудников",
          children: <>График обучения сотрудников</>,
        },
        {
            key: "3",
            label: "Сотрудники",
            children: <TeamEmployees />,
          },
      ];
    
    return (
        <div className={styles.info}>
            <div className={styles.desc}>
                <div className={styles.top}>
                    <h1 className={styles.title}>{checkedTeam}</h1>
                </div>
                <div className={styles.summary}>
                    <SummaryContainer result={16} type='Количество сотрудников' factor={false}/>
                    <SummaryContainer result={4.31} type='Средняя оценка команды' factor={true}/>
                    <SummaryContainer result={4.29} type='Soft Skills' factor={true}/>
                    <SummaryContainer result={4.29} type='Hard Skills' factor={true}/>
                    <SummaryContainer result={7} type='Bus factor' factor={true}/>
                    <SummaryContainer result={2.03} type='Коэффициент стресса средний' factor={true}/>
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

export default TeamsInfo;