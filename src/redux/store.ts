import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user";
import cartSlice from "./cart/cart";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
