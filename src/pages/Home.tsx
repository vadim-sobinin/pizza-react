import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import {
  FilterSliceState,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import { Sort, sortCategoryList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: any) => state.filterSlice,
  );
  const { items, status } = useSelector((state: any) => state.pizzaSlice);
  const sortType = sort.sortProperty;

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onClickCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(
      fetchPizzas({
        search,
        currentPage,
        categoryId,
        sortType,
      }),
    );
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as FilterSliceState;

      const sort = sortCategoryList.find((obj) => obj.sortProperty === params.sortProperty);

      if (sort) {
        params.sort = sort;
      }

      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>

      {status === 'error' ? (
        <div className="content__error-info">
          <h2>An error occurred 😕</h2>
          <p>Unfortunately, it was not possible to get the pizzas. Sorry, try again later.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'success'
            ? items.map((obj: any) => (
                <PizzaBlock
                  key={obj.id}
                  id={obj.id}
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
                />
              ))
            : [...new Array(4)].map((_, index) => <Skeleton key={index} />)}
        </div>
      )}
      <Pagination currentPage={currentPage} setCurrentPage={onChangePage} />
    </div>
  );
};
export default Home;
