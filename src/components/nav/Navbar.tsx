import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NavItem from "./NavItem";
import { userActions } from "@/redux/user/user";

const Navbar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const cart = useSelector((state: RootState) => state.cart.totalQuantity);

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  return (
    <nav id="main-nav" className="flex justify-between p-4">
      <div>1</div>
      <ul className="flex space-x-4">
        <NavItem name={`Cart (${cart})`}></NavItem>
        {!isAuthenticated && <NavItem name="Login / Signup" />}
        {isAuthenticated && <NavItem name="Logout" onClick={() => dispatch(userActions.logout())} />}
      </ul>
    </nav>
  );
};

export default Navbar;
