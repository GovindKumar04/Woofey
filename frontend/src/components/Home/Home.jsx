import React from "react";
import { assets, menu_list } from "../../assets/assets";

function Home() {
  return (
    <div className=" ">
      <h1 className="text-xl pt-4 font-bold">What's on your mind?</h1>
      <div className="flex max-w-fit  mx-auto  ">
      <div>
          <img src={assets.biryani} alt="" />
        </div>
        <div>
          <img src={assets.pizzas} alt="" />
        </div>
        <div>
          <img src={assets.cake} alt="" />
        </div>
        <div>
          <img src={assets.icecream} alt="" />
        </div>
        <div>
          <img src={assets.roll} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Home;
