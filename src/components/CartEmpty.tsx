import React from 'react'
import cartEmptyImg from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';

const CartEmpty: React.FC = () => {
  const scroll = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div className="cart cart--empty">
      <h2>Cart is empty 😕</h2>
      <p>
        You probably haven't ordered a pizza yet.
        <br />
        To order a pizza, please go to the main page.
      </p>
      <img src={cartEmptyImg} alt="Empty cart" />
      <Link onClick={scroll} to="/" className="button button--black">
        <span>Go back</span>
      </Link>
    </div>
  );
};

export default CartEmpty;
