import { createSlice } from '@reduxjs/toolkit'

const default_products = [
        {
            id: 1,
            name: 'Product 1',
            price: 100,
            quantity: 1,

        },
        {
            id: 2,
            name: 'Product 2',
            price: 200,
            quantity: 1,
        },
        {
            id: 3,
            name: 'Product 3',
            price: 300,
            quantity: 7,
        },
        {
            id: 4,
            name: 'Product 4',
            price: 95,
            quantity: 4,
        }
    ];
export const reduserCart = createSlice({
  name: 'cart',
  initialState: {
    products: localStorage.getItem('products') ?
        JSON.parse(localStorage.getItem('products')) : default_products,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload)
    },
    addQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload)
      product.quantity++
    },
    subQuantity: (state, action) => {
      const product = state.products.find(product => product.id === action.payload)
      if (product.quantity > 1) {
        product.quantity--
      }
    },
    calculateTotal: (state) => {
      state.total = state.products.reduce((total, product) => total + product.price * product.quantity, 0)
    },
  },
});
export const {
    addProduct,
    removeProduct,
    addQuantity,
    subQuantity,
    calculateTotal,
} = reduserCart.actions

export default reduserCart.reducer
