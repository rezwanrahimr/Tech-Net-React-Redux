import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ICart {
  products: IProduct[];
  totalPrice: number;
}

const initialState: ICart = {
  products: [],
  totalPrice: 0,
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
          state.totalPrice += action.payload.price;
        } else {
          state.products.push({ ...action.payload, quantity: 1 });
          state.totalPrice += action.payload.price;
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
          state.totalPrice -= action.payload.price;
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
        const calculatePrice =
          Number(isAvilable.quantity) * Number(isAvilable.price);
        state.totalPrice -= calculatePrice;
      } else {
        throw new Error('This Product is Not Avilable.');
      }
    },
  },
});

export const { addToCart, removeToCart, deleteToCart } = cartSlice.actions;
export default cartSlice.reducer;
