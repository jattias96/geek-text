import "./BookScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookDetails } from "../Redux/actions/bookActions";
import { addToCart } from "../Redux/actions/cartActions";
import { getAuthorDetails } from '../Redux/actions/authorActions';
import BookCoverModal from '../Modal/BookCoverModal';
// import { determineGenre } from '../JonathanFiles/genreDeterminer';
import AuthorBooksScreen from './AuthorBooksScreen';
import { Link } from 'react-router-dom';

const BookScreen = ({ match, history }) => {

  const [show, setShow] = useState(false);

  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.getBookDetails);
  const { loading, error, book } = bookDetails;
  useEffect(() => {
    if (book && (match.params.id) !== book._id) {
      dispatch(getBookDetails(match.params.id));
    }
  }, [dispatch, book, match]);

  const addToCartHandler = () => {
    dispatch(addToCart(book._id, qty, false));
    //history.push(`/cart`);
    history.push(`/cart/` + match.params.id + "?qty=" + qty);
  };

  const publisher = ((book || {}).publishingInfo || {}).publisher;
  const edition = ((book || {}).publishingInfo || {}).edition;
  const isbn = ((book || {}).publishingInfo || {}).isbn;
  const bio = ((book || {}).author || {}).bio;
  const genre = ((book || {}).genre || {}).name;
  const booksByAuthor = ((book || {}).author || {}).books;

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
                  <input type="image" src={book.cover} alt="book cover" className="book-cover" onClick={() => setShow(true)}/>
                  <BookCoverModal title="Book Cover" onClose={() => setShow(false)} show={show}>
                    <img src={book.cover} alt="book cover" className="book-cover-large"/>
                  </BookCoverModal>
                </div>
                <div className="left__info">
                  <div className="left__name"><h2>{book.title}</h2></div>
                  <p>(Rating: {book.rating})</p>
                  <h4>By <Link to="/authorbooks" books={booksByAuthor}>{book.authorName}</Link></h4>
                  <p>Author Bio: {bio}</p>
                  <p>Genre: {genre}</p>
                  <p>{book.description}</p>
                  <p>Publisher: {publisher}</p>
                  <p>Edition: {edition}</p>
                  <p>ISBN: {isbn}</p>
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
                      {[...Array(10).keys()].map((x) => (
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
                    <button>
                      Add to Wish List
                    </button> {/* onClick={addToWishList} */}
                  </p>
                </div>
              </div>
            </>
          )}
    </div>
  );
};

export default BookScreen;