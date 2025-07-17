import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import { CartContext } from './store/CartContext';
import { UserProgressContext } from './store/UserProgressContext';
import { useDispatch, useSelector } from 'react-redux';
import { showCart } from './store/userSlice';

function Header() {

  // subscribring to the store using a Selector
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const totalCartItems = cartItems.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    dispatch(showCart());
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1 className="title" >Craving Corner</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  )
}

export default Header
