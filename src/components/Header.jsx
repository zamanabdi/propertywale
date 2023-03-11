import React, { useEffect } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //    console.log(location.pathname);
  // })

  const pathMatchRoute = (route) => {
    if(route === location.pathname){
      return true;
    }
  }

  return (
    <div
      className="w-[390px] bg-white md:w-[100%] h-20px md:h-[56px] flex flex-row justify-center items-center sticky top-0 z-50"
      style={{ boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.3)" }}
    >
      <header className="flex  md:h-[56px] flex-row w-[1550px] justify-between items-center px-3">
        <div
          className={"hover:cursor-pointer md:ml-[45px]"}
          style={{ display: "flex", flexDirection: "row" }}
          onClick={() => navigate("/")}
        >
          <img src={Logo} className="h-7 w-10  md:w-[75px] md:h-[50px]" />
          <span className="flex justify-center items-center text-orange-400 text-[18px] md:text-[2rem] font-bold">
            𝒫𝓇𝑜𝓅𝑒𝓇𝓉𝓎
          </span>
          <span className="flex items-center justify-center text-gray-500 text-[18px] md:text-[2rem] font-bold">
            𝒲𝒶𝓁𝑒
          </span>
        </div>
        <div className="flex flex-row md:w-[500px] h-full items-center justify-center">
          <ul className="flex bg-white md:flex-row justify-evenly items-center space-x-3 md:space-x-20 text-[14px] md:text-[1.5rem] font-semibold text-gray-500">
            <Link className={`${pathMatchRoute("/") && "text-black md:border-b-[4px] border-b-[3px] border-b-orange-600 md:border-b-orange-600"} py-[10px] md:py-[8px]`} to={"/"}>Home</Link>
            <Link className={`${pathMatchRoute("/offers") && "text-blue-600 md:border-b-[4px] border-b-[3px] border-b-blue-600 md:border-b-blue-600"} py-[10px] md:py-[8px]`} to={"/offers"}>
              <li>Offers</li>
            </Link>
            <Link className={`${pathMatchRoute("/sign-in") && "text-red-600 md:border-b-[4px] border-b-[3px] border-b-red-600 md:border-b-red-600"} py-[10px] md:py-[8px]`} to={"/sign-in"}>
              <li>Sign In</li>
            </Link>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
