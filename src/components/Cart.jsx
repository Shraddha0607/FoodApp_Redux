import { useContext } from "react";
import { CartContext } from "./store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "./store/UserProgressContext";
import Button from "./UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./store/cartSlice";
import { hideCart, showCheckout } from "./store/userSlice";

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);
    const userProgress = useSelector((store) => store.user.progress);
    
    const cartTotal = cartItems.reduce((totalAmount, item) => {
        return totalAmount + item.quantity * item.price
    }, 0);

    function handleCloseCart() {
        dispatch(hideCart());
    }

    function handleCheckoutCart() {
        dispatch(showCheckout());
    }

    function increaseQuantity(item) {
        dispatch(addItem(item));
    }

    function decreaseQuantity(id) {
        dispatch(removeItem(id));
    }

    return (
        <Modal className="cart" open={userProgress === 'cart'}>
            <h2>Your Cart</h2>
            {cartItems.length === 0 && <p>No Item found in cart!</p>}
            <ul>
                {cartItems.length > 0 && (
                    cartItems.map((item) => (
                        <li key={item.id} className="cart-item">
                            <div>
                                <p>{item.name} - {item.quantity} * {currencyFormatter.format(item.price)} </p>
                            </div>
                            <p className="cart-item-actions">
                                <button onClick={() => increaseQuantity(item)}>+</button>
                                {item.quantity}
                                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                            </p>
                        </li>
                    ))
                )}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <div className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartItems.length !== 0 && <Button onClick={handleCheckoutCart}>Go To Checkout</Button>}
            </div>
        </Modal>
    )
}

export default Cart
