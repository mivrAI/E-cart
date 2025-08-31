import { Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import View from './pages/View'
import Pnf from './pages/Pnf'

function App() {

  return (
    <div className='flex flex-col min-h-screen'>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/wishlist' element={<Wishlist/>}></Route>
      <Route path='/:id/view' element={<View/>}></Route>
      <Route path='/*' element={<Pnf/>}></Route>
    </Routes>    
    <Footer/>
    </div>
  )
}

export default App
