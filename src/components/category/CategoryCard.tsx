import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../interface/product';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { _id, id, name, icon } = category;
  const categoryId = _id || id;

  return (
    <Link
      to={`/category/${categoryId}`}
      className="flex flex-col items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group"
    >
      {name == "Camera" ? (
        <div className="w-12 h-12 mb-3 flex items-center justify-center  bg-red-500 rounded shadow-sm">
          <img src={icon} alt={name} className="w-10 h-10 object-contain" />
        </div>
      ) : (
        <div className="w-12 h-12 mb-3 flex items-center justify-center">
          <img src={icon} alt={name} className="w-10 h-10 object" />
        </div>
      )}
      <span className="text-sm font-medium group-hover:text-red-500 transition-colors">{name}</span>
    </Link>
  );
};

export default CategoryCard;