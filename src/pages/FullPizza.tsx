import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string,
    title: string,
    price: number
  }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://63b1fc0a5e490925c511e59c.mockapi.io/items/' + id);
        await setPizza(data);
      } catch (error) {
        alert('Pizza fetch error!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <h2>Downloading...</h2>;
  }

  return (
    <div className="container">
      <div className="pizza-details">
        <img src={pizza.imageUrl} alt="pizzaImage" />
        <h2>{pizza.title}</h2>
        <h4>{pizza.price} $</h4>
        <Link to="/">
          <button className="button button--outline button--add">
            <span>Go back</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FullPizza;
