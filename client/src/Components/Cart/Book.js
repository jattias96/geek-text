import "./Book.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Rating from './Rating';
import { addToCart } from "../../Redux/actions/cartActions";
import Notification from "./UI/Notification";

const Book = ({ cover, description, price, title, bookId, authorName, rating }) => {

  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart(bookId, 1, false));
    setNotify({
      isOpen: true,
      message: `"${title}" was added to cart`,
      type: 'success',
      typeStyle: 'specific'
    })
  };
    // Notification
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });

  return (
    <div className="product">
      <div className="left__image">
        <img src={cover} alt={title} />
      </div>
      <div className="product__info">
      
        <Link to={`/book/${bookId}`} className="cartItem__name">
          <p className="info__name">{title}</p>
        </Link>
        <p className="info__author">By {authorName}</p>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <Rating
          value={rating}
        />
        <p className="info__description">{description}</p>
        <p className="info__price">${parseFloat(price).toFixed(2)}</p>
      </div>
      <div className="browser_buttons">
        <Link to={`/book/${bookId}`} className="info__button">
          Details
        </Link>
          <button type="info__button" onClick={addToCartHandler}>
            <AddShoppingCartIcon fontSize="small" />
          </button>
          <Notification
              notify={notify}
              setNotify={setNotify}
            />
        </div>
    </div>
  );
};

export default Book;