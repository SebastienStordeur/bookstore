"use client";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";

const LoginForm: React.FC = () => {
  const handleSignin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const auth = getAuth();
    const email = "test2@test.com";
    const password = "password";

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log("LOGGED IN AS" + user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };
  return (
    <form id="login-form" onSubmit={handleSignin}>
      <input type="email" />
      <input type="password" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginForm;
