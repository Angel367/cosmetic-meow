import { createSlice } from '@reduxjs/toolkit'

export const reduxCart = createSlice({
  name: 'cart',
  initialState: {
    products: []
  }
  ,
  reducers: {
    initProducts: (state, action) => {
        state.products = action.payload;
    },
    addProduct: (state, action) => {
      let product = {
        id: action.payload.id,
        quantity: 1,
        price: action.payload.price.price_value,
        name: action.payload.name,
        short_description: action.payload.short_description
      };
      state.products.push(product)
      localStorage.setItem('products', JSON.stringify(state.products))
        //todo api
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    addQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload)
      product.quantity++
      localStorage.setItem('products', JSON.stringify(state.products))
    },
    subQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload)
      if (product.quantity > 1) {
        product.quantity--
        localStorage.setItem('products', JSON.stringify(state.products))
      }
    }
  },
});
export const {
    addProduct,
    removeProduct,
    addQuantity,
    subQuantity,

} = reduxCart.actions

export default reduxCart.reducer
