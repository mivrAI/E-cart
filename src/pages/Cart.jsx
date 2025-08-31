import React, { useEffect, useState } from 'react'
import Shoe from '../assets/nike-vomero.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, emptyCart, increaseQuantity } from '../redux/cartSlice';
import { removecartItem } from '../redux/cartSlice';



const Cart = () => {
  const navigate = useNavigate()
  const userCart = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(()=>{
    if(userCart?.length>0){
      setTotalAmount(userCart?.map(item=>item.totalprice).reduce((a1,a2)=>a1+a2))
    }
  },[userCart])

  const handleDecrement = (item)=>{
    if(item?.quantity > 1){
      dispatch(decrementQuantity(item?.id))
    }else{
      dispatch(removecartItem(item?.id))
    }
  }
  const checkout = ()=>{
    dispatch(emptyCart());
    alert("checkout successful");
    // redirect to home page
    navigate('/');
  }

  return (
    <>
      {
        userCart?.length > 0 ?
          <div style={{ paddingTop: '100px' }} className='container px-4 mx-auto grow'>
            <h1 className='text-4xl font-bold mb-5 text-indigo-600'>Cart Summary</h1>
            <div className='grid grid-cols-3 gap-4 mt-5'>
              <div className='col-span-2 rounded border p-2 shadow border-blue-500 shadow-blue-500'>
                <table className='table-auto w-full'>
                  <thead>
                    <tr>
                      <th className=' px-4 py-2'>#</th>
                      <th className=' px-4 py-2'>Name</th>
                      <th className=' px-4 py-2'>Image</th>
                      <th className=' px-4 py-2'>Quantity</th>
                      <th className=' px-4 py-2'>Price</th>
                      <th className=' px-4 py-2'>...</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      userCart.map((item, index) => (
                        <tr>
                          <td className=' px-4 py-2'>{index+1}</td>
                          <td className=' px-4 py-2'>{item?.title}</td>
                          <td><img src={item?.thumbnail} width={'80px'} height={'70px'} alt="" /></td>
                          <td>
                            <div className='flex'>
                              <button onClick={()=>handleDecrement(item)} className='font-bold'>-</button>
                              <input style={{ width: "40px" }} type="text" className='border p-1 rounded mx-2' value={item?.quantity} readOnly />
                              <button onClick={()=>dispatch(increaseQuantity(item?.id))} className='font-bold'>+</button>
                            </div>
                          </td>
                          <td className=' px-4 py-2'>${item?.totalprice}</td>
                          <td><button onClick={()=>dispatch(removecartItem(item?.id))} className='text-red-600'><i class="fa-solid fa-trash"></i></button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
                <div className='float-right mt-5'>
                  <button onClick={()=>dispatch(emptyCart())} className='bg-red-600 rounded text-white p-2'>Clear Cart</button>
                  <Link to={'/'}>
                    <button className='bg-indigo-600 rounded text-white p-2 ms-2'>Shop More</button>
                  </Link>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='border p-5 rounded shadow border-blue-500 shadow-blue-500'>
                  <h2 className='text-2xl font-bold'>Total Amount: <span className='text-red-600'>${totalAmount}</span></h2>
                  <hr />
                  <button onClick={checkout} className='bg-green-600 rounded text-white p-2 mt-5 w-full'>Checkout Now</button>
                </div>

              </div>
            </div>
          </div> :
          <div className='flex justify-center items-center h-screen'>
            <img src="https://grocarto.com/assets/images/User/gif/cartGif.gif" alt="" />
            <h1 className='text-3xl text-red-600'>your cart is empty</h1>
          </div>
      }
    </>
  )
}

export default Cart