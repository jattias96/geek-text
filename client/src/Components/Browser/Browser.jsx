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

    sortByTitle(){
        Axios.get(BOOKS + "getByTitle")
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

    sortByRating(){ 
        Axios.get(BOOKS + "getByRating")
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

    sortByRD(){ // RD = Release Date
        Axios.get(BOOKS + "getByRD")
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

    sortByAuthor(){ // name, alphabetical
        Axios.get(BOOKS + "getByAuthor")
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

    

render(){
    return(
<div className="center">
<h1>Find Books Below</h1>
<div className="nav">

<div className=".nav-left">
    
        <h1 className="inlineheader">Sort by:</h1>
</div>

<div className="nav-right">
    <div className="nav-right-booklist nav-link">
     <button value = "sortByTitle" onClick={ () => this.sortByTitle()}>
        <h4 className="links">Title</h4>
        </button>
    </div>

    <div className="nav-right-auth nav-link">
    <button value = "sortByRating" onClick={() => this.sortByRating()}>
            <h4 className="links">Rating</h4>
            </button>
       
    </div>

    <div className="nav-right-addBook nav-link">
    <button value = "sortByRD" onClick={() => this.sortByRD()}>
        <h4 className="links">Newest</h4>
        </button>
    </div>

    <div className="nav-right-cart nav-link">
    <button value = "sortByAuthor" onClick={() => this.sortByAuthor()}>
        <h4 className = "links">Author</h4>
        </button>
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
                                                        <p>by {book.authorName} </p>
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