import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login-page.module.css';

function LoginPage() {
    const navigate = useNavigate();

    const [ loginValue, setloginValue ] = useState<string>('');
    const [ passwordValue, setPasswordValue ] = useState<string>('');
    // const [ passwordShown, setPasswordShown ] = useState<boolean>(true);
    
    function onSubmit(e: FormEvent) {
        e.preventDefault();
        console.log('submit');
        navigate('/teams');
    }

    return (
        <div className={styles.content}>
            <form className={styles.form} onSubmit={e => onSubmit(e)}>
                <h3 className={styles.title}>Авторизация</h3>
                <div className={styles.inputs}>
                    <label className={styles.label}>Логин
                        <input
                            className={styles.input}
                            type='text'
                            placeholder='Введите логин или адрес эл.почты'
                            onChange={(e) => setloginValue(e.target.value)}
                            value={loginValue}
                            name={'login'}
                        />
                    </label>
                    <label className={styles.label}>Пароль
                        <input
                            className={styles.input}
                            type='password'
                            placeholder='Введите пароль'
                            onChange={(e) => setPasswordValue(e.target.value)}
                            value={passwordValue}
                            name={'password'}
                        />
                    </label>
                </div>
                <button className={styles.button} type='submit' disabled={!loginValue || !passwordValue} >Войти</button>
            </form>
        </div>
    );
}

export default LoginPage;