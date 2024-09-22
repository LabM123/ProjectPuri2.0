import { useState } from 'react';
import styles from './FAQItem.module.css'
import dropDownIcon from '../../assets/dropdownicon.svg'

export default function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${styles['FAQItemBody']} ${isOpen ? styles['open'] : ''}`} onClick={toggleOpen}>
            <div className={styles['FAQItemHead']}>
                <h4>{question}</h4>
                <img src={dropDownIcon} alt="" className={isOpen ? styles['IconReversed'] : ''}/>
            </div>
            <div className={`${styles['answer']} ${isOpen ? styles['show'] : ''}`}>
            {answer}
            </div>
        </div>
    );
}