import {
    createSlice
} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            {
                const existingCartItemIndex = state.items.findIndex(
                    (item) => item.id === action.payload.id
                );

                const updatedItems = [...state.items];

                if (existingCartItemIndex > -1) {
                    const existingItem = state.items[existingCartItemIndex];
                    const updatedItem = {
                        ...existingItem,
                        quantity: existingItem.quantity + 1,
                    };
                    updatedItems[existingCartItemIndex] = updatedItem;
                } else {
                    updatedItems.push({
                        ...action.payload,
                        quantity: 1
                    });
                }

                return {
                    ...state,
                    items: updatedItems
                };
            }
        },
        removeItem: (state, action) => {

            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.payload
            );

            const existingCartItem = state.items[existingCartItemIndex];

            const updatedItems = [...state.items];
            if (existingCartItem.quantity === 1) {
                updatedItems.splice(existingCartItemIndex, 1);
            } else {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: existingCartItem.quantity - 1,
                };
                updatedItems[existingCartItemIndex] = updatedItem;
            }

            return {
                ...state,
                items: updatedItems
            };
        },
        clearCart: (state) => {
            state.items.length = 0;
        }
    },
});

console.log(cartSlice, " is cartSlice");

export const {
    addItem,
    removeItem,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;