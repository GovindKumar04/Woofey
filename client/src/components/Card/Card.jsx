import React, { useState } from "react";
import addtocart from "../Cart/Addcart";

import { assets } from "../../assets/assets";

const Card = ({ name, image, price,rating, description, category }) => {
  const [count, setCount] = useState(0); // Initializing state

  const addToCart = () => {
    setCount((prevCount) => prevCount + 1); 
    addtocart(name, image, price, description)
    // Increment count
  };

  const removeFromCart = () => {
    if (count > 0) {
      setCount((prevCount) => prevCount - 1); // Decrement count
    }
  };

  
  return (
    <div className="h-44 mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-5">
      <div className="flex">
        {/* Left Side */}
        <div className="p-4 flex-1">
          <h2 className="text-xl font-bold">{name}</h2>
          <p className="text-gray-700">Price: ₹{price}</p>
          <p className="text-yellow-500">Rating: {rating}</p>
        </div>
        {/* Right Side */}
        <div className="relative flex-shrink-0 ">
          <img src={image} alt={name} className="h-32 w-32 object-cover" />

          {count > 0 ? (
            <div className="absolute right-6 flex items-center mt-2 h-5">
              <button
                className="bg-gray-300 text-green-700 rounded hover:bg-orange-600 p-1 mr-2"
                onClick={removeFromCart}
                aria-label="Remove from cart"
              >
                <img className="h-5" src={assets.remove_icon_red} alt="Remove" />
              </button>
              <span>{count}</span>
              <button
                className="bg-gray-300 text-green-700 rounded hover:bg-orange-600 p-1 ml-2"
                onClick={addToCart}
                aria-label="Add to cart"
              >
                <img className="h-5" src={assets.add_icon_green} alt="Add" />
              </button>
            </div>
          ) : (
            <button
              className="absolute right-8 bg-gray-300 text-green-700 px-3 py-1 rounded hover:bg-orange-600 font-bold mt-2"
              onClick={addToCart}
              aria-label="Add to cart"
            >

              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
