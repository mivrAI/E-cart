import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';



const Wishlist = () => {
    const dispatch = useDispatch();
    const userWishlist = useSelector(state=>state.WishlistReducer);
    const userCart = useSelector(state=>state.cartReducer);
    
    const handleCart = (product)=>{
        dispatch(removeItem(product.id));
        dispatch(addToCart(product));
        const existingProduct = userCart?.find(item=>item?.id==product.id);
        if(existingProduct){
          alert("product Quantity increased in cart")
        }else{
          alert("product added to cart")
        }
      }
  return (
    <>
    {
        userWishlist?.length>0 ? 
        <div style={{paddingTop:"100px"}} className='px-5 grow'>
        <h1 className='text-4xl font-bold mb-5 text-indigo-600'>Wishlist</h1>
        <div className='grid grid-cols-4 gap-3.5'>
            {
                userWishlist.map((products)=>(
                <div key={products?.id} className='rounded border p-2 shadow border-blue-500 shadow-blue-500'>
                <img width={'100%'} height={'200px'} src={products?.thumbnail} alt="pro" />
                <div className='text-center'>
                    <h2 className='text-2xl font-bold'>{products?.title}</h2>
                    <div className='space-x-2.5'>
                        <button onClick={()=>dispatch(removeItem(products?.id))} className='text-xl'><i class="fa-solid fa-heart-circle-xmark text-red-500"></i></button>
                        <button onClick={handleCart} className='text-xl'><i class="fa-solid fa-cart-shopping"></i></button>
                    </div>
                    
                </div>
            </div>
                ))
            }
        </div>
    </div>
    : <div className='flex justify-center items-center h-screen'>
        <img src="https://grocarto.com/assets/images/User/gif/cartGif.gif" alt="" />
        <h1 className='text-3xl text-red-600'>your wishlist is empty</h1>
    </div>
    }
    </>
  )
}

export default Wishlist