function addtocart(name, image, price, description="", count=0) {
    alert(name+" added to cart");
    const cartItem = { name, image, price, description, count };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(cartItem);

    
    localStorage.setItem('cart', JSON.stringify(cart));
}

export default addtocart;
