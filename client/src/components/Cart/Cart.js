import React, { useState, useEffect } from 'react';
import removeFromCart from "../Cart/Removecart";
import { NavLink } from 'react-router-dom';

function Cart() {
  
  const [cartItems, setCartItems] = useState([]);

 
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }, []);


  const total = cartItems.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <div>
          <h2>Items:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '35px',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '10px',
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '80px', height: '80px', marginRight: '15px' }}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ₹{item.price.toFixed(2)}</p>
                  <button className="p-1 bg-orange-600 rounded absolute right-46 text-white" onClick={removeFromCart}>Remove</button>
                </div>
               

              </li>
              
            ))}
          </ul>
          <p>
            <strong>Total:</strong> ₹{total.toFixed(2)}
          </p>
          <NavLink to="/payment" style={{ textDecoration: 'none', color: 'white' }}>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Proceed to Payment
            </button>
          </NavLink>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );

}

export default Cart;
