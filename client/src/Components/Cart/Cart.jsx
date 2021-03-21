
import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
const BOOKS = 'http://localhost:5000/books/';
const AUTHORS = 'http://localhost:5000/authors/';

export default class Cart extends Component {

    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
        this.onTitle = this.onTitle.bind(this);
        this.onCover = this.onCover.bind(this);
        this.onPrice = this.onPrice.bind(this);
        this.onRating = this.onRating.bind(this);
        this.onQty = this.onQty.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            books: []
        }
    }

    deleteBook(id) {
        Axios.delete(BOOKS + id)
            .then(res => console.log(res.data));

        this.setState({
            books: this.state.books.filter(el => el._id !== id)
        })
    }

    // ! NOT FUNCTIONAL
    getAuthor() {
        Axios.get(AUTHORS + this.state.books.author)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        author: response.data
                    })
                }
                else {
                    console.log("No author")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //Get Books from db
    componentDidMount() {

        Axios.get(BOOKS)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        books: response.data
                    })
                }
                else {
                    console.log("Empty Cart")
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onCover(e) {
        this.setState({
            cover: e.target.value
        });
    }

    onPrice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onRating(e) {
        this.setState({
            rating: e.target.value
        });
    }

    onQty(e) {
        this.setState({
            qty: e.target.value
        });
    }

    onCheckout(e) {
        e.preventDefault();

        const order = [{
            title: this.state.title,
            cover: this.state.cover,
            price: this.state.price,
            author: this.state.author,
            rating: this.state.rating,
            qty: this.state.qty,
        }]

        console.log(order)
        window.location = '/';
    }



    // PRELIMINARY (not very functional)
    render() {
        return (
            <div className="center">
            
                <h1>Your Shopping Cart Is Empty!</h1>
                <p> </p>
                <p>Sign in to start shopping.</p>
                <Link to="/Auth" className="Router_Link">
                    <div className="button button">
                        <p>Sign In</p>
                    </div>
                </Link>
                <Link to="/" className="Router_Link">
                    <div className="button button">
                        <p>Find Books!</p>

                    </div>
                </Link>
                {
                    <div className="card">
                        <marginging>{this.state.books.map(function (book) {

                            return <p>
                                <div className="solid">
                                    <div className="my-left-aligned-books">
                                        <div className="row.start">
                                            <div className="card-body">
                                                
                                                    <img
                                                        src={book.cover}
                                                        alt={book.title}
                                                        className="small"
                                                        />
                                                    <h6>"{book.title}" </h6>
                                                    <div className="author">
                                                        <p>by {book.author} </p>
                                                    </div>
                                                    <div className="price">
                                                        ${book.price}
                                                    </div>
                                                    <div class="search_categories">
                                                  
                                                        <div class="select">
                                                            
                                                            <select name="search_categories" id="search_categories">
                                                                <option value="1" selected="selected">1</option>
                                                                <option value="2">2</option>
                                                                <option value="3">3</option>
                                                                <option value="4">4</option>
                                                                <option value="5">5</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                          

                                <hr />
                            </p>
                        })}
                        </marginging>
                        <div className="my-right-aligned-text">
                        Subtotal ({this.state.books.reduce((a, c) => a + 1, 0)} items):
               <h3> ${parseFloat(this.state.books.reduce((a, c) => a + c.price * 1, 0)).toFixed(2)}</h3>
          
                        </div>
                        
                    </div>
                    }
            </div>
        )
    }
}