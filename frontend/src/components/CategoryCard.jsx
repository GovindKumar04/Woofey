import { Link } from "react-router-dom";

function CategoryCard({ name, image, to }) {
  return (
    <Link to={to} className="relative group block w-32 h-32 rounded-lg overflow-hidden shadow-md">
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <span className="text-white font-bold">{name}</span>
      </div>
    </Link>
  );
}

export default CategoryCard;
