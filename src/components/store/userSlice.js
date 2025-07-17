import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        progress : ''
    },
    reducers: {
        showCart: (state) => {
            state.progress = 'cart'
        },
        hideCart: (state) => {
            state.progress = ''
        },
        showCheckout: (state) => {
            state.progress = 'checkout'
        },
        hideCheckout: (state) => {
            state.progress = ''
        }
    }
});

export const {showCart, hideCart, showCheckout, hideCheckout} = userSlice.actions;

export default userSlice.reducer;