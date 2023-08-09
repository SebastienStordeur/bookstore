import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavItem from "./NavItem";
import { userActions } from "@/redux/user/user";

import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import AuthForm from "../forms/AuthForm/AuthForm";

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const cart = useSelector((state: RootState) => state.cart.totalQuantity);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  const handleModal = () => {
    setModalIsOpen((prev) => !prev);
  };

  useEffect(() => {
    console.log("ISAUTH", isAuthenticated);
  }, [user]);

  return (
    <nav id="main-nav" className="flex justify-between p-4">
      <div>1</div>
      <ul className="flex space-x-4">
        <NavItem name={`Cart (${cart})`}></NavItem>
        {!isAuthenticated && <NavItem name="Login / Signup" onClick={handleModal} />}
        {isAuthenticated && <NavItem name="Logout" onClick={handleLogout} />}
      </ul>
      {modalIsOpen && <AuthForm />}
    </nav>
  );
};

export default Navbar;
