import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className='bg-indigo-500 text-white p-5 mt-5 w-full'>
        <div className='flex justify-between p-5'>
          <div className='flex flex-col'>
            <h1 className='text-2xl font-bold text-white'><i class="fa-solid fa-truck-fast"></i>E-Cart</h1>
            <p>designed and build with all the love in the world by the luminar team with the help of our contributers.</p>
            <p>code licensed luminar , docs cc by 3.0</p>
            <p>Currently v5.3.2</p>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold'>Links</h2>
            <Link to={'/'}><p>Home</p></Link>
            <Link to={'/wishlist'}><p>Wishlist</p></Link>
            <Link to={'/hisory'}><p>History</p></Link>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold'>About us</h2>
            <p>About us</p>
            <p>Contact us</p>
            <p>Support us</p>
            <p>Privacy Policy</p>
            <p>Terms of service</p>
          </div>
          <div className='flex flex-col'>
            <h2 className='text-2xl font-bold'>Follow us on</h2>
            <div>
              <div className='w-52 border-b-4 border-white'>
                <input className='bg-indigo-500 text-white w-full p-2' type="text" placeholder='Enter your email' />
              </div>
            </div>
            <div className='space-x-4 text-2xl mt-2'>
              <i class="fa-brands fa-facebook"></i>
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-twitter"></i>
              <i class="fa-brands fa-github"></i>
              <i class="fa-brands fa-linkedin"></i>
            </div>
          </div>
        </div>
        <hr />
        <div className='text-center mt-5'>
          <h2 className='text-2xl font-bold'>&copy; All rights reserved 2025</h2>
          <p>E-Cart</p>
        </div>

      </footer>
    </div>
  )
}

export default Footer