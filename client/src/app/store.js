import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice'; 
import cartReducer from '../features/cart/cartSlice'
// import authReducer from '../features/auth/authSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    // auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
