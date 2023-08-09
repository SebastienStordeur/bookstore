"use client";
import React, { useState } from "react";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import Input from "../UI/Input";

const LoginForm: React.FC = () => {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handleSignin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth = getAuth();
    const email = loginForm.email;
    const password = loginForm.password;

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
    <section id="login" className="flex mx-auto py-20 px-8 bg-white shadow-lg w-full max-w-lg rounded-lg">
      <form id="login-form" className="flex flex-col w-full" onSubmit={handleSignin}>
        <h2 className="text-2xl font-semibold uppercase mb-10">Log In</h2>
        <Input id="email-login" type="email" name="email" value={loginForm.email} onChange={handleChange} />
        <Input id="password-login" type="password" name="password" value={loginForm.password} onChange={handleChange} />

        <input
          type="submit"
          className="w-full mt-4 border h-14 bg-yellow-200 font-semibold text-lg uppercase shadow cursor-pointer focus:outline-none focus:ring focus:ring-red-200"
          value="Submit"
        />
      </form>
    </section>
  );
};

export default LoginForm;
