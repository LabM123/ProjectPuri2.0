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

export default function Admin() {

    const {data, setData} = useContext(AppContext)
    const navigate = useNavigate()
    
    const [allOrders, setAllOrders] = useState([])
    const [date, setDate] = useState(format({date: new Date, tz: 'America/Mexico_City', format: 'YYYY-MM-DDTHH:mm:ss'}))

    useEffect(() => {
        document.title = 'Pureza Liquida | Admin'
        if(!data.user) navigate('/login')
        else if(data.user.role !== 'admin') navigate('/')
        else{
            axios.get(`${import.meta.env.VITE_API_URL}/orders`, {headers: {Authorization: `Bearer ${data.token}`}})
            .then(({data}) => {
                setAllOrders(data)
            })
            .catch(error => {
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
        const filteredOrders = []
        for(let i=0;i<allOrders?.length;i++){
            if(sameDay(date, allOrders[i].created_at)){
                filteredOrders.push(
                    <OrderCardAdmin order={allOrders[i]} key={i} token={data.token} data={data} setData={setData} setAllOrders={setAllOrders}/>
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

    return(
        <>
            <NavBar/>
            <div className={styles['AdminBody']}>
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
            <Footer/>
        </>
    )
}