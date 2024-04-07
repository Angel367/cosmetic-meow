import { createSlice } from '@reduxjs/toolkit'
import axios, {AxiosError} from "axios";
import getBaseUrl from "../requests/baseUrl";
import fetchData from "../requests/fetchData";

export const reduxCart = createSlice({
  name: 'cart',
  initialState: {
    products: []
  },


  reducers: {

    initiateProducts: (state, action) => {
        state.products = action.payload
    },
    addProduct: (state, action) => {
      let product = {
        id: action.payload.id,
        quantity: action.payload.quantity || 1,
        price: action.payload.price?.price_value || 100,
        // name: action.payload.name,
        // short_description: action.payload.short_description,
        id_in_cart: action.payload.id_in_cart,

      };
      state.products.push(product)
      // localStorage.setItem('products', JSON.stringify(state.products))
        //todo api
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
      // localStorage.setItem('products', JSON.stringify(state.products))
    },
    addQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload)
      product.quantity++
      // localStorage.setItem('products', JSON.stringify(state.products))
    },
    subQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload)
      if (product.quantity > 1) {
        product.quantity--
        // localStorage.setItem('products', JSON.stringify(state.products))
      }
    }
  },
});
export const {

    addProduct,
    removeProduct,
    addQuantity,
    subQuantity,
    initiateProducts
} = reduxCart.actions

export default reduxCart.reducer
