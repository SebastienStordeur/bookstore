import React, { useState } from "react";
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AuthForm: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const [visibleForm, setVisibleForm] = useState<string>("login");

  const handleToggleForm = (value: string) => {
    setVisibleForm(value === "login" || value === "signup" ? value : "login");
  };

  if (isAuthenticated) {
    return;
  } else {
    return (
      <section
        id="auth-form"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-10 px-8 bg-white shadow-lg w-full max-w-lg rounded-lg z-100"
      >
        <div className="flex justify-center mx-auto mb-6">
          <div
            onClick={() => handleToggleForm("login")}
            className={`flex justify-center items-center p-8 w-3/6 ${visibleForm === "login" ? "bg-red-400" : "border"} `}
          >
            Login
          </div>
          <div
            className={`flex justify-center items-center p-8 w-3/6 ${visibleForm === "signup" ? "bg-red-400" : "border"} `}
            onClick={() => handleToggleForm("signup")}
          >
            Signup
          </div>
        </div>
        {visibleForm === "login" && <LoginForm />}
        {visibleForm === "signup" && <SignupForm />}
      </section>
    );
  }
};

export default AuthForm;
