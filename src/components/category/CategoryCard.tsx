import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  category: {
    id: string;
    name: string;
    icon: string;
  };
}

const CategoryCard: React.FC<CategoryProps> = ({ category }) => {
  const { id, name, icon } = category;
  
  return (
    <Link 
      to={`/category/${id}`} 
      className="flex flex-col items-center p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors group"
    >
      <div className="w-12 h-12 mb-3 flex items-center justify-center">
        <img src={icon} alt={name} className="w-10 h-10 object-contain" />
      </div>
      <span className="text-sm font-medium group-hover:text-red-500 transition-colors">{name}</span>
    </Link>
  );
};

export default CategoryCard;