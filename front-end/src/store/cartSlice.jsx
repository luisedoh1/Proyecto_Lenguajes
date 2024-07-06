import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: {},
};

export const cartSlice = createSlice({
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
                };
            }
        },
        decreaseProductQuantity: (state, action) => {
            const productId = action.payload.productId;

            if (state.products[productId]) {
                if (state.products[productId].quantity > 1) {
                    state.products[productId].quantity--;
                } else {
                    delete state.products[productId];
                }
            }
        },
        removeProductFromCart: (state, action) => {
            const productId = action.payload.productId;
            if (state.products[productId]) {
                delete state.products[productId];
            }
        },
    },
});

export const {
    increaseProductQuantity,
    decreaseProductQuantity,
    removeProductFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
