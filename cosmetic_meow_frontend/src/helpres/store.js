import { configureStore } from '@reduxjs/toolkit'
import {reduxCart} from "./reduxCart";

export default configureStore({
  reducer: {
    cart: reduxCart.reducer,
  }
})