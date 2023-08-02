"use client";

import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";
import { cartActions } from "@/redux/cart/cart";
import { RootState } from "@/redux/store";
import { userActions } from "@/redux/user/user";
import { Auth, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const auth: Auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.user.firstname);

  onAuthStateChanged(auth, (user) => {
    setIsAuthenticated(() => (user === null ? false : true));
    if (user !== null) {
      dispatch(userActions.retrieveProfile());
    }
    return user;
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => dispatch(userActions.logout()))
      .catch((error) => {
        console.log("ERROR");
      });
  };

  const addItem = () => {
    const quantity = 2;
    dispatch(cartActions.addItemToCart({ quantity }));
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignupForm />

      <h1>LOGIN {name}</h1>
      {isAuthenticated && <p>Authenticated</p>}
      {!isAuthenticated && <p>Not authenticated</p>}
      <LoginForm />

      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}

      <button onClick={addItem} className="h-10 border-2 cursor-pointer bg-red-800 text-white px-8">
        Add item to cart
      </button>
    </main>
  );
}
