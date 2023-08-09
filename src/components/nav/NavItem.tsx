import React from "react";

interface NavItemProps {
  name: string;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ name, onClick }) => {
  return (
    <li className="flex justify-center items-center w-fit h-8 px-4 py-5 font-semibold bg-red-200 cursor-pointer" onClick={onClick}>
      {name}
    </li>
  );
};

export default NavItem;
