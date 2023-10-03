import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./product";


export interface CartItemType {
    quantity: number,
    option: {
        id: string;
        name: string;
        productId: string;
        product: Product;
        product_option_picture:[ {
            id: string;
            picture: string;
        }]
    };
}

export interface GuestCartState {
    cart: CartItemType[]
}

const initialState: GuestCartState = {
    cart: []
}

const GuestCartSlice = createSlice({
    name: "guest-cart",
    initialState,
    reducers: {
        setCart: (state, action) => {
            return {
                ...state,
                cart: action.payload
            }
        }
    }
})

export const guestCartReducer = GuestCartSlice.reducer;
export const guestCartActions = GuestCartSlice.actions;