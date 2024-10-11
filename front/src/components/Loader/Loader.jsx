import styles from './Loader.module.css'

export default function Loader (){
    return(
        <div className={styles['LoaderBody']}>
            <div className={styles['LoaderIcon']}></div>
        </div>
    )
}