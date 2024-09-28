import styles from './Footer.module.css'
import phoneIcon from '../../assets/phoneicon.svg'
import mailIcon from '../../assets/mailicon.svg'
import locationIcon from '../../assets/locationicon.svg'

export default function Footer() {
    return(
        <div className={styles['FooterBody']}>
            <div className={styles['FooterContact']}>
                <h6>Contactanos</h6>
                <div className={styles['FooterContactItem']}>
                    <img src={phoneIcon} alt="" />
                    <a href="tel:+525617095015" target='_blank'>+52 56 1709 5015 </a>
                </div>
                <div className={styles['FooterContactItem']}>
                    <img src={mailIcon} alt="" />
                    <a href="mailto:bcdld@hotmail.com" target='_blank'>bcdld@hotmail.com</a>
                </div>
                <div className={styles['FooterContactItem']}>
                    <img src={locationIcon} alt="" />
                    <a href="https://maps.app.goo.gl/bDa26mNpb3gFPQYs7" target='_blank'>Av. Siervo de la Nacion, Agrup B6, Casa 4, Iztapalapa</a>
                </div>
            </div>
            <div className={styles['FooterSchedule']}>
                <h6>Horario de Atencion</h6>
                <p>Lunes a Sabado: 9:00 AM - 7:00 PM</p>
                <p>Domingos: 9:00 AM - 6:00 PM</p>
            </div>
            <div className={styles['FooterSocial']}>
                <h6>Siguenos</h6>
                <a href="http://" target="_blank">Facebook</a>
                <a href="http://" target="_blank">Instagram</a>
                <a href="http://" target="_blank">Twitter</a>
            </div>
        </div>
    )
}