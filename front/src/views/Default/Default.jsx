import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Default() {
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/')
    }, [navigate])
    return(
        <div></div>
    )
}