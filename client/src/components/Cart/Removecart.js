function removeFromCart(name) {
   
    const cartItem = { name };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.pop(cartItem);

    localStorage.setItem('cart', JSON.stringify(cart));
}

export default removeFromCart;