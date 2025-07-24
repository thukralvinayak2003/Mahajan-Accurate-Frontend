// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import productReducer from "../features/product/productSlice"; 

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer, // ✅ Register it here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
