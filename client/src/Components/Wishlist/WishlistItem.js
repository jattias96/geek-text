import "./WishlistItem.css"
import { Link } from "react-router-dom";
import Rating from '../Cart/Rating';

const WishlistItem = ({ item, removeHandler, addToCartHandler, bookId, moveToWishlistHandler }) => {

  return (
    <div>
        <div id="grid_wishlist">

          <div id="cover_column_wishlist">
            <img src={item.cover} alt={item.title}
              className="small" />
          </div>

    
          <div id="info_column_wishlist">
            <Link to={`/book/${bookId}`} className="cartItem__name">
              {item.title}
            </Link>
            <div className="cartItem__author">
              By {item.authorName}
            </div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

           <Rating
              value={item.rating}
            className="rating"/>
            <div id="price_Column"
              className="wishlistitem__price">${parseFloat(item.price).toFixed(2)}
            </div>
     
            <button className="addtocartfromwish_button"
              onClick={() => addToCartHandler(bookId)}>
              Add to cart
              </button>
         
             </div>

             <div id="buttons_column_wishlist">
             
              
              <div className="wishlist_delete_align">
              <button className="cartItem__deleteBtn" 
              onClick={() => removeHandler(item.book)}
              >
              <i className="fa fa-trash fa-2x"></i>
            </button>
            </div>
          </div>
          </div>
    </div>
  );
};

export default WishlistItem;