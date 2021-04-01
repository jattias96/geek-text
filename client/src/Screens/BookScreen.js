import "./BookScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookDetails } from "../Redux/actions/bookActions";
import { addToCart } from "../Redux/actions/cartActions";
import { Link } from "react-router-dom";
import MessageDialog from "../Components/Cart/UI/MessageDialog";

const BookScreen = ({ match, history }) => {

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.getBookDetails);
  const { loading, error, book } = bookDetails;
  const [messageDialog, setMessageDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  useEffect(() => {
    if (book && (match.params.id) !== book._id) {
      dispatch(getBookDetails(match.params.id));
    }
  }, [dispatch, book, match]);

  // Determine whether item is already in cart and handle add operation accordingly
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = () => {
    (cartItems.some(item => item.book === book._id)) ?
      addToCartExistent(cartItems.find((item) => item.book === book._id).qty)
      :
      addToCartNew()
  };

  // Close dialog and go to cart
  const onViewCart = () => {
    setMessageDialog({
      ...messageDialog,
      isOpen: false
    })
    history.push(`/cart/` + match.params.id + "?qty=" + qty);
  }

  // Close dialog and stay in current page
  const onKeepShopping = () => {
    setMessageDialog({
      ...messageDialog,
      isOpen: false
    })
  }

  // Add to cart (user can decide whether to stay in current page or view cart)
  const addToCartNew = () => {
    dispatch(addToCart(book._id, qty, false));
    setMessageDialog({
      isOpen: true,
      title: 'Item successfully added to Shopping Cart',
      onViewCart: () => { onViewCart() },
      onKeepShopping: () => { onKeepShopping() }
    })
  };

  // Add an item already existent in cart (increment by new qty)
  const addToCartExistent = (currQty) => {
    dispatch(addToCart(book._id, Number(currQty) + Number(qty), false));
    setMessageDialog({
      isOpen: true,
      title: 'Item successfully updated in Shopping Cart',
      onViewCart: () => { onViewCart() },
      onKeepShopping: () => { onKeepShopping() }
    })
  };

  const publisher = ((book || {}).publishingInfo || {}).publisher;
  const isbn = ((book || {}).publishingInfo || {}).isbn;
  const edition = ((book || {}).publishingInfo || {}).edition;
  const genre = ((book || {}).genre || {}).name;
  const bio = ((book || {}).author || {}).bio;


  return (
    <div className="productscreen">
      {
        loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) :
          (
            <>
              <div className="productscreen__left">
                <div className="small">
                  <img src={book.cover} alt={book.title} />
                </div>
                <div className="left__info">
                  <div className="left__name"><p>{book.title}</p></div>
                  <p>By {book.authorName}</p>
                  <p>{bio}</p>
                  <p>{book.description}</p>
                  <p>Publisher: {publisher}</p>
                  <p>ISBN: {isbn}</p>
                  <p>Edition: {edition}</p>
                  <p>sold: {book.sold}</p>
                  <p>Genre: {genre}</p>
                </div>
              </div>
              <div className="productscreen__right">
                <div className="right__info">
                  <p>
                    Price:
                <span>${parseFloat(book.price).toFixed(2)}</span>
                  </p>
                  <p>
                    Qty:
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                      {[...Array(100).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </p>
                  <p>
                    <button type="info__button" onClick={addToCartHandler}>
                      Add to Cart
                </button>
                    <MessageDialog
                      messageDialog={messageDialog}
                      setMessageDialog={setMessageDialog}
                    />
                  </p>
                </div>
              </div>
            </>
          )
      }
    </div>
  );
};

export default BookScreen;