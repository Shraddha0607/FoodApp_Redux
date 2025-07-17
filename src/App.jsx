import CheckoutForm from "./components/Checkout";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from './components/store/CartContext';
import { UserProgressContextProvider } from "./components/store/UserProgressContext";

import { Provider } from "react-redux";
import appStore from "./components/store/appStore";

function App() {

  return (
    <Provider store={appStore}>
      <UserProgressContextProvider>
        <Header />
        <Cart />
        <Meals />
        <CheckoutForm />
      </UserProgressContextProvider>
    </Provider>
  );
}

export default App;
