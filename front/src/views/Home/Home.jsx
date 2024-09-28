import styles from './Home.module.css'
import recycleIconCard from '../../assets/recyclecard.svg'
import waterdropIconCard from '../../assets/waterdropcard.svg'
import deliveryTruckIconCard from '../../assets/deliverytruckcard.svg'
import ServiceCard from '../../components/ServiceCard/ServiceCard'
import BenefitCard from '../../components/BenefitCard/BenefitCard'
import FAQItem from '../../components/FAQItem/FAQItem'
import NavBar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import { Link } from 'react-router-dom'

export default function Home() {

    useEffect(() => {
        document.title = 'Pureza Liquida | Inicio'
    }, [])

    const {data, setData} = useContext(AppContext)

    const serviceCardsInfo = [
        {
            image: recycleIconCard,
            title: 'Lavado de Garrafones',
            content: 'Limpieza profunda y desinfeccion de tus garrafones para garantizar la maxima higiene'
        },
        {
            image: waterdropIconCard,
            title: 'Llenado de Garrafones',
            content: 'Rellenamos tus garrafones con agua purificada de la mas alta calidad'
        },
        {
            image: deliveryTruckIconCard,
            title: 'Servicio a Domicilio',
            content: 'Entregamos garrafones llenos directamente en tu hogar o negocio'
        }
    ]

    const renderServiceCards = () => {
        return serviceCardsInfo.map((card, index) => {
            return <ServiceCard image={card.image} title={card.title} content={card.content} key={index}/>
        })
    }

    const benefitsCardsInfo = [
        {
            title: 'Agua 100% Pura',
            content: 'Disfruta de agua limpia y segura, libre de contaminantes o sabores desagradables'
        },
        {
            title: 'Comodidad',
            content: 'Recibe tus garrafones directamente en tu puerta, sin esfuerzo ni perdida de tiempo'
        },
        {
            title: 'Higiene Garantizada',
            content: 'Nuestro proceso de lavado asegura que cada garrafon este perfectamente limpio y desinfectado'
        },
        {
            title: 'Ecologico',
            content: 'Al reutilizar los garrafones, contribuyes a reducir el uso de plasticos de un solo uso'
        },
    ]

    const renderBenefitsCards = () => {
        return benefitsCardsInfo.map((card, index) => {
            return <BenefitCard title={card.title} content={card.content} key={index}/>
        })
    }
    
    const FAQItemsInfo = [
        {
            question: 'Como funciona el servicio a domicilio?',
            answer: 'Nuestro servicio a domicilio esta disponible todos los dias. Puedes programar una entrega llamando a nuestro numero o usando nuestra aplicacion movil. Recogemos los garrafones vacios para su lavado y llenado y los entregamos'
        },
        {
            question: 'Cual es el proceso de lavado y llenado de los garrafones?',
            answer: 'Utilizamos un proceso de limpieza de 5 pasos que incluye enjuague, lavado con detergente biodegradable, desinfeccion, enjuague final y llenado con agua purificada. Todo el proceso se realiza con estrictas normas de higiene'
        },
        {
            question: 'Que metodos de purificacion utilizan?',
            answer: 'Nuestro proceso de purificacion incluye filtracion de sedimentos, carbon activado y desinfeccion UV para garantizar la mas alta calidad en su agua'
        },
    ]

    const renderFAQItems = () => {
        return FAQItemsInfo.map((card, index) => {
            return <FAQItem question={card.question} answer={card.answer} key={index}/>
        })
    }
    return(
        <>
            <NavBar/>
            <div className={styles['HomeMain']} id='home'>
                <h2>Pureza Liquida: Refrescando Tu Vida</h2>
                <h3>Servicio de purificacion, lavado y entrega de garrafones a domicilio</h3>
                <Link className={styles['button']} to={data.user ? '/orders' : '/login'}>Solicita Nuestro Servicio</Link>
            </div>
            <div className={styles['HomeServices']}>
                <h2>Nuestros Servicios Principales</h2>
                <div className={styles['HomeServicesCards']}>
                    {renderServiceCards()}
                </div>
            </div>
            <div className={styles['HomeBenefits']}>
                <h2>Beneficios de Nuestro Servicio</h2>
                <div className={styles['HomeBenefitsCards']}>
                    {renderBenefitsCards()}
                </div>
            </div>
            <div className={styles['HomeFAQ']}>
                <h2 id='faq'>Preguntas Frecuentes</h2>
                <div className={styles['HomeFAQItems']}>
                    {renderFAQItems()}
                </div>
            </div>
            <Footer/>
        </>
    )
}