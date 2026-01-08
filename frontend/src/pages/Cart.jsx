import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseQty } from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="pt-24 px-4 md:px-20 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Your Cart 🛒</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center p-4 shadow rounded mb-3 bg-white"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-500">₹{item.price}</p>
                <p className="text-sm">Qty: {item.quantity}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => dispatch(decreaseQty(item._id))}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  −
                </button>

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 text-right">
            <h2 className="text-xl font-bold">Total: ₹{totalAmount}</h2>

            <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
