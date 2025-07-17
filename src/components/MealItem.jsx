import { useContext } from 'react';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import { CartContext } from './store/CartContext';
import { API_URL } from '../util/config';
import { useDispatch } from 'react-redux';
import {addItem} from './store/cartSlice.js';

function MealItem({ meal }) {
    const cartCtx = useContext(CartContext);
    const dispatch = useDispatch();

    function handleAddMealToCart() {
        dispatch(addItem(meal));
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`${API_URL}${meal.image}`} alt={meal.name} />
                <div className="article">
                    <h3 >{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    )
}

export default MealItem
