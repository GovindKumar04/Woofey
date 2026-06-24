import { useState } from "react";
import { assets, food_list } from "../../assets/assets";
import Food from "./components/Food";
import CategoryCard from "./components/CategoryCard";
import { useDispatch } from "react-redux";
import { addToCart, decreaseQty } from "../../redux/cartSlice";
import useAuthGuard from "../../hooks/useAuthGuard";

function Home() {
  const [cartCounts, setCartCounts] = useState({});
  const dispatch = useDispatch();
  const { requireAuth } = useAuthGuard();

  const handleAddToCart = (food) => {
    requireAuth(
      () => dispatch(addToCart(food)),
      "Login required to add items to cart"
    );
    setCartCounts((prev) => ({
      ...prev,
      [food._id]: (prev[food._id] || 0) + 1,
    }));
  };

  const handleRemoveFromCart = (food) => {
    const action = decreaseQty(food._id);
    dispatch(action);
    setCartCounts((prev) => ({
      ...prev,
      [food._id]: Math.max((prev[food._id] || 0) - 1, 0),
    }));
  };

  const categories = [
    { name: "Biryani", image: assets.biryani, path: "/biryani" },
    { name: "Pizzas", image: assets.pizzas, path: "/pizzas" },
    { name: "Dosa", image: assets.dosa, path: "/dosa" },
    { name: "Ice Cream", image: assets.icecream, path: "/icecream" },
    { name: "Rolls", image: assets.roll, path: "/roll" },
  ];

  const foodCategories = [...new Set(food_list.map((f) => f.category))];

  return (
    <div className="px-4 sm:px-8 lg:px-16 pt-24 sm:pt-28">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
        What's on your mind?
      </h1>

      <div className="flex gap-3 sm:gap-4 justify-start sm:justify-center overflow-x-auto pb-2 mb-8">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.name}
            name={cat.name}
            image={cat.image}
            to={cat.path}
          />
        ))}
      </div>

      {foodCategories.map((cat) => (
        <div key={cat} className="mb-10">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">{cat}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {food_list
              .filter((food) => food.category === cat)
              .map((food) => (
                <Food
                  key={food._id}
                  name={food.name}
                  image={food.image}
                  price={food.price}
                  description={food.description}
                  count={cartCounts[food._id] || 0}
                  onAdd={() => handleAddToCart(food)}
                  onRemove={() => handleRemoveFromCart(food)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
