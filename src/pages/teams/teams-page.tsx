import Header from '../../components/header/header';
import styles from './teams-page.module.css';

function TeamsPage() {
    return (
        <div className={styles.content}>
            <Header isAuth={true} isNotifications={true} />
        </div>
    );
}

export default TeamsPage;