import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [pageState,setPageState] = useState("Sign in")

  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if(user){
        setPageState("Profile");
      }else{
        setPageState("Sign in");
      }
    })
  },[auth])

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
      className="w-[100%] bg-white md:w-[100%] h-20px md:h-[56px] flex flex-row justify-center items-center sticky top-0 z-40"
      style={{ boxShadow: "0px 3px 5px 0px rgba(0,0,0,0.3)" }}
    >
      <header className="flex  md:h-[56px] flex-row w-[1550px] justify-between items-center px-3">
        <div
          className={"hover:cursor-pointer md:ml-[45px]"}
          style={{ display: "flex", flexDirection: "row" }}
          onClick={() => navigate("/")}
        >
          <img src={Logo} className="h-7 w-10  md:w-[75px] md:h-[50px]" />
          <span className="flex justify-center items-center text-orange-400 text-[15px] md:text-[2rem] font-bold shrink-0 font-" style={{fontFamily:'Abril Fatface'}}>
            Property
          </span>
          <span className="flex items-center justify-center text-gray-500 text-[15px] md:text-[2rem] font-bold shrink-0" style={{fontFamily:'Abril Fatface'}}>
            Wale
          </span>
        </div>
        <div className="flex flex-row md:w-[500px] h-full items-center justify-center">
          <ul className="flex bg-white md:flex-row justify-evenly items-center space-x-3 md:space-x-20 text-[14px] md:text-[1.5rem] font-semibold text-gray-500">
            <Link className={`${pathMatchRoute("/") && "text-black md:border-b-[4px] border-b-[3px] border-b-orange-600 md:border-b-orange-600"} py-[10px] md:py-[8px]`} to={"/"}>Home</Link>
            <Link className={`${pathMatchRoute("/offers") && "text-black md:border-b-[4px] border-b-[3px] border-b-orange-600 md:border-b-orange-600"} py-[10px] md:py-[8px]`} to={"/offers"}>
              <li>Offers</li>
            </Link>
          
              <li className={`${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) && "text-black md:border-b-[4px] border-b-[3px] border-b-orange-600 md:border-b-orange-600"} py-[10px] md:py-[8px] cursor-pointer`} onClick={() => navigate("/profile")}>{pageState}</li>
            
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
