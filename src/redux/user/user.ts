import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  email: null | string;
  firstname: null | string;
  lastname: null | string;
};

const initialState: UserState = {
  email: null,
  firstname: null,
  lastname: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<null>) {
      const payload = action.payload;
      state.email = payload.email;
      state.firstname = payload.firstname;
      state.lastname = payload.lastname;
    },
    logout(state) {
      return (state = initialState);
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
