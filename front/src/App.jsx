import { Route, Routes } from 'react-router-dom'
import Home from "./views/Home/Home"
import Login from './views/Login/Login'
import Orders from './views/Orders/Orders'
import Admin from './views/Admin/Admin'
import Default from './views/Default/Default'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/orders" element={<Orders/>}/>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="*" element={<Default/>}/>
    </Routes>
  )
}

export default App
