import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
import styles from './Config.module.css'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import dropDownIcon from '../../assets/dropdownicon.svg'
import Swal from 'sweetalert2'
import axios from 'axios'
import { format } from '@formkit/tempo'
import Loader from '../../components/Loader/Loader'

export default function Config(){

    const {data, setData} = useContext(AppContext)
    const userData = data
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const [completedOrders, setCompletedOrders] = useState(0)
    const [cancelledOrders, setCancelledOrders] = useState(0)
    const [pendingOrders, setPendingOrders] = useState(0)

    useEffect(() => {
        document.title = 'Pureza Lquida | Configuracion'
        if(!data.user) navigate('/')
        else{
            data.user?.orders.forEach((order) => {
                if(order.status === 'Completado') setCompletedOrders(prevValue => prevValue + 1)
                else if(order.status === 'Cancelado') setCancelledOrders(prevValue => prevValue + 1)
                else if(order.status === 'Pendiente') setPendingOrders(prevValue => prevValue + 1)
            })
        }
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
                    setIsLoading(true)
                    axios.put(`${import.meta.env.VITE_API_URL}/users/${data.user.id}`, {email: emailFormContent.email}, {headers: {Authorization: `Bearer ${data.token}`}})
                    .then(({data}) => {
                        setIsLoading(false)
                        setData({
                            ...userData,
                            user: data
                        })
                        Swal.fire({
                            title: 'Correo actualizado', 
                            icon: 'success', 
                        })
                        setEmailFormContent(initialEmailFormContent)
                    })
                    .catch(error => {
                        setIsLoading(false)
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

    const initialPhoneFormContent = {
        phone_number: '',
        confirm_phone_number: ''
    }

    const [phoneFormContent, setPhoneFormContent] = useState(initialPhoneFormContent)

    const handleChangePhone = (e) => {
        setPhoneFormContent({
            ...phoneFormContent,
            [e.target.name]: e.target.value
        })
    }

    const handlePhoneSubmit = (e) => {
        e.preventDefault()
        if(!phoneFormContent.phone_number || !phoneFormContent.confirm_phone_number) Swal.fire({title: 'Oops...', text: 'Debes completar los campos requeridos', icon: 'warning'})
        else if(phoneFormContent.phone_number !== phoneFormContent.confirm_phone_number) Swal.fire({title: 'Oops...', text: 'Ambos telefonos deben ser iguales', icon: 'warning'})
        else {
            Swal.fire({
                title: 'Seguro que quieres actualizar el telefono?',
                icon: 'question',
                confirmButtonText: 'Si, quiero actualizar',
                showCancelButton: true,
                cancelButtonText: 'No',
                cancelButtonColor: 'red'
            })
            .then(response => {
                if(response.isConfirmed){
                    setIsLoading(true)
                    axios.put(`${import.meta.env.VITE_API_URL}/users/${data.user.id}`, {phone_number: phoneFormContent.phone_number}, {headers: {Authorization: `Bearer ${data.token}`}})
                    .then(({data}) => {
                        setIsLoading(false)
                        setData({
                            ...userData,
                            user: data
                        })
                        Swal.fire({
                            title: 'Telefono actualizado', 
                            icon: 'success', 
                        })
                        setPhoneFormContent(initialPhoneFormContent)
                    })
                    .catch(error => {
                        setIsLoading(false)
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

    const initialPasswordFormContent = {
        password: '',
        confirm_password: ''
    }

    const [passwordFormContent, setPasswordFormContent] = useState(initialPasswordFormContent)

    const handleChangePassword = (e) => {
        setPasswordFormContent({
            ...passwordFormContent,
            [e.target.name]: e.target.value
        })
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if(!passwordFormContent.password || !passwordFormContent.confirm_password) Swal.fire({title: 'Oops...', text: 'Debes completar los campos requeridos', icon: 'warning'})
        else if(passwordFormContent.password !== passwordFormContent.confirm_password) Swal.fire({title: 'Oops...', text: 'Ambos contraseñas deben ser iguales', icon: 'warning'})
        else {
            Swal.fire({
                title: 'Seguro que quieres actualizar la contraseña?',
                icon: 'question',
                confirmButtonText: 'Si, quiero actualizar',
                showCancelButton: true,
                cancelButtonText: 'No',
                cancelButtonColor: 'red'
            })
            .then(response => {
                if(response.isConfirmed){
                    setIsLoading(true)
                    axios.put(`${import.meta.env.VITE_API_URL}/users/${data.user.id}`, {password: passwordFormContent.password}, {headers: {Authorization: `Bearer ${data.token}`}})
                    .then(({data}) => {
                        setIsLoading(false)
                        setData({
                            ...userData,
                            user: data
                        })
                        Swal.fire({
                            title: 'Contraseña actualizada', 
                            icon: 'success', 
                        })
                        setPasswordFormContent(initialPasswordFormContent)
                    })
                    .catch(error => {
                        setIsLoading(false)
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
            {
                isLoading
                ?
                <Loader/>
                :
                null
            }
            <div className={styles['ConfigBody']}>
                <h2>Configuracion de Cuenta</h2>
                <div className={styles['ConfigMain']}>
                    <div className={styles['ConfigForm']}>
                        <div className={styles['ConfigFormHead']} onClick={toogleIsOpen} name='newEmail'>
                            <h4>Cambiar Correo Electronico</h4>
                            <div className={styles['ConfigFormHeadInfo']}>
                                <p>{data.user?.email}</p>
                                <img src={dropDownIcon} alt="" className={isOpen.newEmail ? styles['IconReversed'] : ''}/>
                            </div>
                        </div>
                        <form className={`${styles['ConfigFormBody']} ${isOpen.newEmail ? styles['open'] : styles['closed']}`} onSubmit={handleEmailSubmit}>
                            <div className={styles['ConfigFormInput']}>
                                <label htmlFor="newEmail">Nuevo Correo</label>
                                <input type="email" name='email' id='newEmail' onChange={handleChangeEmail} value={emailFormContent.email}/>
                            </div>
                            <div className={styles['ConfigFormInput']}>
                                <label htmlFor="confirmNewEmail">Confirma Nuevo Correo</label>
                                <input type="email" name='confirmEmail' id='confirmNewEmail' onChange={handleChangeEmail} value={emailFormContent.confirmEmail}/>
                            </div>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                    <div className={styles['ConfigForm']}>
                        <div className={styles['ConfigFormHead']} onClick={toogleIsOpen} name='newPhone'>
                            <h4>Cambiar Telefono</h4>
                            <div className={styles['ConfigFormHeadInfo']}>
                                <p>{data.user?.phone_number || 'N/A'}</p>
                                <img src={dropDownIcon} alt="" className={isOpen.newPhone ? styles['IconReversed'] : ''}/>
                            </div>
                        </div>
                        <form className={`${styles['ConfigFormBody']} ${isOpen.newPhone ? styles['open'] : styles['closed']}`} onSubmit={handlePhoneSubmit}>
                            <div className={styles['ConfigFormInput']}>
                                <label htmlFor="newPhoneNumber">Nuevo Telefono</label>
                                <input type="text" name='phone_number' id='newPhoneNumber' onChange={handleChangePhone} value={phoneFormContent.phone_number}/>
                            </div>
                            <div className={styles['ConfigFormInput']}>
                                <label htmlFor="confirmNewPhoneNumber">Confirma Nuevo Telefono</label>
                                <input type="text" name='confirm_phone_number' id='confirmNewPhoneNumber' onChange={handleChangePhone} value={phoneFormContent.confirm_phone_number}/>
                            </div>
                            <button type='submit'>Enviar</button>
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
                        <form className={`${styles['ConfigFormBody']} ${isOpen.newPassword ? styles['open'] : styles['closed']}`} onSubmit={handlePasswordSubmit}>
                            <div className={styles['ConfigFormInput']}>
                                <label htmlFor="newPassword">Nueva Contraseña</label>
                                <input type="password" name='password' id='newPassword' onChange={handleChangePassword} value={passwordFormContent.password}/>
                            </div>
                            <div className={styles['ConfigFormInput']}>
                                <label htmlFor="confirmNewPassword">Confirma Nueva Contraseña</label>
                                <input type="password" name='confirm_password' id='confirmNewPassword' onChange={handleChangePassword} value={passwordFormContent.confirm_password}/>
                            </div>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                </div>
                <h2>Tu Informacion</h2>
                <div className={styles['UserInfo']}>
                    <div className={styles['UserInfoSection']}>
                        <h6>ID de Usuario</h6>
                        <p>{data.user?.id}</p>
                    </div>
                    <div className={styles['UserInfoSection']}>
                        <h6>Nombre de Usuario</h6>
                        <p>{data.user?.name}</p>
                    </div>
                    <div className={styles['UserInfoSection']}>
                        <h6>Email</h6>
                        <p>{data.user?.email}</p>
                    </div>
                    <div className={styles['UserInfoSection']}>
                        <h6>Telefono</h6>
                        <p>{data.user?.phone_number || 'N/A'}</p>
                    </div>
                    <div className={styles['UserInfoSection']}>
                        <h6>Numero de Ordenes Creadas</h6>
                        <p>{data.user?.orders.length || 'N/A'}</p>
                    </div>
                    <div className={styles['UserInfoSection']}>
                        <h6>Numero de Ordenes Completadas</h6>
                        <p>{completedOrders}</p>
                    </div>
                    <div className={styles['UserInfoSection']}>
                        <h6>Numero de Ordenes Pendientes</h6>
                        <p>{pendingOrders}</p>
                    </div>
                    <div className={styles['UserInfoSection']}>
                        <h6>Numero de Ordenes Canceladas</h6>
                        <p>{cancelledOrders}</p>
                    </div>
                    <div className={styles['UserInfoSection']}>
                        <h6>Usuario Creado(Fecha)</h6>
                        <p>
                            {
                                `${format(data.user?.created_at)} a las ${format(data.user?.created_at, {time: 'short'})}`
                            }
                        </p>
                    </div>
                    <div className={styles['UserInfoSection']}>
                        <h6>Usuario Actualizado(Fecha)</h6>
                        <p>
                            {
                                data.user?.updated_at
                                ?
                                `${format(data.user?.updated_at)} a las ${format(data.user?.updated_at, {time: 'short'})}`
                                :
                                'N/A'
                            }
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}