import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';



const Home = () => {
    const dispatch = useDispatch();
    const { allProducts, loading, error } = useSelector(state => state.productReducer);
    console.log(allProducts, loading, error);

    const [currentPage,setCurrentPage] = useState(1);
    const productsPerPage = 8;
    const totalPages = Math.ceil(allProducts?.length / productsPerPage);
    const currentPageProductLastIndex = currentPage * productsPerPage;
    const currentPageProductFirstIndex = currentPageProductLastIndex - productsPerPage;
    const visisbleAllProducts = allProducts?.slice(currentPageProductFirstIndex,currentPageProductLastIndex);


    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    const navigateToNext = ()=>{
        if(currentPage!=totalPages){
            setCurrentPage(currentPage+1)
        }
    } 
    const navigateToBack = ()=>{
        if(currentPage!=1){
            setCurrentPage(currentPage-1)
        }
    } 
    return (
        <>
            <Header insideHome={true} />
            <div style={{ paddingTop: '100px' }} className='container px-4 mx-auto grow'>
                {
                    loading ? (
                        <div className='flex justify-center items-center'>
                            <img
                                width={'200px'}
                                height={'200px'}
                                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pixilart.com%2Fart%2Floading-gif-028d26275ff2b38&psig=AOvVaw0e7hs4goC6MOY_GGmul1-u&ust=1756191499849000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLiViMCxpY8DFQAAAAAdAAAAABAE" alt="" />
                        </div>
                    ) : (
                        <>
                            <div className='grid grid-cols-4 gap-3.5'>
                                {
                                    allProducts?.length > 0 ?(
                                        visisbleAllProducts.map((products)=>(
                                            <div className='rounded border p-2 shadow border-blue-500 shadow-blue-500'>
                                            <img width={'100%'} height={'200px'} src={products?.thumbnail} alt="pro" />
                                            <div className='text-center'>
                                                <h2 className='text-2xl font-bold'>{products?.title}</h2>
                                                <Link to={`/${products?.id}/view`} className='bg-blue-300 rounded p-1'>View more</Link>
                                            </div>
                                        </div>
                                        ))
                                    )
                                         : <h1 className='flex justify-center items-center font-bold'>No Products Found</h1>
                                }
                            </div>
                            <div className='text-2xl text-center font-bold mt-20'>
                                <span onClick={navigateToBack} className='cursor-pointer'><i className='fa-solid fa-backward me-5'></i></span>
                                <span>{currentPage} of {totalPages}</span>
                                <span onClick={navigateToNext} className='cursor-pointer'><i className='fa-solid fa-forward ms-5'></i></span>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
};

export default Home