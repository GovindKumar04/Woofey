import React from "react";
import addtocart from "../Cart/Addcart";
function Food({ name, image, price, description, category }) {   
  return (
    <div>
      <div className="w-64">
        <div className="flex flex-col">
          <div className="p-4">
            <img src={image} alt={name} className="h-32 w-60 rounded " />
            <p className="text-gray-700">{description}</p>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-700">Price: ₹{price}</p>
          </div>
          <div className="relative bottom-12 left-44">
            <button onClick={(e)=>{console.log("click",name)
            console.log("click",image)
            addtocart(name, image, price, description)

            }} className="  bg-gray-300 text-green-700 px-3 py-1 rounded hover:bg-orange-600 font-bold m-auto">
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Food;
