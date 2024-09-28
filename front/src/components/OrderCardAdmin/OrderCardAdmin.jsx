import { format } from '@formkit/tempo'
import styles from './OrderCardAdmin.module.css'
import { useState } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function OrderCardAdmin({order, data, setData, token, setAllOrders}){
    const [isOpen, setIsOpen] = useState(false)
    const toogleIsOpen = () => {setIsOpen(!isOpen)}

    const handleCancelOrder = () => {
        Swal.fire({
            title: 'Seguro que quieres cancelar el reparto?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: 'red',
            cancelButtonText: 'No',
            confirmButtonText: 'Si, quiero cancelar'
        })
        .then(response => {
            if(response.isConfirmed){
                toogleIsOpen()
                axios.put(`${import.meta.env.VITE_API_URL}/orders/cancel/${order.id}`, {}, {headers: {Authorization: `Bearer ${token}`}})
                .then(() => {
                    axios.get(`${import.meta.env.VITE_API_URL}/orders`, {headers: {Authorization: `Bearer ${token}`}})
                    .then(({data}) => {
                        setAllOrders(data)
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
                            text: error.response.data.message
                        })
                    })
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
        })
    }

    const handleReactivateOrder = () => {
        Swal.fire({
            title: 'Seguro que quieres reactivar el reparto?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: 'red',
            cancelButtonText: 'No',
            confirmButtonText: 'Si, quiero reactivar'
        })
        .then(response => {
            if(response.isConfirmed){
                toogleIsOpen()
                axios.put(`${import.meta.env.VITE_API_URL}/orders/pending/${order.id}`, {}, {headers: {Authorization: `Bearer ${token}`}})
                .then(() => {
                    axios.get(`${import.meta.env.VITE_API_URL}/orders`, {headers: {Authorization: `Bearer ${token}`}})
                    .then(({data}) => {
                        setAllOrders(data)
                        Swal.fire({
                            title: 'Reparto reactivado', 
                            icon: 'success'
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        Swal.fire({
                            title: 'Oops...', 
                            icon: 'error', 
                            text: error.response.data.message
                        })
                    })
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
        })
    }

    const handleFinishOrder = () => {
        Swal.fire({
            title: 'Seguro que quieres finaizar el reparto?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: 'red',
            cancelButtonText: 'No',
            confirmButtonText: 'Si, quiero finalizar'
        })
        .then(response => {
            if(response.isConfirmed){
                toogleIsOpen()
                axios.put(`${import.meta.env.VITE_API_URL}/orders/complete/${order.id}`, {}, {headers: {Authorization: `Bearer ${token}`}})
                .then(() => {
                    axios.get(`${import.meta.env.VITE_API_URL}/orders`, {headers: {Authorization: `Bearer ${token}`}})
                    .then(({data}) => {
                        setAllOrders(data)
                        Swal.fire({
                            title: 'Reparto finalizado', 
                            icon: 'success'
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        Swal.fire({
                            title: 'Oops...', 
                            icon: 'error', 
                            text: error.response.data.message
                        })
                    })
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
        })
    }
    return(
        <>
            <div className={styles['CardBody']} onClick={toogleIsOpen}>
                <div className={styles['CardMain']}>
                    <div className={styles['CardInfo']}>
                        <h6>Mz/Agrup</h6>
                        <p>{order.external_number}</p>
                    </div>
                    <div className={styles['CardInfo']}>
                        <h6>Lt/Casa</h6>
                        <p>{order.internal_number}</p>
                    </div>
                    <div className={styles['CardInfo']}>
                        <h6>Secc</h6>
                        <p>{order.section}</p>
                    </div>
                    <div className={styles['CardInfo']}>
                        <h6>No. Garrafones</h6>
                        <p>{order.bottles_amount}</p>
                    </div>
                    <div className={styles['CardInfo']}>
                        <h6>Hora</h6>
                        <p>{format(order.created_at, {time: 'short'})}</p>
                    </div>
                </div>
                <div className={`${styles['CardStatus']} ${styles[order.status]}`}>{order.status}</div>
            </div>
            <div className={`${styles['ModalBackground']} ${isOpen ? styles['open'] : styles['closed']}`} onClick={toogleIsOpen}>
            </div>
                <div className={`${styles['ModalBody']} ${isOpen ? styles['open'] : styles['closed']}`}>
                    <div className={styles['ModalInfo']}>
                        <div className={styles['OrderInfo']}>
                            <h6>Mz/Agrup</h6>
                            <p>{order.external_number}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Lt/Casa</h6>
                            <p>{order.internal_number}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Seccion</h6>
                            <p>{order.section}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>No. de Garrafones</h6>
                            <p>{order.bottles_amount}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Estado</h6>
                            <p>{order.status}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>ID del Reparto</h6>
                            <p>{order.id}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Fecha(Subida)</h6>
                            <p>{format(order.created_at, {date: 'long'})}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Hora(Subida)</h6>
                            <p>{format(order.created_at, {time: 'short'})}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Fecha(Actualizacion)</h6>
                            <p>{
                                order.updated_at 
                                ?
                                format(order.updated_at, {date: 'long'})
                                :
                                'N/A'
                            }</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Hora(Actualizacion)</h6>
                            <p>{
                                order.updated_at 
                                ?
                                format(order.updated_at, {time: 'short'})
                                :
                                'N/A'
                            }</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>ID del Usuario</h6>
                            <p>{order.user.id}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Nombre del Usuario</h6>
                            <p>{order.user.name}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Usuario Creado(Fecha)</h6>
                            <p>{format(order.user.created_at, {date: 'long'})}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Usuario Creado(Hora)</h6>
                            <p>{format(order.user.created_at, {time: 'short'})}</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Usuario Actualizado(Fecha)</h6>
                            <p>{
                                order.user.updated_at
                                ?
                                format(order.user.updated_at, {date: 'long'})
                                :
                                'N/A'
                            }</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Usuario Actualizado(Hora)</h6>
                            <p>{
                                order.user.updated_at
                                ?
                                format(order.user.updated_at, {time: 'short'})
                                :
                                'N/A'
                            }</p>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Correo del Usuario</h6>
                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Telefono del Usuario</h6>
                            {
                                order.user.phone_number
                                ?
                                <a href={`tel:${order.user.phone_number}`}>{order.user.phone_number}</a>
                                :
                                <p>N/A</p>
                            }
                        </div>
                        <div className={styles['OrderInfo']}>
                            <h6>Ubicacion del Reparto</h6>
                            {
                                order.latitude&&order.longitude
                                ?
                                <a href={`https://www.google.com/maps?q=${order.latitude},${order.longitude}`} target="_blank">Ver en Google Maps</a>
                                :
                                <p>N/A</p>
                            }
                        </div>
                    </div>
                    <div className={styles['ModalButtons']}>
                        <button onClick={handleCancelOrder}>Cancelar</button>
                        <button onClick={handleReactivateOrder}>Reactivar</button>
                        <button onClick={handleFinishOrder}>Finalizar</button>
                    </div>
                </div>
        </>
    )
}