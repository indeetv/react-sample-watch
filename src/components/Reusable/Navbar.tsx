import React, { useContext } from "react";
import { LoginContext } from "../../store/Auth";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "./ButtonLoading";

interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = ({}) => {
  const { logout, authLoading } = useContext(LoginContext);
  const navigate = useNavigate();
  const navigateToBrandsPage = () => navigate("/brands");

  return (
    <>
      <nav className="bg-white">
        <div className="flex flex-wrap items-center justify-between p-4">
          <button
            className="flex justify-between"
            onClick={navigateToBrandsPage}
          >
            <img
              src="https://indee.tv/wp-content/themes/indee/images/favicons/favicon_192x192.png"
              className="h-8"
              alt="indee logo"
            />
            <span className="self-center select-none text-xl font-semibold whitespace-nowrap ml-4">
              Indee React Demo App
            </span>
          </button>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white w-24 bg-indigo-600 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus-visible:outline-indigo-600 font-medium rounded-lg text-sm px-4 py-2 text-center grid place-items-center"
              onClick={() => logout()}
            >
              {authLoading ? <ButtonLoader /> : <span>Log out</span>}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
