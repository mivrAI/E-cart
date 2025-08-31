import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cartItems",
    initialState: [],
    reducers: {
        // addToCart
        addToCart: (state,actionByComponent)=>{
            const existingProduct = state.find(item=>item.id == actionByComponent.payload.id);
            if(existingProduct){
                existingProduct.quantity++;
                existingProduct.totalprice = existingProduct.quantity * existingProduct.price;
                const remainingProducts = state.filter(item=>item.id != existingProduct.id);
                return [...remainingProducts,existingProduct];
            }else{
                state.push({...actionByComponent.payload,quantity:1,totalprice:actionByComponent.payload.price})
            }
        },
        increaseQuantity: (state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id == actionByCart.payload);
            existingProduct.quantity++;
            existingProduct.totalprice = existingProduct.quantity * existingProduct.price;
            const remainingProducts = state.filter(item=>item.id != existingProduct.id);
            return [...remainingProducts,existingProduct];
        },
        decrementQuantity: (state,actionByCart)=>{
            const existingProduct = state.find(item=>item.id == actionByCart.payload);
            existingProduct.quantity--;
            existingProduct.totalprice = existingProduct.quantity * existingProduct.price;
            const remainingProducts = state.filter(item=>item.id != existingProduct.id);
            return [...remainingProducts,existingProduct];
        },
        removecartItem: (state,actionByCart)=>{
            return state.filter(item=>item.id != actionByCart.payload);
        },
        emptyCart: (state)=>{
            return state = [];
        }

    }
})

export const { addToCart,increaseQuantity,removecartItem,decrementQuantity,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;