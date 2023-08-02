import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { log } from "console";

type CartItem = {
  id: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

type Cart = {
  totalQuantity: number;
  totalPrice: number;
  cart: CartItem[];
};

const initialState: Cart = {
  totalQuantity: 0,
  totalPrice: 0,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      // adjust the generic
      const payload = action.payload;
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (!existingItem) {
        state.cart.push({
          id: payload.id,
          quantity: payload.quantity,
          price: payload.price,
          totalPrice: payload.price * payload.quantity,
        });
      } else {
        existingItem.quantity += payload.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }

      state.totalQuantity += payload.quantity;
      console.log(state.cart[0].id);
    },
    removeItemFromCart(state, action: PayloadAction<CartItem>) {
      const payload = action.payload;
      const existingItem = state.cart.find((item) => item.id === payload.id);
      console.log("EXISTING ITEM : ", existingItem);

      if (existingItem && existingItem.quantity === 1) {
        state.cart.filter((item) => item.id !== payload.id);
      } else {
        if (existingItem && existingItem.quantity > 1) {
          console.log("remove");
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }
      }

      state.totalQuantity -= payload.quantity;

      console.log("ERROR");
    },
    resetCart(state) {
      return (state = initialState);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
