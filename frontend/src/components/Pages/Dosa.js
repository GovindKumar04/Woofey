import React from 'react'
import Card from "../Card/Card";
import { dosas } from "../../assets/assets";

function Dosa() {
  return (
    <div>
      <div>
        <h1 className="text-[40px] font-semibold text-gray-800  pt-5">
          Dosa
        </h1>
        <p className="text-gray-700 font-semibold text-lg">
        Satisfy your cravings for South Indian breakfast with these crispy & buttery Dosas.
        </p>
        <div className="mt-10">
          {Object.keys(dosas).map((key) => (
            <React.Fragment key={key}>
              {
                <Card
                  name={dosas[key].name}
                  price={dosas[key].price}
                  rating="★★★★☆"
                  image={dosas[key].image}
                />
              }
            </React.Fragment>
          ))}
          
        </div>
      </div>
    </div>
  )
}

export default Dosa
