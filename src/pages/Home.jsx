import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state) => state.filterSlice);
  const sortType = sort.sortProp;

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(false);
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://63b1fc0a5e490925c511e59c.mockapi.io/items?limit=4&page=${currentPage}&sortBy=${sortType}&order=desc&${
          categoryId > 0 ? 'category=' + categoryId : ''
        }${search}&sortBy=${sortType}&order=desc`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(true);
      });
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
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
