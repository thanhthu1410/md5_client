
import { createSlice } from "@reduxjs/toolkit";

export interface CategoryState {
    
    data: any
}
const initialState: CategoryState = {
    data: null
}
const categoryStore = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setData : (state : CategoryState,action ) => {
            return {
                data : action.payload
            }
        }
    }
})


export const categoryAction = {
    ...categoryStore.actions
}
export const categoryReducer = categoryStore.reducer
