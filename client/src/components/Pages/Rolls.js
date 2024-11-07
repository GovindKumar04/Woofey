import React from 'react'

function Rolls() {
  return (
    <div>
       <div>
      <div>
        <h1 className="text-[40px] font-semibold text-gray-800  pt-5">
          Biryani
        </h1>
        <p className="text-gray-700 font-semibold text-lg">
          Taste these delectable classics, delectable biryanis to make your day.
        </p>
        <div className="mt-10">
          {/* {Object.keys(biryanis).map((key) => (
            <React.Fragment key={key}>
              {
                <Card
                  name={biryanis[key].name}
                  price={biryanis[key].price}
                  rating="★★★★☆"
                  image={biryanis[key].image}
                />
              }
            </React.Fragment>
          ))} */}
          
        </div>
      </div>
    </div>
    </div>
  )
}

export default Rolls
