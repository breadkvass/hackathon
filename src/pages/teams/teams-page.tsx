import Layout from '../../components/layout/layout';
import Header from '../../components/header/header';
import TabMenu from '../../components/tabMenu/tabMenu';
import styles from './teams-page.module.css';

function TeamsPage() {
    return (
        <Layout>
            <Header isAuth={true} isNotifications={true} />
            <div className={styles.content}>
                <TabMenu />
                <div className={styles.info}>
                    
                </div>
            </div>
        </Layout>
    );
}

export default TeamsPage;