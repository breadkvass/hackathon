import { Switch } from 'antd';
import Avatar from '../../assets/images/avatar.jpeg';
import Pencil from '../icons/pencil/pencil';
import styles from './profileInfo.module.css';
import UnWrap from '../icons/unWrap/unWrap';

const ProfileInfo = () => {
    
    return (
        <div className={styles.profile}>
            <div className={styles.desc}>
                <h1 className={styles.title}>Профиль</h1>
                <div className={styles.summary}>
                    <div className={styles.avatar}>
                        <img className={styles.photo} src={Avatar} />
                        <button className={styles.changeAvatar}>
                            <Pencil />
                            Изменить фото
                        </button>
                    </div>
                    <div className={styles.personal}>
                        <h3 className={styles.name}>Екатерина Смирнова</h3>
                        <p className={styles.job}>Руководитель</p>
                        <div className={styles.tags}>
                            <p className={styles.tag}>Департамент разработки</p>
                            <p className={styles.tag}>Удалённо</p>
                        </div>
                    </div>
                </div>
                <div className={styles.container}>
                    <h2 className={styles.title2}>Общая информация</h2>
                    <div className={styles.inputs}>
                        <label className={styles.label}>
                            <p className={styles.type}>Номер телефона</p>
                            <input disabled placeholder='+7 914 569 45-72'/>
                        </label>
                        <label className={styles.label}>
                            <p className={styles.type}>E-mail</p>
                            <input disabled placeholder='smirnova.ek@rb.ru'/>
                        </label>
                        <label className={styles.label}>
                            <p className={styles.type}>Часовой пояс</p>
                            <input disabled placeholder='MSK+1'/>
                        </label>
                        <label className={styles.label}>
                            <p className={styles.type}>Дата рождения</p>
                            <input disabled placeholder='07.05.1985'/>
                        </label>
                    </div>
                </div>
                <div className={styles.container}>
                    <h2 className={styles.title2}>Безопасность</h2>
                    <div className={styles.inputs}>
                        <label className={styles.label}>
                            <p className={styles.type}>Логин</p>
                            <input disabled placeholder='smirnova.ek@rb.ru'/>
                        </label>
                        <label className={styles.label}>
                            <p className={styles.type}>Пароль</p>
                            <input type='password' disabled placeholder='********'/>
                        </label>
                        <label className={styles.label}>
                            <p className={styles.type}>Привязанные устройства</p>
                            <input disabled placeholder='IP-123498'/>
                        </label>
                        <label className={styles.label}>
                            <p className={styles.type}>Сброс пароля</p>
                            <input disabled placeholder='по СМС'/>
                        </label>
                    </div>
                </div>
                <div className={styles.container}>
                    <h2 className={styles.title2}>Уведомления</h2>
                    <div className={styles.notifications}>
                        <div className={styles.notification}>
                            <p className={styles.notificationType}>Включить онбординг</p>
                            <Switch />
                        </div>
                        <div className={styles.notification}>
                            <p className={styles.notificationType}>Включить пуш-уведомления</p>
                            <Switch defaultChecked />
                        </div>
                        <div className={styles.notification}>
                            <p className={styles.notificationType}>Время уведомлений</p>
                            <p className={styles.parameter}>с 8:00 до 16:00</p>
                            <UnWrap />
                        </div>
                        <div className={styles.notification}>
                            <p className={styles.notificationType}>Синхрозировать с календарем</p>
                            <Switch defaultChecked />
                        </div>
                        <div className={styles.notification}>
                            <p className={styles.notificationType}>Сообщать об увеличении bus фактор</p>
                            <Switch defaultChecked />
                        </div>
                        <div className={styles.notification}>
                            <p className={styles.notificationType}>Сообщать о коэф. стресса в команде</p>
                            <p className={styles.parameter}>выше 2.5</p>
                            <UnWrap />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;