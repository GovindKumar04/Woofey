import React from 'react'
import Card from "../Card/Card";
import {pizza} from '../../assets/assets'

function Pizzas() {
  return (
    <div>
       <div>
      <div>
        <h1 className="text-[40px] font-semibold text-gray-800  pt-5">
          Pizzas
        </h1>
        <p className="text-gray-700 font-semibold text-lg">
        Cheesilicious pizzas to make every day extraordinary.
        </p>
        <div className="mt-10">
          {Object.keys(pizza).map((key) => (
            <React.Fragment key={key}>
              {
                <Card
                  name={pizza[key].name}
                  price={pizza[key].price}
                  rating="★★★★☆"
                  image={pizza[key].image}
                />
              }
            </React.Fragment>
          ))}
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default Pizzas
