import React, { useContext } from "react";
import { ProductContext } from "../store/Product";
import { LoginContext } from "../store/auth";

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = ({}) => {
  const {logoImg} = useContext(ProductContext)
  const { logout } = useContext(LoginContext);
  return (
    <>
      <nav className="bg-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <img
              src={logoImg}
              className="h-8"
              alt="enterprise logo"
            />
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white w-24 bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus-visible:outline-indigo-600 font-medium rounded-lg text-sm px-4 py-2 text-center"
              onClick={() => logout()}
            >
              Log out
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
