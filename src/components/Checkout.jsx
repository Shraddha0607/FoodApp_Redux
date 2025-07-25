import { useContext } from "react";
import Modal from "./UI/Modal";
import { UserProgressContext } from "./store/UserProgressContext";
import Button from "./UI/Button";
import { CartContext } from "./store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import { API_URL } from "../util/config";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./store/cartSlice";
import { hideCheckout,showCart } from "./store/userSlice";

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

function Checkout() {

    const { data, isLoading: isSending, error, sendRequest, clearData
    } = useHttp(`${API_URL}orders`, requestConfig);

    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);
    const userProgress = useSelector((store) => store.user.progress);

    const checkoutHandler = (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartItems,
                customer: customerData
            },
        }));
    }

    const userProgressCtx = useContext(UserProgressContext);

    const cartTotalAmount = cartItems.reduce((cartTotal, item) => {
        return cartTotal + item.quantity * item.price
    }, 0);

    function handleCloseCheckout() {
        dispatch(hideCheckout());
        dispatch(showCart());
    }

    function handleFinish() {
        dispatch(hideCheckout());
        dispatch(clearCart());
        clearData();
    }

    let actions = (
        <>
            <Button textOnly onClick={handleCloseCheckout}>Close</Button>
            <Button >Submit Order</Button>
        </>
    );

    if (isSending) {
        actions = <span>Spending order data...</span>
    }

    if (data && !error) {
        return (
            <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish} >
                <h2>Success!</h2>
                <p>Your order was submitted successfully.</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>

                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )
    }

    return (
        <Modal open={userProgress === 'checkout'}>

            <form onSubmit={checkoutHandler}>
                <h2>Checkout</h2>
                <p>Total Amount {currencyFormatter.format(cartTotalAmount)}</p>

                <Input label="Full Name" type="text" id="name" />
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>

                {error && <Error title="Failed to submit order" message={error} />}
                <p className="modal-actions">{actions}</p>

            </form>
        </Modal>
    )
}

export default Checkout
