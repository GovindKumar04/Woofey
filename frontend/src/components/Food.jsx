import React from "react";
import { assets } from "../assets/assets";

function Food({ name, image, price, description, count, onAdd, onRemove }) {
  return (
    <div className="bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden transition-shadow duration-300">
      <img src={image} alt={name} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-700 mb-2">{description}</p>
        <p className="text-gray-900 font-semibold mb-4">₹{price}</p>

        <div className="flex items-center gap-2">
          {count > 0 && (
            <button
              onClick={onRemove}
              className="bg-red-100 p-1 rounded hover:bg-red-200"
            >
              <img src={assets.remove_icon_red} alt="Remove" className="h-5" />
            </button>
          )}

          <span className="font-bold">{count > 0 ? count : ""}</span>

          <button
            onClick={onAdd}
            className="bg-green-100 p-1 rounded hover:bg-green-200"
          >
            <img src={assets.add_icon_green} alt="Add" className="h-5" />
          </button>

          {count === 0 && (
            <button
              onClick={onAdd}
              className="bg-gray-300 text-green-700 px-3 py-1 rounded hover:bg-orange-600 font-bold"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Food;
