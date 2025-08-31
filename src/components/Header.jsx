import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { searchProduct } from '../redux/productSlice';

const Header = ({insideHome}) => {
  const Dispatch = useDispatch();
    const userWishlist = useSelector(state=>state.WishlistReducer);
    const userCart = useSelector(state=>state.cartReducer);

  return (
    <div>
        <nav className='flex fixed text-white w-full p-5 bg-indigo-500'>
            <a href="/" className='text-4xl font-bold text-white'><i class="fa-solid fa-truck-fast"></i>E-Cart</a>
            <ul className='flex-1 text-right'>
                {
                  insideHome && <li className='list-none inline-block px-5'><input onChange={e=>Dispatch(searchProduct(e.target.value.toLowerCase()))} style={{width:"300px"}} className='bg-white text-black rounded border p-2' placeholder='Search products Name' type='text'></input></li>
                }
                <Link to={'/wishlist'}><li className='list-none inline-block px-5'><i class="fa-solid fa-heart text-red-500"></i>Whishlist <span className='bg-black text-white rounded p-1'>{userWishlist?.length}</span></li></Link>
                <Link to={'/cart'}><li className='list-none inline-block px-5'><i class="fa-solid fa-cart-shopping"></i>Cart <span className='bg-black text-white rounded p-1'>{userCart?.length}</span></li></Link>
            </ul>
        </nav>
    </div>
  )
}

export default Header