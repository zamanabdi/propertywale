import React from "react";
import Real from "../assets/real.gif";

const Home = () => {
  return (
    <>
    <div className="flex items-center justify-center w-full mb-[2rem] md:mb-[3.5rem]">
      <div className="flex sm:w-full md:w-full lg:w-full xl:w-full">
        <img src={Real} className="w-full" />
      </div>
    </div>
    <div>
    <img src="https://newspaperads.ads2publish.com/wp-content/uploads/2017/11/royal-park-inspiring-a-luxurious-living-ad-times-property-delhi-10-11-2017.png" className="w-full"/>
    </div>
    </>
    
  );
};

export default Home;
