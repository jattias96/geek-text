import "./BookScreen.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookDetails } from "../Redux/actions/bookActions";
import { addToCart } from "../Redux/actions/cartActions";
import { addToWishlist } from "../Redux/actions/wishlistActions";
import BookCoverModal from '../Modal/BookCoverModal';
// import { determineGenre } from '../JonathanFiles/genreDeterminer';
import { Link } from "react-router-dom";
import MessageDialog from "../Components/Cart/UI/MessageDialog";
import { CircularProgress, TextField, Checkbox, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
//import Rating from '../Components/Cart/Rating';
import { useParams } from "react-router";

const BookScreen = ({ match, history }) => {

  const { id } = useParams();
  const [show, setShow] = useState(false);

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.getBookDetails);
  const { loading, error, book } = bookDetails;
  const [messageDialog, setMessageDialog] = useState({ isOpen: false, title: '', subTitle: '' })

  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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


  const addToWishlistHandler = () => {
    dispatch(addToWishlist(book._id));
    history.push(`/wishlist/`);
    //add parameter and concatinate to push path after "...wishlist/"
  };

  //handles going to the review page
  const createReviewHandler = () => {
    history.push(`/book/` + match.params.id + "/reviews");
  }


  const publisher = ((book || {}).publishingInfo || {}).publisher;
  const isbn = ((book || {}).publishingInfo || {}).isbn;
  const edition = ((book || {}).publishingInfo || {}).edition;
  const genre = ((book || {}).genre || {}).name;
  const bio = ((book || {}).author || {}).bio;
  const authorID = ((book || {}).author || {})._id;

  return (
    <div className="productscreen">
      {
        loading ? (
          <h2><CircularProgress className="circular_progress" /></h2>
        ) : error ? (
          <h2>{error}</h2>
        ) :
            (
              <>
                <div className="productscreen__left">
                  <div className="small">
                    <input type="image" src={book.cover} alt="book cover" className="book-cover" onClick={() => setShow(true)} />
                    <BookCoverModal title="Book Cover" onClose={() => setShow(false)} show={show}>
                      <img src={book.cover} alt="book cover" className="book-cover-large" />
                    </BookCoverModal>
                  </div>
                  <div className="left__info">
                    <div className="left__name"><div>{book.title}</div></div>
                    <p><Rating name="half-rating-read" value={book.rating} precision={0.1} readOnly /> {book.rating} out of 5</p>
                    <h4>By <Link to={`/authorbooks/${authorID}`}>{book.authorName}</Link></h4>
                    <p>Author Bio: {bio}</p>
                    <p>Description: {book.description}</p>
                    <p>Publisher: {publisher}</p>
                    <p>ISBN: {isbn}</p>
                    <p>Edition: {edition}</p>
                    <p>Genre: {genre}</p>

                    <div>Comments:</div>
                    {(book.comments) ?
                      (book.comments).map(comment =>
                        <div className="comments">
                          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                          <div> <Rating value={comment.rating} precision={0.1} readOnly />{comment.commenter} </div>
                          <h3>{comment.title}</h3>
                          <p>{comment.content}</p>
                        </div>)
                      :
                      ""
                    }
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
                < br/>
                      <button type="info__button" className="wish_button" onClick={addToWishlistHandler}>
                      &#10084;&#65039;
                </button>

                      {/* change button to selector */}
                      <MessageDialog
                        messageDialog={messageDialog}
                        setMessageDialog={setMessageDialog}
                      />
                    </p>
                    <button onClick={createReviewHandler}> Create Customer Review</button>
                </div>
              </div>
              </>
  )
}
    </div >
  );
};

export default BookScreen;

