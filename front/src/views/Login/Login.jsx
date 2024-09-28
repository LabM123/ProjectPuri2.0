import { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import { AppContext } from '../../AppContext'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosHeaders } from 'axios'
import Swal from 'sweetalert2'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import loginIcon from '../../assets/loginicon.svg'
import signupIcon from '../../assets/signupicon.svg'

export default function Login() {
    useEffect(() => {
        document.title = 'Pureza Liquida | Login'
    }, [])

    const {data, setData} = useContext(AppContext)
    const navigate = useNavigate()

    const intialStateLogin = {
        email: '',
        password: ''
    }

    const initialStateRegister = {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        phone_number: ''
    }

    const [newLogin, setNewLogin] = useState(intialStateLogin)
    const [newRegister, setNewRegister] = useState(initialStateRegister)

    const handleChangeLogin = (e) => {
        setNewLogin({
            ...newLogin,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeRegister = (e) => {
        setNewRegister({
            ...newRegister,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        if(newLogin.password && newLogin.email){
                axios.post(`${import.meta.env.VITE_API_URL}/users/login`, newLogin)
                .then(response => {
                    setData(response.data)
                    navigate('/orders')
                })
                .catch(error => {
                    console.log(error)
                    Swal.fire({
                        title: 'Oops...',
                        text: error.response.data.message,
                        icon: 'error'
                    })
                })
        } else {
            Swal.fire({
                title: 'Oops...', 
                text: 'Ingresa un email y contraseña', 
                icon: 'warning'
            })
        }
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault()
        if(!newRegister.password || !newRegister.email || !newRegister.confirm_password || !newRegister.name) Swal.fire({title: 'Oops...', text: 'Llena los espacios requeridos', icon: 'warning'})
        else if(newRegister.password !== newRegister.confirm_password) Swal.fire({title: 'Oops...', text: 'Ambas contraseñas deben ser las mismas', icon: 'warning'})
        else{
            axios.post(`${import.meta.env.VITE_API_URL}/users/register`, newRegister)
            .then(response => {
                setData(response.data)
                Swal.fire({
                    icon: 'success', 
                    text: 'Registro exitoso'
                })
                .then(() => {
                    navigate('/orders')
                })
            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    title: 'Oops...', 
                    icon: 'error', 
                    text: error.response.data.message[0]
                })
            })
        }
    }
    return(
        <>
            <NavBar/>
            <div className={styles['LoginBody']}>
                <h2>Acceso a Repartos</h2>
                <p>Para acceder a nuestra seccion de repartos, por favor inicia sesion o registrate</p>
                <div className={styles['LoginMain']}>
                    <form onSubmit={handleSubmitLogin}>
                        <h3>Inicia Sesion</h3>
                        <div className={styles['InputsSection']}>
                            <div className={styles['InputSection']}>
                                <label htmlFor="emailLogin">Correo Electronico</label>
                                <input type="email" name="email" id="emailLogin" value={newLogin.email} onChange={handleChangeLogin} placeholder='tu@ejemplo.com'/>
                            </div>
                            <div className={styles['InputSection']}>
                                <label htmlFor="passwordLogin">Contraseña</label>
                                <input type="password" name="password" id="passwordLogin" value={newLogin.password} onChange={handleChangeLogin}/>
                            </div>
                            <button type='submit'>
                                <img src={loginIcon} alt="" />
                                <p>Iniciar Sesion</p>
                            </button>
                        </div>
                    </form>
                    <div className={styles['hr']}></div>
                    <form onSubmit={handleSubmitRegister}>
                        <h3>Registrarse</h3>
                        <div className={styles['InputsSection']}>
                            <div className={styles['InputSection']}>
                                <label htmlFor="name">Nombre</label>
                                <input type='text' name="name" id="name" value={newRegister.name} onChange={handleChangeRegister} placeholder='Juan Perez'/>
                            </div>
                            <div className={styles['InputSection']}>
                                <label htmlFor="email">Correo Electronico</label>
                                <input type="email" name="email" id="email" value={newRegister.email} onChange={handleChangeRegister} placeholder='tu@ejemplo.com'/>
                            </div>
                            <div className={styles['InputSection']}>
                                <label htmlFor="phone_number">Numero Telefonico</label>
                                <input type="text" name="phone_number" id="phone_number" value={newRegister.phone_number} onChange={handleChangeRegister} placeholder='56 1709 5015'/>
                            </div>
                            <div className={styles['InputSection']}>
                                <label htmlFor="password">Contraseña</label>
                                <input type="password" name="password" id="password" value={newRegister.password} onChange={handleChangeRegister}/>
                            </div>
                            <div className={styles['InputSection']}>
                                <label htmlFor="confirm_password">Confirmar Contraseña</label>
                                <input type="password" name="confirm_password" id="confirm_password" value={newRegister.confirm_password} onChange={handleChangeRegister}/>
                            </div>
                            <button>
                                <img src={signupIcon} alt="" />
                                <p>Registrarse</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}