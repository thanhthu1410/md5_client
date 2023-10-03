import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useReducer } from "./slice/user";
import { categoryReducer } from "./slice/categories";
import { productReducer } from "./slice/product";
import { guestCartReducer } from "./slice/guestCart.slice";

const rootReducer = combineReducers({
    userStore: useReducer,
    categoryStore: categoryReducer,
    productStore : productReducer,
    guestCartStore: guestCartReducer
})

export type StoreType = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer 
})

export default store;