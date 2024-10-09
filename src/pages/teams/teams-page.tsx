import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import TabMenu from '../../components/tabMenu/tabMenu';
import Plus from '../../components/icons/plus/plus';
import TeamsSummaryContainer from '../../components/teamsSummaryContainer/teamsSummaryContainer';
import styles from './teams-page.module.css';


const TeamsPage = () => {
    return (
        <Layout>
            <Header isAuth={true} isNotifications={true} />
            <div className={styles.content}>
                <TabMenu />
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
                            <TeamsSummaryContainer number={6} type='команд' />
                            <TeamsSummaryContainer number={100} type='сотрудников' />
                            {/* <div className={styles.sumContainer}>
                                <p className={styles.number}>6</p>
                                <p className={styles.type}>команд</p>
                            </div>
                            <div className={styles.sumContainer}>
                                <p className={styles.number}>100</p>
                                <p className={styles.type}>сотрудников</p>
                            </div> */}
                        </div>
                        
                    </div>
                    <div className={styles.filter}>
                        
                    </div>
                    <div className={styles.cards}>
                        
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default TeamsPage;
