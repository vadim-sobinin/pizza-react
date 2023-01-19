import React from 'react';

type CategoriesProps = {
  value: number;
  onClickCategory: any;
}

const Categories: React.FC <CategoriesProps> = ({value, onClickCategory}) => {
  const categories = ['All', 'Meat', 'Vegetarian', 'Grill', 'Spicy', 'Covered'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
