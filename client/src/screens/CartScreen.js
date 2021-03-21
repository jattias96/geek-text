import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../Components/Cart/CartItem";
import { addToCart, removeFromCart } from "../Redux/actions/cartActions";


const CartScreen = () => {

  useEffect(() => { }, []);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


  // Items saved for later
  const savedForLater = cartItems.filter(({ saved }) => saved === true);

  // Items in cart (not including saved for later)
  const inCart = cartItems.filter(({ saved }) => saved === false);

  // Change quantity of item
  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty, false))
  };

  // Save an item for later
  const saveForLaterHandler = (id, qty) => {
    dispatch(addToCart(id, qty, true));
  };

  // Add item from 'saved for later' to shopping cart
  const addBackToCartHandler = (id, qty) => {
    dispatch(addToCart(id, qty, false))
  };

  // Remove an item from shopping cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Checkout
  const checkoutHandler = () => {
    // TODO: Database updates: (1) Update sold count of books & (2) add books to user's purchased books
    alert("Checkout completed suceesfully!")
    return inCart.map((item) => removeFromCartHandler(item.book));
  }

  // Get number of items saved for later
  const getSavedCount = () => {
    return savedForLater.length;
  };

  // Get number of items in shopping cart
  const getCartCount = () => {
    return inCart.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  // Get subtotal
  const getCartSubTotal = () => {
    return inCart
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };


  return (
    <>
      <div className="cartscreen">
        <div className="centered_cart">
          <h2>Shopping Cart</h2>
        </div>
        <div className="cartscreen__info">

          {inCart.length === 0 ? (

            cartItems.length !== 0 ?
              (<div className="cartscreen__center">
                <h1>Your Shopping Cart Is Empty!</h1>
                <p></p>
                <p>But you have some items saved for later...</p>
                <Link to="/listofbooks" className="Router_Link">
                  <div className="cart_button">
                    <p>Continue Shopping</p>
                  </div>
                </Link>

              </div>
              )
              :
              (
                <div className="cartscreen__center">
                  <h1>Your Shopping Cart Is Empty!</h1>
                  <p></p>
                  <p>Sign in to start shopping.</p>
                  <Link to="/Auth" className="Router_Link">
                    <div className="cart_button" >
                      <p>Sign In</p>
                    </div>
                  </Link>
                  <div></div>
                  <Link to="/listofbooks" className="Router_Link">
                    <div className="cart_button">
                      <p>Continue Shopping</p>
                    </div>
                  </Link>
                </div>)
          )
            : (inCart.map((item) => (
              <div>
                <CartItem
                  key={item.book}
                  item={item}
                  qtyChangeHandler={qtyChangeHandler}
                  removeHandler={removeFromCartHandler}
                  saveForLaterHandler={saveForLaterHandler}
                  addBackToCartHandler={addBackToCartHandler}
                  saved={false}
                  bookId={item.book}
                />
                <hr />
              </div>
            )))}

          <div className="right-subtotal">
            Subtotal ({getCartCount()}) items:<div className="subtotal">&emsp;&emsp;${getCartSubTotal()}
            </div>
            <div></div>
            <button onClick={() => checkoutHandler()} className="cart_button_checkout" disabled={inCart.length === 0}>
              Proceed to Checkout
            </button>
          </div>
        </div>

        {savedForLater.length !== 0 ? (
          <div >
            <div className="centered_saved">
              <h2>Saved for Later</h2>
            </div>
            <div className="cartscreen__info_saved">
              {savedForLater.map((item) => (
                <div>
                  <CartItem
                    key={item.book}
                    item={item}
                    qtyChangeHandler={qtyChangeHandler}
                    removeHandler={removeFromCartHandler}
                    saveForLaterHandler={saveForLaterHandler}
                    addBackToCartHandler={addBackToCartHandler}
                    saved={true}
                    bookId={item.book}
                  />
                  <hr />
                </div>
              )
              )}
              <div className="number_of_items_saved">
                ({getSavedCount()}) items
          </div>
            </div>
          </div>
        ) : ""
        }
      </div>
    </>
  );
};

export default CartScreen;
