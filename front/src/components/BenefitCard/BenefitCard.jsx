import checkIcon from '../../assets/checkicon.svg'
import styles from './BenefitCard.module.css'

export default function BenefitCard({title, content}) {
    return(
        <div className={styles['CardBody']}>
            <div className={styles['CardHead']}>
                <img src={checkIcon} alt="" />
                <h4>{title}</h4>
            </div>
            <p>{content}</p>
        </div>
    )
}