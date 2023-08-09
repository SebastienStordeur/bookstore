import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auth, getAuth, signOut } from "firebase/auth";

type UserState = {
  isAuthenticated: boolean;
  email: null | string;
  firstname: null | string;
  lastname: null | string;
};

const initialState: UserState = {
  isAuthenticated: false,
  email: null,
  firstname: null,
  lastname: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserState>) {
      const payload = action.payload;
      console.log(payload);
      state.email = payload.email;
      state.firstname = payload.firstname;
      state.lastname = payload.lastname;
      state.isAuthenticated = true;
    },
    logout(state) {
      const auth: Auth = getAuth();
      signOut(auth)
        .then(() => {
          state = initialState;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    retrieveProfile(state) {
      console.log(state);
      /* const payload = action.payload; */
      state.firstname = "Sebastien";
      state.isAuthenticated = true;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
