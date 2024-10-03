import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
import styles from './Config.module.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import dropDownIcon from '../../assets/dropdownicon.svg'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function Config(){

    const {data, setData} = useContext(AppContext)
    const userData = data
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Pureza Lquida | Configuracion'
        if(!data.user) navigate('/')
    }, [data, navigate])

    const [isOpen, setIsOpen] = useState({
        newEmail: false,
        newPassword: false,
        newPhone: false
    })

    const toogleIsOpen = (e) => {
        const name = e.currentTarget.getAttribute('name');
        setIsOpen({
            ...isOpen,
            [name]: !isOpen[name]
        });
    }

    const initialEmailFormContent = {
        email: '',
        confirmEmail: ''
    }

    const [emailFormContent, setEmailFormContent] = useState(initialEmailFormContent)

    const handleChangeEmail = (e) => {
        setEmailFormContent({
            ...emailFormContent,
            [e.target.name]: e.target.value
        })
    }

    const handleEmailSubmit = (e) => {
        e.preventDefault()
        if(!emailFormContent.email || !emailFormContent.confirmEmail) Swal.fire({title: 'Oops...', text: 'Debes completar los campos requeridos', icon: 'warning'})
        else if(emailFormContent.email !== emailFormContent.confirmEmail) Swal.fire({title: 'Oops...', text: 'Ambos correos deben ser iguales', icon: 'warning'})
        else {
            Swal.fire({
                title: 'Seguro que quieres actualizar el email?',
                icon: 'question',
                confirmButtonText: 'Si, quiero actualizar',
                showCancelButton: true,
                cancelButtonText: 'No',
                cancelButtonColor: 'red'
            })
            .then(response => {
                if(response.isConfirmed){
                    axios.put(`${import.meta.env.VITE_API_URL}/users/${data.user.id}`, {email: emailFormContent.email}, {headers: {Authorization: `Bearer ${data.token}`}})
                    .then(({data}) => {
                        setData({
                            ...userData,
                            user: data
                        })
                        Swal.fire({
                            title: 'Correo actualizado', 
                            icon: 'success', 
                        })
                    })
                    .catch(error => {
                        console.log(error);
                        Swal.fire({
                            title: 'Oops...', 
                            icon: 'error', 
                            text: error.response.data.message[0]
                        })
                    })
                }
            })
        }
    }

    return(
        <>
            <NavBar/>
            <div className={styles['ConfigBody']}>
                <h2>Configuracion de Cuenta</h2>
                <div className={styles['ConfigMain']}>
                    <div className={styles['ConfigForm']}>
                        <div className={styles['ConfigFormHead']} onClick={toogleIsOpen} name='newEmail'>
                            <h4>Cambiar Correo Electronico</h4>
                            <div className={styles['ConfigFormHeadInfo']}>
                                <p>{data.user.email}</p>
                                <img src={dropDownIcon} alt="" className={isOpen.newEmail ? styles['IconReversed'] : ''}/>
                            </div>
                        </div>
                        <form className={`${styles['ConfigFormBody']} ${isOpen.newEmail ? styles['open'] : styles['closed']}`} onSubmit={handleEmailSubmit}>
                            <div className={styles['ConfigFormInput']}>
                                <label htmlFor="newEmail">Nuevo Correo</label>
                                <input type="email" name='email' id='newEmail' onChange={handleChangeEmail}/>
                            </div>
                            <div className={styles['ConfigFormInput']}>
                                <label htmlFor="confirmNewEmail">Confirma Nuevo Correo</label>
                                <input type="email" name='confirmEmail' id='confirmNewEmail' onChange={handleChangeEmail}/>
                            </div>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                    <div className={styles['ConfigForm']}>
                        <div className={styles['ConfigFormHead']} onClick={toogleIsOpen} name='newPhone'>
                            <h4>Cambiar Telefono</h4>
                            <div className={styles['ConfigFormHeadInfo']}>
                                <p>{data.user.phone_number || 'N/A'}</p>
                                <img src={dropDownIcon} alt="" className={isOpen.newPhone ? styles['IconReversed'] : ''}/>
                            </div>
                        </div>
                        <form className={`${styles['ConfigFormBody']} ${isOpen.newPhone ? styles['open'] : styles['closed']}`}>
                        </form>
                    </div>
                    <div className={styles['ConfigForm']}>
                        <div className={styles['ConfigFormHead']} onClick={toogleIsOpen} name='newPassword'>
                            <h4>Cambiar Contraseña</h4>
                            <div className={styles['ConfigFormHeadInfo']}>
                                <p></p>
                                <img src={dropDownIcon} alt="" className={isOpen.newPassword ? styles['IconReversed'] : ''}/>
                            </div>
                        </div>
                        <form className={`${styles['ConfigFormBody']} ${isOpen.newPassword ? styles['open'] : styles['closed']}`}>
                        </form>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}