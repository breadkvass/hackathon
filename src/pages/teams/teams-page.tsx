import { ChangeEvent, FC, useState } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import TabMenu from '../../components/tabMenu/tabMenu';
import Plus from '../../components/icons/plus/plus';
import TeamsSummaryContainer from '../../components/teamsSummaryContainer/teamsSummaryContainer';
import TeamCard from '../../components/teamCard/teamCard';
import Analytics from '../../components/analytics/analytics';
import styles from './teams-page.module.css';

type CheckedTeamInfoProps = {
    checkedTeam: string;
}

const TeamsPage = () => {

    const [ checkedTab, setCheckedTab ]= useState<'teams' | 'employees'>('teams');
    const [ checkedInfo, setCheckedInfo ] = useState('');

    const setChecked = (e: ChangeEvent<HTMLButtonElement>) => {
        if (checkedTab !== e.target.name) {
            setCheckedTab(e.target.name as 'teams' | 'employees');
            console.log(checkedTab);
        };
    }

    const checkInfo = (e: ChangeEvent<HTMLButtonElement>) => {
        setCheckedInfo(e.target.textContent as string);
    }

    const info = () => {
        if (checkedTab === 'teams') {
            return !checkedInfo ? <AllTeamsInfo /> : <CheckedTeamInfo checkedTeam={checkedInfo} />
        } else if (checkedTab === 'employees') {
            return !checkedInfo ? <>Все сотрудники</> : <>Выбранный сотрудник</>
        } else {
            return <>Ошибка</>
        }
    }

    console.log(checkedTab);

    return (
        <Layout>
            <Header isAuth={true} isNotifications={true} />
            <div className={styles.content}>
                <TabMenu
                    onTabClickHandler={(e: any) => setChecked(e)}
                    onItemClickHandler={(e: any) => checkInfo(e)}
                    checkedTab={checkedTab}
                />
                {info()}
            </div>
        </Layout>
    );
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
                    <TeamsSummaryContainer number={6} type='команд' factor={false} />
                    <TeamsSummaryContainer number={100} type='сотрудников' factor={false} />
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
            <Analytics />,
        },
        {
          key: "2",
          label: "График обучения сотрудников",
          children: <>График обучения сотрудников</>,
        },
        {
            key: "3",
            label: "Сотрудники",
            children: <>Сотрудники</>,
          },
      ];
    
    return (
        <div className={styles.info}>
            <div className={styles.desc}>
                <h1 className={styles.title}>{checkedTeam}</h1>
                <div className={styles.summary}>
                    <TeamsSummaryContainer number={16} type='Количество сотрудников' factor={false}/>
                    <TeamsSummaryContainer number={4.31} type='Средняя оценка команды' factor={true}/>
                    <TeamsSummaryContainer number={4.29} type='Soft Skills' factor={true}/>
                    <TeamsSummaryContainer number={4.29} type='Hard Skills' factor={true}/>
                    <TeamsSummaryContainer number={7} type='Bus factor' factor={true}/>
                    <TeamsSummaryContainer number={2.03} type='Коэффициент стресса средний' factor={true}/>
                </div>
            </div>
            <div className={styles.charts}>
                <ConfigProvider
                    theme={{
                        token: {
                            colorPrimary: "#42434B",
                            fontFamily: "Manrope",
                            fontSize: 16,
                            lineHeight: 1.5,
                        },
                        components: {
                            Tabs: {
                                inkBarColor: "#E10D34",
                                itemHoverColor: "#42434B",
                                itemSelectedColor: "#42434B",
                                itemColor: "#86878C",
                                cardHeight: "42px"
                            }
                        }
                    }}
                >
                    <Tabs
                        defaultActiveKey="1"
                        style={{ width: "100%" }}
                        items={tabList}
                    />
                </ConfigProvider>
            </div>
        </div>
    )
}


export default TeamsPage;