import "./BookScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookDetails } from "../Redux/actions/bookActions";
import { addToCart } from "../Redux/actions/cartActions";

const BookScreen = ({ match, history }) => {

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
                  <p>{book.description}</p>
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
                  </p>
                </div>
              </div>
            </>
          )}
    </div>
  );
};

export default BookScreen;