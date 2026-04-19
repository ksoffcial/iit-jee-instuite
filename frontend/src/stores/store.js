import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../authSlice"
import enrollReducer from "../enrollSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        enroll:enrollReducer
    }
})