import { Link } from "react-router-dom";

function CategoryCard({ name, image, to }) {
  return (
    <Link to={to} className="relative group block shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden shadow-md">
      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white font-bold text-sm sm:text-base">{name}</span>
      </div>
    </Link>
  );
}

export default CategoryCard;
