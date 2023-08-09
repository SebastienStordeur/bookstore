"use client";
import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { CollectionReference, DocumentData, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/db/firebase-config";

import Input from "../UI/Input";

// TODO add names

const SignupForm: React.FC = () => {
  const [signupForm, setSignupForm] = useState({ email: "", password: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({ ...signupForm, [event.target.name]: event.target.value });
  };

  const signup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const auth: Auth = getAuth();
    const userCollectionRef: CollectionReference<DocumentData> = collection(db, "users");
    const email = signupForm.email;
    const password = signupForm.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userUid = userCredential.user.uid;
        await setDoc(doc(userCollectionRef, userUid), {
          userUid,
          email,
          cart: [],
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode, error);
      });
  };

  return (
    <section id="signup" className="flex mx-auto py-20 px-8 bg-white shadow-lg w-full max-w-lg rounded-lg">
      <form id="signup-form" className="flex flex-col w-full" onSubmit={signup}>
        <h2 className="text-2xl font-semibold uppercase mb-10">Sign Up</h2>
        <Input id="email-signup" type="email" name="email" value={signupForm.email} onChange={handleChange} />
        <Input id="password-signup" type="password" name="password" value={signupForm.password} onChange={handleChange} />
        <input
          type="submit"
          className="w-full mt-4 border h-14 bg-yellow-200 font-semibold text-lg uppercase shadow cursor-pointer focus:outline-none focus:ring focus:ring-red-200"
          value="Submit"
        />
      </form>
    </section>
  );
};

export default SignupForm;
