import { createSlice } from '@reduxjs/toolkit';
const GuestCartSlice = createSlice({
    name: 'guestcart',
    initialState:{
        cart : []
    },
    reducers:{
        setCart: (state,action) => {
            return {
                ...state,
                cart: action.payload
            }
        }
    }
})