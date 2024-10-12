import { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
import styles from './Admin.module.css'
import { addDay, format, sameDay } from '@formkit/tempo'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import OrderCardAdmin from '../../components/OrderCardAdmin/OrderCardAdmin'
import Loader from '../../components/Loader/Loader'
import dropDownIcon from '../../assets/dropdownicon.svg'

export default function Admin() {

    const {data, setData} = useContext(AppContext)
    const navigate = useNavigate()
    
    const [allOrders, setAllOrders] = useState([])
    const [date, setDate] = useState(format({date: new Date, tz: 'America/Mexico_City', format: 'YYYY-MM-DDTHH:mm:ss'}))

    const [isLoading, setIsLoading] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        document.title = 'Pureza Liquida | Admin'
        if(!data.user) navigate('/login')
        else if(data.user.role !== 'admin') navigate('/')
        else{
            setIsLoading(true)
            axios.get(`${import.meta.env.VITE_API_URL}/orders`, {headers: {Authorization: `Bearer ${data.token}`}})
            .then(({data}) => {
                setIsLoading(false)
                setAllOrders(data)
            })
            .catch(error => {
                setIsLoading(false)
                console.log(error)
                Swal.fire({
                    title: 'Oops...', 
                    icon: 'error', 
                    text: error.response.data.message
                })
            })
        }
    }, [])

    useEffect(()=> {
        if(!data.user) navigate('/login')
    }, [data.user, navigate])

    const initialFoundedUser = {
        id: '',
        name: '',
        email: '',
        phone_number: 'N/A',
        role: '',
        created_at: '',
        updated_at: 'N/A'
    }

    const [foundedUser, setFoundedUser] = useState(initialFoundedUser)

    const [isOpen, setIsOpen] = useState({
        getUserByEmail: false,
        getUserById: false,
        resetUserPassword: false,
        upgradeUser: false,
        downgradeUser: false
    })

    const toogleIsOpen = (e) => {
        const name = e.currentTarget.getAttribute('name');
        setIsOpen({
            ...isOpen,
            [name]: !isOpen[name]
        });
    }

    const [userEmail, setUserEmail] = useState('')

    const handleSubmitGetUserByEmail = (e) => {
        e.preventDefault()
        if(!userEmail) Swal.fire({title: 'Oops...', text: 'Debes poner un correo electronico', icon: 'warning'})
        else{
            setIsLoading(true)
            axios.get(`${import.meta.env.VITE_API_URL}/users/email/${userEmail}`, {headers: {Authorization: `Bearer ${data.token}`}})
            .then(({data}) => {
                setIsLoading(false)
                setFoundedUser({
                    ...foundedUser,
                    ...data
                })
                setIsModalOpen(true)
            })
            .catch(error => {
                setIsLoading(false)
                console.log(error);
                Swal.fire({
                    title: 'Oops...', 
                    icon: 'error', 
                    text: error.response.data.message
                })
            })
        }
    }

    const [userId, setUserId] = useState('')

    const handleSubmitGetUserById = (e) => {
        e.preventDefault()
        if(!userId) Swal.fire({title: 'Oops...', text: 'Debes poner un ID de Usuario', icon: 'warning'})
        else{
            setIsLoading(true)
            axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`, {headers: {Authorization: `Bearer ${data.token}`}})
            .then(({data}) => {
                setIsLoading(false)
                setFoundedUser({
                    ...foundedUser,
                    ...data
                })
                setIsModalOpen(true)
            })
            .catch(error => {
                setIsLoading(false)
                console.log(error);
                Swal.fire({
                    title: 'Oops...', 
                    icon: 'error', 
                    text: error.response.data.message
                })
            })
        }
    }

    const initialResetPasswordInfo = {
        adminPassword: '',
        userId: ''
    }

    const [resetPasswordInfo, setResetPasswordInfo] = useState(initialResetPasswordInfo)

    const handleResetPasswordChange = (e) => {
        setResetPasswordInfo({
            ...resetPasswordInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitResetUserPassword = (e) => {
        e.preventDefault()
        if(!resetPasswordInfo.userId || !resetPasswordInfo.adminPassword) Swal.fire({title: 'Oops...', text: 'Completa los campos requeridos', icon: 'warning'})
        else{
            Swal.fire({
                title: 'Seguro que quieres restalecer la contraseña?',
                icon: 'question',
                confirmButtonText: 'Si, quiero restablecer',
                showCancelButton: true,
                cancelButtonText: 'No',
                cancelButtonColor: 'red'
            })
            .then(response => {
                if(response.isConfirmed){
                    setIsLoading(true)
                    axios.post(`${import.meta.env.VITE_API_URL}/users/reset/${resetPasswordInfo.userId}`, {password: resetPasswordInfo.adminPassword}, {headers: {Authorization: `Bearer ${data.token}`}})
                    .then(() => {
                        setIsLoading(false)
                        setResetPasswordInfo(initialResetPasswordInfo)
                        Swal.fire({
                            title: 'Exito', 
                            icon: 'success', 
                            text: 'La nueva contraseña es Purificadora1'
                        })
                    })
                    .catch(error => {
                        setIsLoading(false)
                        console.log(error);
                        Swal.fire({
                            title: 'Oops...', 
                            icon: 'error', 
                            text: error.response.data.message
                        })
                    })
                }
            })
        }
    }

    const initialUpgradeUserInfo = {
        adminPassword: '',
        userId: ''
    }

    const [upgradeUserInfo, setUpgradeUserInfo] = useState(initialUpgradeUserInfo)

    const handleUpgradeUserChange = (e) => {
        setUpgradeUserInfo({
            ...upgradeUserInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitUpgradeUser = (e) => {
        e.preventDefault()
        if(!upgradeUserInfo.userId || !upgradeUserInfo.adminPassword) Swal.fire({title: 'Oops...', text: 'Completa los campos requeridos', icon: 'warning'})
        else{
            Swal.fire({
                title: 'Seguro que quieres hacer administrador al usuario?',
                icon: 'question',
                confirmButtonText: 'Si',
                showCancelButton: true,
                cancelButtonText: 'No',
                cancelButtonColor: 'red'
            })
            .then(response => {
                if(response.isConfirmed){
                    setIsLoading(true)
                    axios.post(`${import.meta.env.VITE_API_URL}/users/upgrade/${upgradeUserInfo.userId}`, {password: upgradeUserInfo.adminPassword}, {headers: {Authorization: `Bearer ${data.token}`}})
                    .then(() => {
                        setIsLoading(false)
                        setUpgradeUserInfo(initialUpgradeUserInfo)
                        Swal.fire({
                            title: 'Exito', 
                            icon: 'success', 
                            text: 'El usuario ah sido actualizado'
                        })
                    })
                    .catch(error => {
                        setIsLoading(false)
                        console.log(error);
                        Swal.fire({
                            title: 'Oops...', 
                            icon: 'error', 
                            text: error.response.data.message
                        })
                    })
                }
            })
        }
    }

    const initialDowngradeUserInfo = {
        adminPassword: '',
        userId: ''
    }

    const [downgradeUserInfo, setDowngradeUserInfo] = useState(initialDowngradeUserInfo)

    const handleDowngradeUserChange = (e) => {
        setDowngradeUserInfo({
            ...downgradeUserInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitDowngradeUser = (e) => {
        e.preventDefault()
        if(!downgradeUserInfo.userId || !downgradeUserInfo.adminPassword) Swal.fire({title: 'Oops...', text: 'Completa los campos requeridos', icon: 'warning'})
        else{
            Swal.fire({
                title: 'Seguro que quieres degradar al usuario?',
                icon: 'question',
                confirmButtonText: 'Si',
                showCancelButton: true,
                cancelButtonText: 'No',
                cancelButtonColor: 'red'
            })
            .then(response => {
                if(response.isConfirmed){
                    setIsLoading(true)
                    axios.post(`${import.meta.env.VITE_API_URL}/users/downgrade/${downgradeUserInfo.userId}`, {password: downgradeUserInfo.adminPassword}, {headers: {Authorization: `Bearer ${data.token}`}})
                    .then(() => {
                        setIsLoading(false)
                        setDowngradeUserInfo(initialDowngradeUserInfo)
                        Swal.fire({
                            title: 'Exito', 
                            icon: 'success', 
                            text: 'El usuario ah sido actualizado'
                        })
                    })
                    .catch(error => {
                        setIsLoading(false)
                        console.log(error);
                        Swal.fire({
                            title: 'Oops...', 
                            icon: 'error', 
                            text: error.response.data.message
                        })
                    })
                }
            })
        }
    }
    //----------------------------------------------------------------------------------------------------------------

    const handleChangeDate = (e) => {
        setDate(e.target.value)
    }

    const displayDateOptions = () => {
        const allOptions = []
        for(let i = 0; i < 365; i++){
            allOptions.push(
            <option value={format({date: addDay(new Date, -i), format: 'YYYY-MM-DDTHH:mm:ss'})} key={i}>
                { i === 0 ? 'Hoy' : `Hace ${i} dia(s)`}
            </option>
            )
        }
        return allOptions
    }

    const displayOrders= () => {
        let filteredOrders = []
        const completedOrders = []
        const pendingOrders = []
        const cancelledOrders = []
        for(let i=0;i<allOrders?.length;i++){
            if(sameDay(date, allOrders[i].created_at)){
                if(allOrders[i].status === 'Completado') completedOrders.push(<OrderCardAdmin order={allOrders[i]} key={i} token={data.token} data={data} setData={setData} setIsLoading={setIsLoading} setAllOrders={setAllOrders}/>)
                else if(allOrders[i].status === 'Pendiente') pendingOrders.push(<OrderCardAdmin order={allOrders[i]} key={i} token={data.token} data={data} setData={setData} setIsLoading={setIsLoading} setAllOrders={setAllOrders}/>)
                else cancelledOrders.push(<OrderCardAdmin order={allOrders[i]} key={i} token={data.token} data={data} setData={setData} setAllOrders={setAllOrders} setIsLoading={setIsLoading}/>)
            }
        }
        filteredOrders = [...pendingOrders, ...completedOrders, ...cancelledOrders]
        if(!filteredOrders.length){
            return(
                <p className={styles['Message']}>No tienes ordenes para este dia</p>
            )
        } else {
            return filteredOrders
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
            <div className={styles['AdminBody']}>
                <h2>Administrar Usuarios</h2>
                <div className={styles['AdminUsers']}>
                    <div className={styles['AdminUsersForm']}>
                        <div className={styles['UsersFormHead']} onClick={toogleIsOpen} name='getUserByEmail'>
                            <h4>Obtener Usuario Por Email</h4>
                            <img src={dropDownIcon} alt="" className={isOpen.getUserByEmail ? styles['IconReversed'] : ''}/>
                        </div>
                        <form className={`${styles['UsersFormBody']} ${isOpen.getUserByEmail ? styles['open'] : styles['closed']}`} onSubmit={handleSubmitGetUserByEmail}>
                            <div className={styles['UsersFormInput']}>
                                <label htmlFor="userEmail">Correo del Usuario</label>
                                <input type="email" name='email' id='userEmail' onChange={(e)=>setUserEmail(e.target.value)} value={userEmail}/>
                            </div>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                    <div className={styles['AdminUsersForm']}>
                        <div className={styles['UsersFormHead']} onClick={toogleIsOpen} name='getUserById'>
                            <h4>Obtener Usuario Por ID</h4>
                            <img src={dropDownIcon} alt="" className={isOpen.getUserById ? styles['IconReversed'] : ''}/>
                        </div>
                        <form className={`${styles['UsersFormBody']} ${isOpen.getUserById ? styles['open'] : styles['closed']}`} onSubmit={handleSubmitGetUserById}>
                            <div className={styles['UsersFormInput']}>
                                <label htmlFor="userId">ID del Usuario</label>
                                <input type="text" name='id' id='userId' onChange={(e)=>setUserId(e.target.value)} value={userId}/>
                            </div>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                    <div className={styles['AdminUsersForm']}>
                        <div className={styles['UsersFormHead']} onClick={toogleIsOpen} name='resetUserPassword'>
                            <h4>Restablecer Contraseña de Usuario</h4>
                            <img src={dropDownIcon} alt="" className={isOpen.resetUserPassword ? styles['IconReversed'] : ''}/>
                        </div>
                        <form className={`${styles['UsersFormBody']} ${isOpen.resetUserPassword ? styles['open'] : styles['closed']}`} onSubmit={handleSubmitResetUserPassword}>
                            <div className={styles['UsersFormInput']}>
                                <label htmlFor="resetPasswordUserId">ID del Usuario</label>
                                <input type="text" name='userId' id='resetPasswordUserId' onChange={handleResetPasswordChange} value={resetPasswordInfo.userId}/>
                            </div>
                            <div className={styles['UsersFormInput']}>
                                <label htmlFor="resetPasswordAdminPassword">Contraseña de Administrador</label>
                                <input type="password" name='adminPassword' id='resetPasswordAdminPassword' onChange={handleResetPasswordChange} value={resetPasswordInfo.adminPassword}/>
                            </div>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                    <div className={styles['AdminUsersForm']}>
                        <div className={styles['UsersFormHead']} onClick={toogleIsOpen} name='upgradeUser'>
                            <h4>Promover a Administrador</h4>
                            <img src={dropDownIcon} alt="" className={isOpen.upgradeUser ? styles['IconReversed'] : ''}/>
                        </div>
                        <form className={`${styles['UsersFormBody']} ${isOpen.upgradeUser ? styles['open'] : styles['closed']}`} onSubmit={handleSubmitUpgradeUser}>
                            <div className={styles['UsersFormInput']}>
                                <label htmlFor="upgradeUserUserId">ID del Usuario</label>
                                <input type="text" name='userId' id='upgradeUserUserId' onChange={handleUpgradeUserChange} value={upgradeUserInfo.userId}/>
                            </div>
                            <div className={styles['UsersFormInput']}>
                                <label htmlFor="upgradeUserAdminPassword">Contraseña de Administrador</label>
                                <input type="password" name='adminPassword' id='upgradeUserAdminPassword' onChange={handleUpgradeUserChange} value={upgradeUserInfo.adminPassword}/>
                            </div>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                    <div className={styles['AdminUsersForm']}>
                        <div className={styles['UsersFormHead']} onClick={toogleIsOpen} name='downgradeUser'>
                            <h4>Degradar a Usuario</h4>
                            <img src={dropDownIcon} alt="" className={isOpen.downgradeUser ? styles['IconReversed'] : ''}/>
                        </div>
                        <form className={`${styles['UsersFormBody']} ${isOpen.downgradeUser ? styles['open'] : styles['closed']}`} onSubmit={handleSubmitDowngradeUser}>
                            <div className={styles['UsersFormInput']}>
                                <label htmlFor="downgradeUserUserId">ID del Usuario</label>
                                <input type="text" name='userId' id='downgradeUserUserId' onChange={handleDowngradeUserChange} value={downgradeUserInfo.userId}/>
                            </div>
                            <div className={styles['UsersFormInput']}>
                                <label htmlFor="downgradeUserAdminPassword">Contraseña de Administrador</label>
                                <input type="password" name='adminPassword' id='downgradeUserAdminPassword' onChange={handleDowngradeUserChange} value={downgradeUserInfo.adminPassword}/>
                            </div>
                            <button type='submit'>Enviar</button>
                        </form>
                    </div>
                </div>
                <div className={styles['AdminHeader']}>
                    <h2>Ordenes</h2>
                    <select name="date" id="selectedDate" onChange={handleChangeDate}>
                        {displayDateOptions()}
                    </select>
                </div>
                <div className={styles['AdminOrders']}>
                    {displayOrders()}
                </div>
            </div>
            {
                isModalOpen
                ?
                <>
                    <div className={styles['ModalBackground']} onClick={() => {setIsModalOpen(false)}}></div>
                    <div className={styles['ModalMain']}>
                        <div className={styles['UserInfoSection']}>
                            <h6>ID del Usuario</h6>
                            <p>{foundedUser.id}</p>
                        </div>
                        <div className={styles['UserInfoSection']}>
                            <h6>Nombre de Usuario</h6>
                            <p>{foundedUser.name}</p>
                        </div>
                        <div className={styles['UserInfoSection']}>
                            <h6>Email</h6>
                            <p>{foundedUser.email}</p>
                        </div>
                        <div className={styles['UserInfoSection']}>
                            <h6>Telefono</h6>
                            <p>{foundedUser.phone_number}</p>
                        </div>
                        <div className={styles['UserInfoSection']}>
                            <h6>Rol</h6>
                            <p>{foundedUser.role}</p>
                        </div>
                        <div className={styles['UserInfoSection']}>
                            <h6>Usuario Creado</h6>
                            <p>{`El ${format(foundedUser.created_at, {date: 'full'})} a las ${format(foundedUser.created_at, {time: 'short'})}`}</p>
                        </div>
                        <div className={styles['UserInfoSection']}>
                            <h6>Usuario Actualizado</h6>
                            <p>
                                {
                                    foundedUser.updated_at
                                    ?
                                    `El ${format(foundedUser.updated_at, {date: 'full'})} a las ${format(foundedUser.updated_at, {time: 'short'})}`
                                    :
                                    'N/A'
                                }
                            </p>
                        </div>
                        <div className={styles['UserInfoSection']}>
                            <h6>Numero de Ordenes Creadas</h6>
                            <p>{foundedUser.orders.length || 'N/A'}</p>
                        </div>
                    </div>
                </>
                :
                null
            }
            <Footer/>
        </>
    )
}