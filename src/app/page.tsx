"use client";

import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";
import Navbar from "@/components/nav/Navbar";
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

  const addItem = () => {
    const quantity = 2;
    const id = "TESTID";
    const price = 25;
    dispatch(cartActions.addItemToCart({ id, quantity, price }));
  };

  const removeItem = () => {
    const id = "TESTID";
    const quantity = 1;
    dispatch(cartActions.removeItemFromCart({ id, quantity }));
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <SignupForm />

        <h1>LOGIN {name}</h1>
        {isAuthenticated && <p>Authenticated</p>}
        {!isAuthenticated && <p>Not authenticated</p>}
        <LoginForm />

        <button onClick={addItem} className="h-10 border-2 cursor-pointer bg-red-800 text-white px-8">
          Add item to cart
        </button>
        <button onClick={removeItem} className="h-10 border-2 cursor-pointer bg-red-800 text-white px-8">
          Remove item from cart
        </button>
      </main>
    </>
  );
}
