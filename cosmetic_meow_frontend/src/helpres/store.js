import { configureStore } from '@reduxjs/toolkit'
import {reduserCart} from "./reduserCart";

export default configureStore({
  reducer: {
    cart: reduserCart.reducer,
  }
})