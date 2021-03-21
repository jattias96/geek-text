
import "./Book.css";
import { Link } from "react-router-dom";
import Rating from './Rating';

const Book = ({ cover, description, price, title, bookId, authorName, rating }) => {

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
        <Link to={`/book/${bookId}`} className="info__button">
          Details
          </Link>
      </div>
    </div>
  );
};

export default Book;