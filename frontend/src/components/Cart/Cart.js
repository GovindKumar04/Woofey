import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
function Cart() {
  const [cartItems, setCartItems] = useState([]); 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const total = Array.isArray(cartItems) ? cartItems.reduce((acc, item) => acc + item.price, 0) : 0;

  return (
    <div>
      <h1>Your Cart</h1>
      <p>Total: {total}</p>
      <NavLink to="/payment">
        hello
      </NavLink>
    </div>
  );
}

export default Cart;
