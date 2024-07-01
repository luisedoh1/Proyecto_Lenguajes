import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: {},
};

export const cartSlice = createSlice(
    {
        name: 'cart',
        initialState,
        reducers: {
            increaseProductQuantity: (state, action) => {
                const product = action.payload.product;

                if (state.products[product.id]) {
                    state.products[product.id].quantity++;
                } else {
                    state.products[product.id] = {
                        quantity: 1,
                        data: product,
                    }
                }
            },
            decreaseProductQuantity: (state, action) => {

            },
            removeProductFromCart: (state, action) => {

            },
        }
    }
);

export const { 
    increaseProductQuantity, 
    decreaseProductQuantity, 
    removeProductFromCart 
} = cartSlice.actions;

export default cartSlice.reducer;
