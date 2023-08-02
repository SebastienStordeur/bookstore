"use client";
import React, { useState } from "react";

import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";
import { CollectionReference, DocumentData, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/db/firebase-config";

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
    <form id="signup-form" onSubmit={signup}>
      <input type="email" name="email" value={signupForm.email} onChange={handleChange} />
      <input type="password" name="password" value={signupForm.password} onChange={handleChange} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignupForm;
