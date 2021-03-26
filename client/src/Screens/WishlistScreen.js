import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../Components/Cart/CartItem";
import { addToCart} from "../Redux/actions/cartActions";
import { addToWish,removeFromWishlist} from "../Redux/actions/wishlistActions";


const WishlistScreen = () => {

  useEffect(() => { }, []);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const { wishlistItems } = wishlist;



  // Add item from wishlist to shopping cart
  const addToCartHandler = (id) => {
    dispatch(addToCart(id, 1, false))
  };

  // Remove an item from wishlist
  const removeFromWishlistHandler = (id) => {
    dispatch(removeFromWishlist(id));
  };



  // Get number of items in shopping cart
  const getWishlistCount = () => {
    return wishlistItems.length;
  };


  return (
    <>
      <div className="cartscreen">
        <div className="centered_cart">
          <h2>Wishlist</h2>
        </div>
        <div className="cartscreen__info">

          {

            wishlistItems.length !== 0 ?
              (<div className="cartscreen__center">
                <h1>Your Wishlist is Empty!</h1>
                <Link to="/listofbooks" className="Router_Link">
                  <div className="cart_button">
                    <p>Continue Shopping</p>
                  </div>
                </Link>

              </div>
              )
               
            : 
            (wishlistItems.map((item) => (
              <div>
                <CartItem
                  key={item.book}
                  item={item}          
                  removeHandler={removeFromWishlistHandler}
                  saved={false}
                  bookId={item.book}
                />
                <hr />
              </div>
            )))}
        </div>

      </div>
    </>
  );
};

export default WishlistScreen;
