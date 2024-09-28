import styles from './NavBar.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import purezaLiquidaIcon from '../../assets/purezaliquidaicon.svg'
import userIcon from '../../assets/signupicon.svg'
import closeIcon from '../../assets/closeicon.svg'
import { useContext, useState } from 'react'
import { AppContext } from '../../AppContext'
import Swal from 'sweetalert2'

export default function NavBar() {

    const {data, setData} = useContext(AppContext)

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    const location = useLocation()

    const toogleIsOpen = () => setIsOpen(!isOpen)

    const handleLogOut = () => {
        toogleIsOpen()
        Swal.fire({
            title: 'Seguro que quieres cerrar sesion?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: 'red',
            confirmButtonText: 'Si, quiero salir'
        })
        .then(result => {
            if(result.isConfirmed) setData({})
        })
    }

    const handleFAQClick = () => {
        if (location.pathname === '/') {
            document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate('/')
            setTimeout(() => {
                document.getElementById('faq').scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    const handleHomeClick = () => {
        if (location.pathname === '/') {
            document.getElementById('home').scrollIntoView({ behavior: 'smooth' })
        } else {
            navigate('/')
            setTimeout(() => {
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' })
            }, 100)
        }
    }

    return(
        <>
            <div className={styles['NavBarBody']}>
                <div className={styles['NavBarIcon']}>
                    <img src={purezaLiquidaIcon} alt="" />
                    <div className={styles['NavBarIconLetters']}>
                        <p>Pureza</p>
                        <p>Liquida</p>
                    </div>
                </div>
                <div className={styles['NavBarLinks']}>
                    <span onClick={handleHomeClick}>Inicio</span>
                    <Link to={data.user ? '/orders' : '/login'}>Repartos</Link>
                    <span onClick={handleFAQClick}>FAQ</span>
                    {
                        data.user
                        ?
                        <img src={userIcon} alt="" className={styles['userIcon']} onClick={toogleIsOpen}/>
                        :
                        <Link to={'/login'}>Iniciar Sesión</Link>
                    }
                </div>
            </div>
            {
                isOpen
                ?
                <div className={styles['SideMenuBackground']} onClick={toogleIsOpen}></div>
                :
                null
            }
            <div className={`${styles['SideMenu']} ${isOpen ? styles['open'] : styles['closed']}`}>
                <img src={closeIcon} alt="" onClick={toogleIsOpen}/>
                <div className={`${styles['SideMenuOptions']} ${isOpen ? styles['ParentOpen'] : styles['ParentClosed']}`}>
                    {
                        data.user
                        ?
                        <>
                            <Link className={`${styles['mobileOnly']} ${isOpen ? 'ParentOpen' : 'ParentClosed'}`} to={'/'}>Inicio</Link>
                            <Link className={`${styles['mobileOnly']}`} to={'/orders'}>Repartos</Link>
                            <Link to={'/config'}>Configuracion de Cuenta</Link>
                            <p onClick={handleLogOut}>Cerrar Sesion</p>
                        </>
                        :
                        null
                    }
                </div>
            </div>
        </>
    )
}