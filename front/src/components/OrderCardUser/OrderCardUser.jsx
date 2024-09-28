import { format } from '@formkit/tempo'
import styles from './OrderCardUser.module.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../../AppContext'

export default function OrderCardUser({id, bottles_amount, section, external_number, internal_number, status, created_at}){
    const formatedDate = format({
        date: created_at,
        tz: 'America/Mexico_City',
        format: 'medium'
    })

    const {data, setData} = useContext(AppContext)
    const userData = data

    const handleCancel = () => {
        Swal.fire({
            title: 'Seguro que quieres cancelar el reparto?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'No',
            cancelButtonColor: 'red',
            confirmButtonText: 'Si, quiero cancelar'
        })
        .then((response) => {
            if(response.isConfirmed){
                axios.put(`${import.meta.env.VITE_API_URL}/orders/cancel/${id}`, {}, {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                })
                .then(({data}) => {
                    setData({
                        ...userData,
                        user: {
                            ...userData.user,
                            orders: data
                        }
                    })
                    Swal.fire({
                        title: 'Reparto cancelado',
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
        })
    }
    return(
        <div className={styles['CardBody']}>
            <div className={styles['OrderInfo']}>
                <div className={styles['OrderExternalNumber']}>
                    <h6>Mz/Agrup</h6>
                    <p>{external_number}</p>
                </div>
                <div className={styles['OrderInternalNumber']}>
                    <h6>Lt/Casa</h6>
                    <p>{internal_number}</p>
                </div>
                <div className={styles['OrderSection']}>
                    <h6>Seccion</h6>
                    <p>{section}</p>
                </div>
                <div className={styles['OrderBottlesAmount']}>
                    <h6>No. de Garrafones</h6>
                    <p>{bottles_amount}</p>
                </div>
                <div className={styles['OrderDate']}>
                    <h6>Fecha</h6>
                    <p>{formatedDate}</p>
                </div>
                <div className={styles['OrderHour']}>
                    <h6>Hora</h6>
                    <p>{format(created_at,{time: 'short'})}</p>
                </div>
            </div>
            <div className={styles['OrderButtons']}>
                <button onClick={handleCancel} disabled={status !== 'Pendiente'}>Cancelar</button>
            </div>
            <div className={`${styles['OrderStatus']} ${styles[status]}`}>{status}</div>
        </div>
    )
}