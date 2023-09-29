
import { createSlice } from "@reduxjs/toolkit";

export interface ProductState {
    data: any
    reLoad : boolean
}

const initialState: ProductState = { 
    data: null,
    reLoad: false

}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setData : (state,action ) => {
            return {   
                ...state,
                data : action.payload             
            }
        },
        reload: (state) => {
            return {
                ...state,
                reLoad: !state.reLoad,

            }
        }
    }
})


export const productAction = {
    ...productSlice.actions
}
export const productReducer = productSlice.reducer
