import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<any>) {
      const payload = action.payload;
      console.log(payload);
      state.totalQuantity += payload.quantity;
      console.log(state.totalQuantity);
    },
    removeItemFromCart(state, action: PayloadAction<any>) {},
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
