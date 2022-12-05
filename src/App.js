import React from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';
import Skeleton from './components/PizzaBlock/Skeleton';
function App() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetch('https://vadimsobinin-pizza-react-db.vercel.app/pizzas')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(true);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
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
        </div>
      </div>
    </div>
  );
}

export default App;
