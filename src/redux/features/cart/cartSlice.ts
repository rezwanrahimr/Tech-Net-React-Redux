import { IProduct } from "@/types/globalTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface ICart {
    products: IProduct[];
}

const initialState: ICart = {
    products: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<IProduct>) {
            const isAvilable = state.products.find(product => product._id === action.payload._id);
            const filterProducts = state.products.filter(product => product._id !== action.payload._id);
            if (action.payload._id && action.payload.name) {
                if (isAvilable) {
                    const updatedQuantity = Number(isAvilable.quantity) + 1;
                    state.products = [...filterProducts, { ...action.payload, quantity: updatedQuantity }]
                } else {
                    state.products.push({ ...action.payload, quantity: 1 });
                }

            } else {
                throw new Error("Product is Invalid.")
            }
        }
    }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;