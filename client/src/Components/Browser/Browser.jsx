import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import './Browser.css'

const BOOKS = 'http://localhost:5000/books/'
const AUTHORS = 'http://localhost:5000/authors/';

export default class Browser extends React.Component {

    constructor(props) {
        super(props);
        this.deleteBook = this.deleteBook.bind(this);
        this.onTitle = this.onTitle.bind(this);
        this.onCover = this.onCover.bind(this);
        this.onPrice = this.onPrice.bind(this);
        this.onRating = this.onRating.bind(this);
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
                    console.log("No books recieved")
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


render(){
    return(
<div className="center">
<h1>Currently viewing most popular books</h1>
<div className="nav">

<div className=".nav-left">
    
        <h1 className="inlineheader">Sort by:</h1>
</div>

<div className="nav-right">
    <div className="nav-right-booklist nav-link">
    
        <h4 className="links">method a</h4>
    </div>

    <div className="nav-right-auth nav-link">
            <h4 className="links">method b</h4>
       
    </div>

    <div className="nav-right-addBook nav-link">
        <h4 className="links">method c</h4>
    </div>

    <div className="nav-right-cart nav-link">
        <h4 className = "links">method d</h4>
    </div>
</div>
</div>
    <div className="card">
                        <p>{this.state.books.map(function (book) {

                            return <p>
                                <div className="solid">
                                    <div className="row.bottom">
                                        <div className="row.start">
                                            <div className="card-body">
                                                <div>
                                                    <img
                                                        src={book.cover}
                                                        alt={book.title}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="smaller-font">
                                                    <p>"{book.title}" </p>
                                                    <div className="author">
                                                        <p>by {book.author.name} </p>
                                                    </div>
                                                    <div className="price">
                                                        <p>${book.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </p>
                        })}
                            </p>
                        
    </div>
</div>
    )
}
}