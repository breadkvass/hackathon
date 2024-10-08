import { useState } from 'react';
import Tab from './tab/tab';
import SignOut from '../icons/signOut/signOut';
import styles from './tabMenu.module.css';

const TabMenu = () => {
    const [ checked, setCheckedTeams ]= useState<'teams' | 'employees'>('teams');
    const items = [ 'Медиа', 'Core', 'Приложение', 'ФЛ', 'Эквайринг', 'ЮЛ']
    
    const employees = [ 'Акимов Роберт' ]

    const setChecked = (tab: 'teams' | 'employees') => {
        if (checked !== tab) {
            setCheckedTeams(tab)
        };
    }
    
    return (
        <nav className={styles.sidebar}>
            <ul className={styles.list}>
                <Tab tab={'teams'} items={items} onClickHandler={() => setChecked('teams')} checkedTab={checked} />
                <Tab tab={'employees'} items={employees} onClickHandler={() => setChecked('employees')} checkedTab={checked} />
            </ul>
            <button className={styles.signout}>
                <SignOut />
                Выйти
            </button>

        </nav>
    );
}

export default TabMenu;