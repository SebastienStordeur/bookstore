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
    <form id="login-form" onSubmit={handleSignin}>
      <Input id="email-login" type="email" name="email" value={loginForm.email} onChange={handleChange} />
      <Input id="password-login" type="password" name="password" value={loginForm.password} onChange={handleChange} />

      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginForm;
