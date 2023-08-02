"use client";
import React from "react";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { CollectionReference, DocumentData, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/db/firebase-config";

const SignupForm: React.FC = () => {
  const signup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = getAuth();
    const userCollectionRef: CollectionReference<DocumentData> = collection(db, "users");
    const email = "test2@test.com";
    const password = "password";

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const userUid = user.uid;
        console.log(user);
        await setDoc(doc(userCollectionRef, userUid), {
          userUid,
          email,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
  };

  return (
    <form id="signup-form" onSubmit={signup}>
      <input type="email" />
      <input type="password" />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default SignupForm;
