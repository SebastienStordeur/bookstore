"use client";

import LoginForm from "@/components/forms/LoginForm";
import SignupForm from "@/components/forms/SignupForm";
import { Auth, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";

export default function Home() {
  const auth: Auth = getAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false);

  onAuthStateChanged(auth, (user) => {
    setIsAuthenticated(() => (user === null ? false : true));
    console.log(user);
    return user;
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
      })
      .catch((error) => {
        console.log("ERROR");
      });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignupForm />

      <h1>LOGIN</h1>
      {isAuthenticated && <p>Authenticated</p>}
      {!isAuthenticated && <p>Not authenticated</p>}
      <LoginForm />

      {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
    </main>
  );
}
