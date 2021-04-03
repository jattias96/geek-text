import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import './Browser.css'
import Book from "../Cart/Book"
import { Select, MenuItem, InputLabel } from '@material-ui/core';

const BOOKS = 'http://localhost:5000/books/'
const AUTHORS = 'http://localhost:5000/authors/';

export default class Browser extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            allBooks: [],
            books: [],
            page: Number = 1, 
            lastPage: Number = 100,
            perPage: Number = 10,
        }
    }


    
    //Get Books from db
    componentDidMount() {

        this.sortByTS();
      /*  Axios.get(BOOKS)
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(10 + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
                    })
                }
                else {
                    console.log("No books recieved")
                }
            })
            .catch((error) => {
                console.log(error);
            })
            */
    }

    sortByTS(){ // Top Sellers
        Axios.get(BOOKS + "getByTS")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
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

    sortByTitle(){
        Axios.get(BOOKS + "getByTitle")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
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
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                       
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
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
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

    sortByPrice(){ // Price descending
        Axios.get(BOOKS + "getByPrice")
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
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
                        allBooks: response.data,
                        page: 1,
                    })
                    this.setState({
                        books: this.state.allBooks.slice((0 + (this.state.page -1)* this.state.perPage),(this.state.perPage + (this.state.page -1)* this.state.perPage)),
                        lastPage: Math.ceil(this.state.allBooks.length / this.state.perPage) ,
                        
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

    goNext(){ //next page
        if(this.state.page + 1 <= this.state.lastPage){
        this.setState({    
            page: this.state.page + 1,
        })
        this.setState((state)=>{
            return{
                books: this.state.allBooks.slice((0 + (state.page -1)* state.perPage),(this.state.perPage + (state.page -1)* state.perPage))
            }
            })
        }
    }

    goBack(){ //previous page
        if(this.state.page - 1 >= 1){
        this.setState({
            page: this.state.page -1,
        })
        this.setState((state)=>{
            return{
            books: this.state.allBooks.slice((0 + (state.page -1)* state.perPage),(this.state.perPage + (state.page -1)* state.perPage))
            }
        })
     }
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
     <button value = "sortByTS" onClick={ () => this.sortByTS()}>
        <h4 className="links">Top Sellers</h4>
        </button>
    </div>

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
    <div className="nav-right-addBook nav-link">
    <button value = "sortByPrice" onClick={() => this.sortByPrice()}>
        <h4 className="links">Price</h4>
        </button>
    </div>

    <div className="nav-right-cart nav-link">
    <button value = "sortByAuthor" onClick={() => this.sortByAuthor()}>
        <h4 className = "links">Author</h4>
        </button>
    </div>
    <div className="nav-right-cart nav-link">
    <InputLabel id="label">Genre</InputLabel>
<Select labelId="label" id="select" value="All" >
  <MenuItem value="All"><button value = "sortByPrice" onClick={() => this.sortByPrice()}>
        <h4 className="links">All</h4>
        </button></MenuItem>
  <MenuItem value="Fiction"><button value = "sortByPrice" onClick={() => this.sortByPrice()}>
        <h4 className="links">Fiction</h4>
        </button></MenuItem>
  <MenuItem value="NF"><button value = "sortByPrice" onClick={() => this.sortByPrice()}>
        <h4 className="links">Non-Fiction</h4>
        </button></MenuItem>
  <MenuItem value="MY"><button value = "sortByPrice" onClick={() => this.sortByPrice()}>
        <h4 className="links">Mystery</h4>
        </button></MenuItem>
    <MenuItem value="CD"><button value = "sortByPrice" onClick={() => this.sortByPrice()}>
        <h4 className="links">Comedy</h4>
        </button></MenuItem>
</Select>
    </div>
</div>
</div>
    <div className="card">
                        <p>{this.state.books.map((book) => (
            <Book
              key={book._id}
              title={book.title}
              price={book.price}
              rating={book.rating}
              cover={book.cover}
              bookId={book._id}
              author={book.author}
              authorName={book.authorName}
            />
          ),{
                        })}
                            </p>
                        
    </div>
    <div className="nav">
    <div className=".nav-left">
    <button value = "sortByTitle" onClick={ () => this.goBack()}>
        <h4 className="links">Previous</h4>
        </button>
    </div>
    
                    <h2>{this.state.page} / {this.state.lastPage}</h2>
    <div className=".nav-right">
    <button value = "sortByTitle" onClick={ () => this.goNext()}>
        <h4 className="links">  next  </h4>
        </button>
    </div>
    </div>
</div>
    )
}
}