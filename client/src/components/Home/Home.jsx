import React from "react";
import Food from "../Card/Food";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
import { food_list, menu_list } from "../../assets/assets";

function Home() {
  return (
    <div className="">
      <h1 className="text-xl pt-4 font-bold">What's on your mind?</h1>
      <div className="flex max-w-fit mx-auto">
        <div>
          <NavLink to="/biryani">
            <img src={assets.biryani} alt="" />
          </NavLink>
        </div>
        <div>
          <NavLink to="/pizzas">
            <img src={assets.pizzas} alt="" />
          </NavLink>
        </div>
        <div>
          <NavLink to='/dosa'>
            <img src={assets.dosa} alt="" />
          </NavLink>
        </div>
        <div>
          <NavLink to='/icecream'>
            {" "}
            <img src={assets.icecream} alt="" />
          </NavLink>
        </div>
        <div>
          <NavLink to="roll">
            <img src={assets.roll} alt="" />
          </NavLink>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-27 ml-0 mr-0">
        {/* Render the first heading before any Food items */}
        <div className="w-full my-4">
          <h2 className="text-2xl font-bold ml-10  text-gray-900 ">
            {menu_list[0].menu_name}
          </h2>
        </div>

        {Object.keys(food_list).map((key, index) => (
          <React.Fragment key={key}>
            {/* Render the heading every fourth item starting from the second heading */}

            {index % 4 === 0 && index !== 0 && (
              <div className="w-full my-4">
                <h2 className="text-2xl font-bold ml-10   text-gray-900 ">
                  {menu_list[Math.floor(index / 4)].menu_name}
                </h2>
              </div>
            )}

            {/* Render the Food component */}
            <Food
              name={food_list[key].name}
              image={food_list[key].image}
              price={food_list[key].price}
              description={food_list[key].description}
              category={food_list[key].category}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Home;
