import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
}

const initialState: ICart = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<IProduct>) {
      if (action.payload._id && action.payload.name) {
        const isAvilable = state.products.find(
          (product) => product._id === action.payload._id
        );

        if (isAvilable) {
          const productIndex = state.products.findIndex(
            (product) => product._id === action.payload._id
          );
          const updatedQuantity = Number(isAvilable.quantity) + 1;
          state.products[productIndex].quantity = updatedQuantity;
        } else {
          state.products.push({ ...action.payload, quantity: 1 });
        }
      } else {
        throw new Error('Product is Invalid.');
      }
    },
    removeToCart(state, action: PayloadAction<IProduct>) {
      if (action.payload._id && action.payload.name) {
        const isAvilable = state.products.find(
          (product) => product._id === action.payload._id
        );

        if (isAvilable && isAvilable?.quantity > 1) {
          const productIndex = state.products.findIndex(
            (product) => product._id === action.payload._id
          );
          const updatedQuantity = Number(isAvilable.quantity) - 1;
          state.products[productIndex].quantity = updatedQuantity;
        }
      } else {
        throw new Error('Product is Invalid.');
      }
    },
    deleteToCart(state, action: PayloadAction<Iproudct>) {
      const isAvilable = state.products.find(
        (product) => product._id === action.payload._id
      );
      if (isAvilable) {
        const removeProduct = state.products.filter(
          (product) => product._id !== isAvilable._id
        );
        state.products = removeProduct;
      } else {
        throw new Error('This Product is Not Avilable.');
      }
    },
  },
});

export const { addToCart, removeToCart, deleteToCart } = cartSlice.actions;
export default cartSlice.reducer;
