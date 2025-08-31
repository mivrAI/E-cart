import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';


const View = () => {
  const dispatch = useDispatch();
  const userWishlist = useSelector(state=>state.WishlistReducer);
  const userCart = useSelector(state=>state.cartReducer);

  const [product, setProduct] = useState({});
  const {id} = useParams();
  console.log(id);
  const {allProducts} = useSelector(state=>state.productReducer);
  console.log(allProducts);
  useEffect(()=>{
    if(sessionStorage.getItem("allproducts")){
      const allProducts = JSON.parse(sessionStorage.getItem("allproducts"));
      // console.log(allProducts.find(item=>item.id==id));
      setProduct(allProducts.find(item=>item.id==id));
    }
  },[])
  console.log(product);

  const handleWishlist = ()=>{
    const alreadyAdded = userWishlist.find(item=>item?.id==id);
    if(alreadyAdded){
      alert("product already exist in wishlist")
    }else{
      dispatch(addToWishlist(product));
      alert("product added to wishlist successfully")
    }
  }
  const handleCart = ()=>{
    dispatch(addToCart(product));
    const existingProduct = userCart.find(item=>item?.id==id);
    if(existingProduct){
      alert("product Quantity increased in cart")
    }else{
      alert("product added to cart")
    }
  }
  
  return (
    <>
      <div className='flex flex-col mx-5 grow'>
        <div className='grid grid-cols-2 items-center h-screen'>
          <img src={product?.thumbnail} width={'700px'} alt="" />

          <div>
            <h3 className='font-bold'>PID: {product?.id}</h3>
            <h3 className='text-5xl font-bold'>{product?.title}</h3>
            <h3 className='font-bold text-red-500 text-2xl'>$ {product?.price}</h3>
            <h3 >{product?.brand}</h3>
            <h3>{product?.category}</h3>
            <p>
              <span className='font-bold'>Description</span>:
              {product?.description}
            </p>
            <h3 className='font-bold'>Client review: {
            product?.reviews?.length>0 ? 
              product?.reviews?.map((item)=>(
                <div key={item.date} className='shadow border rounded p-2 mb-2'>
                  <h5>
                    <span className='font-bold'>{item?.reviewerName}</span>: <span>{item?.comment}</span>
                  </h5>
                  <p>Rating: {item?.rating} <i className='fa-solid fa-star text-yellow-400'></i> </p>
                </div>
              )) : <div className='font-bold text-red-500'>No reviews yet</div> 
              }

            </h3>
            <div>
              <button onClick={handleWishlist} className='bg-blue-700 rounded text-white p-2 me-2'>ADD TO WISHLIST</button>
              <button onClick={handleCart} className='bg-green-700 rounded text-white p-2'>ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default View