import { useState, FormEvent, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/api';
import Header from '../../components/header/header';
import EyeIcon from '../../assets/images/icons/eye-slash.svg';
import styles from './loginPage.module.css';

function LoginPage() {
    const navigate = useNavigate();

    const [ emailValue, setEmailValue ] = useState<string>('');
    const [ passwordValue, setPasswordValue ] = useState<string>('');
    const [ passwordShown, setPasswordShown ] = useState<boolean>(true);
    
    const inputType = passwordShown ? 'password' : 'text';

    const [inputsErrors, setinputsErrors] = useState({
        email: '',
        password: '',
    });

    const [ isValid, setIsValid ] = useState(true);


    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value);
        const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!validEmail.test(String(e.target.value))) {
            setinputsErrors({ ...inputsErrors, email: 'Некорректный e-mail' })
        } else {
            setinputsErrors({ ...inputsErrors, email: '' })
        }
    }

    const passwordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
        const validPasswordLength = 8;
        if (e.target.value.length < validPasswordLength) {
            setinputsErrors({ ...inputsErrors, password: 'Введите не менее 8 символов' })
        } else {
            setinputsErrors({ ...inputsErrors, password: '' })
        }
    }

    const onSubmitHandler = async (e: FormEvent) => {
        e.stopPropagation();
        e.preventDefault();
        await loginUser(emailValue, passwordValue);
        navigate('/teams');
    }

    useEffect(() => {
        if (!emailValue || !passwordValue || inputsErrors.email || inputsErrors.password) {
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }, [passwordValue, emailValue]);


    return (
        <div className={styles.content}>
            <Header isAuth={false}/>
            <form className={styles.form} onSubmit={e => onSubmitHandler(e)}>
                <h3 className={styles.title}>Авторизация</h3>
                <div className={styles.inputs}>
                    <label className={styles.label}>Логин
                        <input
                            className={styles.input}
                            type='email'
                            placeholder='Введите эл.почту'
                            onChange={(e) => emailHandler(e)}
                            value={emailValue}
                            name={'login'}
                        />
                        {inputsErrors.email && <p className={styles.error}>{inputsErrors.email}</p>}
                    </label>
                    <label className={styles.label}>Пароль
                        <input
                            className={styles.input}
                            type={inputType}
                            placeholder='Введите пароль'
                            onChange={(e) => passwordHandler(e)}
                            value={passwordValue}
                            name={'password'}
                        />
                        <img className={styles.icon} src={EyeIcon} onClick={() => setPasswordShown(!passwordShown)} />
                        {inputsErrors.password && <p className={styles.error}>{inputsErrors.password}</p>}
                    </label>
                </div>
                <button className={styles.button} type='submit' disabled={!isValid ? true : false} >Войти</button>
                <p className={styles.info}>Если у Вас нет доступа или вы забыли пароль, пожалуйста, обратитесь в HR-менеджеру</p>
            </form>
        </div>
    );
}

export default LoginPage;