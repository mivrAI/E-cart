import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// action return promise
export const fetchProducts = createAsyncThunk("products/fetchProducts", async ()=>{
    const result = await axios.get("https://dummyjson.com/products");
    // console.log(result.data.products);
    sessionStorage.setItem("allproducts", JSON.stringify(result.data.products));
    return result.data.products;
})

const productSlice = createSlice({
    name: "products",
    initialState:{
        allProducts: [],
        DummyallProducts: [],
        loading: false,
        error: ""
    },
    reducers:{
        searchProduct: (state,actionByHeader)=>{
            state.allProducts = state.DummyallProducts.filter(item=>item.title.toLowerCase().includes(actionByHeader.payload))
        }

    },
    extraReducers: (builder)=>{
        builder.addCase(fetchProducts.fulfilled,(state,apiResult)=>{
            state.allProducts = apiResult.payload;
            state.DummyallProducts = apiResult.payload;
            state.loading = false;
            state.error = "";
        })
        builder.addCase(fetchProducts.pending,(state)=>{
            state.allProducts = [];
            state.DummyallProducts = [];
            state.loading = true;
            state.error = "";
        })
        builder.addCase(fetchProducts.rejected,(state)=>{
            state.allProducts = [];
            state.DummyallProducts = [];
            state.loading = false;
            state.error = "API call failed";
        })
    }
})
export const {searchProduct} = productSlice.actions;
export default productSlice.reducer;