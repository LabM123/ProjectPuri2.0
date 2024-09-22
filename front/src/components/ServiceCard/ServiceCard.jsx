import styles from './ServiceCard.module.css'

export default function ServiceCard({image, title, content}) {
    return(
        <div className={styles['CardBody']}>
            <div className={styles['CardHead']}>
                <img src={image} alt="" />
                <h4>{title}</h4>
            </div>
            <p>{content}</p>
        </div>
    )
}