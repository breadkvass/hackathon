import { useState } from 'react';
import CaretUp from '../icons/caretUp/caretUp';
import styles from './assistant.module.css';
import AvatarAssistant from '../../assets/images/avatar-assistant.svg';
import CaretDown from '../icons/caretDown/caretDown';
import ArrowUp from '../icons/arrowUp/arrowUp';

const Assistant = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ inputValue, setInputValue ] = useState('');

    return (
        <div className={styles.assistant}>
            <div className={styles.header}>
                <h3 className={styles.title}>Ассистент</h3>
                <button onClick={() => setIsOpen(!isOpen)}>
                    {!isOpen ? <CaretUp /> : <CaretDown />} 
                </button>
            </div>
            {isOpen && 
            <div className={styles.chat}>
                <div className={styles.messages}>
                    <p className={styles.date}>1 октября</p>
                    <div className={styles.userMessage}>
                        <p className={styles.userDate}>12:34</p>
                        <p className={styles.userText}>Какой bus factor у команды Core?</p>
                    </div>
                    <div className={styles.assistMessage}>
                        <img className={styles.assistAvatar} src={AvatarAssistant} />
                        <p className={styles.assistText}>Привет, Екатерина! Bus factor у команды Core равен 6.</p>
                        <p className={styles.assistDate}>12:34</p>
                    </div>
                </div>
                <label className={styles.texting}>
                    <input
                        className={inputValue ? styles.input + ' ' + styles.inputValue : styles.input}
                        placeholder='Написать сообщение'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    {inputValue &&
                    <button className={styles.send}>
                        <ArrowUp />
                    </button>}
                </label>
            </div>}
        </div>
    )
}

export default Assistant;