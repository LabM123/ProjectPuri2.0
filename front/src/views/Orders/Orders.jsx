import { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import NavBar from '../../components/NavBar/NavBar'
import styles from './Orders.module.css'
import { AppContext } from '../../AppContext'
import { useNavigate } from 'react-router-dom'
import { addDay, format, sameDay } from '@formkit/tempo'
import OrderCardUser from '../../components/OrderCardUser/OrderCardUser'
import Swal from 'sweetalert2'
import axios from 'axios'
import checkIcon from '../../assets/checkicon.svg'
import locationIcon from '../../assets/locationicon.svg'

export default function Orders(){

    const {data, setData} = useContext(AppContext)
    const userData = data
    const allUserOrders = data?.user?.orders;
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Pureza Liquida | Repartos'
        if(!data.user) navigate('/login')
        else if(data.user.role === 'admin') navigate('/admin')
        else{
            axios.get(`${import.meta.env.VITE_API_URL}/orders/users/${data.user.id}`, {headers: {Authorization: `Bearer ${data.token}`}})
            .then(({data}) => {
                setData({
                    ...userData,
                    user: {
                        ...userData.user,
                        orders: data
                    }
                })
            })
            .catch(error => {
                navigate('/login')
                console.log(error)
                Swal.fire({
                    title: 'Oops...', 
                    icon: 'error', 
                    text: error.response.data.message[0]
                })
            })
        }
    }, [])

    useEffect(()=> {
        if(!data.user) navigate('/login')
    }, [data.user, navigate])

    const [date, setDate] = useState(format({date: new Date, tz: 'America/Mexico_City', format: 'YYYY-MM-DDTHH:mm:ss'}))

    const handleChangeDate = (e) => {
        setDate(e.target.value)
    }

    const displayDateOptions = () => {
        const allOptions = []
        for(let i = 0; i < 10; i++){
            allOptions.push(
            <option value={format({date: addDay(new Date, -i), format: 'YYYY-MM-DDTHH:mm:ss'})}>
                { i === 0 ? 'Hoy' : `Hace ${i} dia(s)`}
            </option>
            )
        }
        return allOptions
    }

    const displayOrders= () => {
        const filteredOrders = []
        for(let i=0;i<allUserOrders?.length;i++){
            if(sameDay(date, allUserOrders[i].created_at)){
                filteredOrders.push(
                    <OrderCardUser bottles_amount={allUserOrders[i].bottles_amount} section={allUserOrders[i].section} external_number={allUserOrders[i].external_number} internal_number={allUserOrders[i].internal_number} status={allUserOrders[i].status} id={allUserOrders[i].id} created_at={allUserOrders[i].created_at}/>
                )
            }
        }
        if(!filteredOrders.length){
            return(
                <p className={styles['Message']}>No tienes ordenes para este dia</p>
            )
        } else {
            return filteredOrders
        }
    }

    const initialNewOrder = {
        external_number: '',
        internal_number: '',
        section: '',
        bottles_amount: '',
        latitude: '',
        longitude: '',
        user_id: data?.user?.id
    }

    const handleGetLocation = () => {
        navigator.geolocation.getCurrentPosition(setterGetLocation, errorGetLocation, {enableHighAccuracy: true, timeout: 10000, maximumAge: 0})
    }

    const setterGetLocation = (position) => {
        setNewOrder({
            ...newOrder,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
        })
    }

    const errorGetLocation = () => {
        Swal.fire({
            title: 'Oops...',
            text: 'Error al adjuntar ubicacion',
            icon: 'error'
        })
    }

    const [newOrder, setNewOrder] = useState(initialNewOrder)

    const handleChangeNewOrder = (e) => {
        setNewOrder({
            ...newOrder,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmitNewOrder = (e) => {
        e.preventDefault()
        if(!newOrder.external_number || !newOrder.internal_number || !newOrder.section || !newOrder.bottles_amount) Swal.fire({title: 'Oops...', text: 'Asegurate de llenar los campos requeridos', icon: 'warning'})
        else {
            axios.post(`${import.meta.env.VITE_API_URL}/orders`, {...newOrder, bottles_amount: Number(newOrder.bottles_amount)}, {headers: {Authorization: `Bearer ${data.token}`}})
            .then(({data}) => {
                setData({
                    ...userData,
                    user: {
                        ...userData.user,
                        orders: data
                    }
                })
                setNewOrder(initialNewOrder)
                Swal.fire({
                    title: 'Reparto agendado',
                    icon: 'success'
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
            <div className={styles['OrdersBody']}>
                <div className={styles['OrdersForm']}>
                    <h2>Crea una orden</h2>
                    <form onSubmit={handleSubmitNewOrder}>
                        <div className={styles['InputSection']}>
                            <label htmlFor="external_number">Mz/Agrupamiento</label>
                            <input type="text" onChange={handleChangeNewOrder} name='external_number' id='external_number' value={newOrder.external_number}/>
                        </div>
                        <div className={styles['InputSection']}>
                            <label htmlFor="internal_number">Lote/Casa</label>
                            <input type="text" onChange={handleChangeNewOrder} name='internal_number' value={newOrder.internal_number} id='internal_number'/>
                        </div>
                        <div className={styles['InputSection']}>
                            <label htmlFor="section">Seccion</label>
                            <select name="section" id="section" onChange={handleChangeNewOrder}>
                                <option value="">-Elige-</option>
                                <option value="2da">2da</option>
                                <option value="3ra">3ra</option>
                            </select>
                        </div>
                        <div className={styles['InputSection']}>
                            <label htmlFor="bottles_amount">No. de Garrafones</label>
                            <input type="number" min={1} max={20} onChange={handleChangeNewOrder} name='bottles_amount' value={newOrder.bottles_amount} id='bottles_amount' placeholder='min(1) max(20)'/>
                        </div>
                        <div className={styles['InputSection']}>
                            <div onClick={newOrder.latitude&&newOrder.longitude ? null : handleGetLocation} className={`${styles['GetLocationButton']} ${newOrder.latitude&&newOrder.longitude ? styles['clickable'] : 'unclickable'}`}>
                                {
                                    newOrder.latitude && newOrder.longitude
                                    ?
                                    <img src={checkIcon} alt="" className={styles['CheckIcon']}/>
                                    :
                                    <>
                                        <img src={locationIcon} alt="" className={styles['LocationIcon']}/>
                                        <p>Adjuntar Ubicacion Exacta</p>
                                    </>
                                }
                            </div>
                        </div>
                        <div className={styles['InputSection']}>
                            <button type='submit'>Enviar</button>
                        </div>
                    </form>
                    <p className={styles['Advice']}>Adjuntar la ubicacion exacta ayuda a nuestros repartidores a encontrar mas facilmente su domicilio (No recomendado en PC)</p>
                </div>
                <hr />
                <div className={styles['OrdersUser']}>
                    <div className={styles['OrdersUserHeader']}>
                        <h2>Tus Ordenes</h2>
                        <select name="date" id="selectedDate" onChange={handleChangeDate}>
                            {displayDateOptions()}
                        </select>
                    </div>
                    <div className={styles['OrdersUserBody']}>
                        {displayOrders()}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}