import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useReducer } from "./slice/user";
import { categoryReducer } from "./slice/categories";
import { productReducer } from "./slice/product";

const rootReducer = combineReducers({
    userStore: useReducer,
    categoryStore: categoryReducer,
    productStore : productReducer
})

export type StoreType = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer 
})

export default store;