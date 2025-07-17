import { useContext } from "react";
import { CartContext } from "./store/CartContext";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import { UserProgressContext } from "./store/UserProgressContext";
import Button from "./UI/Button";

function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    const cartTotal = cartCtx.items.reduce((totalAmount, item) => {
        return totalAmount + item.quantity * item.price
    }, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleCheckoutCart() {
        userProgressCtx.showCheckout();
    }

    function increaseQuantity(item) {
        cartCtx.addItem(item);
    }

    function decreaseQuantity(id) {
        cartCtx.removeItem(id)
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            {cartCtx.items.length === 0 && <p>No Item found in cart!</p>}
            <ul>
                {cartCtx.items.length > 0 && (
                    cartCtx.items.map((item) => (
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
                {cartCtx.items.length !== 0 && <Button onClick={handleCheckoutCart}>Go To Checkout</Button>}
            </div>
        </Modal>
    )
}

export default Cart
