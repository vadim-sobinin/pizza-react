import React from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'popularity', sortProp: 'rating' });
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(false);
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://63b1fc0a5e490925c511e59c.mockapi.io/items?limit=4&page=${currentPage}&${
        categoryId > 0 ? 'category=' + categoryId : ''
      }${search}&sortBy=${sortType.sortProp}&order=desc`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(true);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={setCategoryId} />
        <Sort value={sortType} onClickSort={setSortType} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">
        {isLoading
          ? items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                title={obj.title}
                price={obj.price}
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
              />
            ))
          : [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
      </div>
      <Pagination setCurrentPage={setCurrentPage} />
    </div>
  );
};
export default Home;
