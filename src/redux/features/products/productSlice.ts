import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface IProducts {
  status: boolean;
  priceRange: number;
}
const initialState: IProducts = {
  status: false,
  priceRange: 150,
};
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setToggle: (state) => {
      state.status = !state.status;
    },
    setPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
  },
});

export const { setToggle, setPriceRange } = productSlice.actions;
export default productSlice.reducer;
