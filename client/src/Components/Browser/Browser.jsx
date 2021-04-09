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
            page: Number(1), 
            lastPage: Number(100),
            perPage: Number(10),
            filter: {},
            genreDD: "All", // genre select Value for filter
            ratingDD: "All",// Rating select Value for filter
        }
    }
  
    
    //Get Books from db
    componentDidMount() {

        this.sortByTS();
    }

    sortByTS(){ // Top Sellers
        Axios.get(BOOKS + "getByTS", {
         params:{ 
             filter:  this.state.filter
         }
        })
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
        Axios.get(BOOKS + "getByTitle", {
            params:{ 
                filter:  this.state.filter
            }
            })
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
        Axios.get(BOOKS + "getByRating", {
            params:{ 
                filter:  this.state.filter
            }
        })
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
        Axios.get(BOOKS + "getByRD", {
            params:{ 
                filter:  this.state.filter
            }
        })
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
        Axios.get(BOOKS + "getByPrice", {
            params:{ 
                filter:  this.state.filter
            }
        })
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
        Axios.get(BOOKS + "getByAuthor", {
            params:{ 
                filter:  this.state.filter
            }
        })
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

    filterByFiction(){
        this.setState({
            filter: {genre: "60316e2ceda4ea0a72158abf"},
            genreDD: "Fiction",
            ratingDD: "All"
        })

        this.sortByTS()
    }

    filterByNF(){ // non-fiction
        this.setState({
            
                filter: {genre: "6047f6de2b677f17622ae060"},
                genreDD: "NF",
                ratingDD: "All"
        })

        this.sortByTS()
    }

    filterByAll(){
        this.setState({
            
                filter: {},
                ratingDD: "All",
                genreDD: "All"
            
        })

        this.sortByTS()
    }

    filterByFantasy(){
        this.setState({
            filter: {genre: "60309fdc5aa8bc214f4a9b9d"},
            genreDD: "Fantasy",
            ratingDD: "All"
        })

        this.sortByTS()
    }
    
    filterByPoetry(){
        this.setState({
            filter: {genre: "6047ec6c9c6672143d0e36aa"},
            genreDD: "Poetry",
            ratingDD: "All"
        })

        this.sortByTS()
    }

    filterByAB(){ // Autobiography
        this.setState({
            filter: {genre: "6056918441e30718cfa06152"},
            genreDD: "AB",
            ratingDD: "All"
        })

        this.sortByTS()
    }

    filterByHumour(){
        this.setState({
            filter: {genre: "605679b341e30718cfa06143"},
            genreDD: "Humour",
            ratingDD: "All"
        })

        this.sortByTS()
    }

    filterByNovel(){
        this.setState({
            filter: {genre: "6057548c7cb1dc2899337811"},
            genreDD: "Novel",
            ratingDD: "All"
        })

        this.sortByTS()
    }

    filterByFive(){
        this.setState({
            filter: {rating: 5},
            ratingDD: "5",
            genreDD: "All"
        })
        this.sortByTS()
    }

    filterByFourPlus(){
        this.setState({
            filter: {rating: {$gte: 4}},
            ratingDD: "4",
            genreDD: "All"
        })
        this.sortByTS()
    }

    filterByThreePlus(){
        this.setState({
            filter: {rating: {$gte: 3}},
            ratingDD: "3",
            genreDD: "All"
        })
        this.sortByTS()
    }

    filterByTwoPlus(){
        this.setState({
            filter: {rating: {$gte: 2}},
            ratingDD: "2",
            genreDD: "All"
        })
        this.sortByTS()
    }

    filterByOnePlus(){
        this.setState({
            filter: {rating: {$gte: 1}},
            ratingDD: "1",
            genreDD: "All"
        })
        this.sortByTS()
    }

    setTenPerPage(){
        this.setState({
            perPage: 10
        })

        this.sortByTS()
    }

    setTwentyPerPage(){
        this.setState({
            perPage: 20
        })

        this.sortByTS()
    }
    


// Actual Visual Stuff Below, Only Functions Above

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
    
</div>
</div>
<div className="nav">
<div className=".nav-left">
    
        <h1 className="inlineheader">Browse by:</h1>
</div>
<div className="nav-right">
<div className="nav-right-addBook nav-link">
    <InputLabel id="BooksPerPage">Books Per Page</InputLabel>
<Select labelId="Rating" id="select" value= {this.state.perPage}  >
  <MenuItem value= {10}><button value = "10perPage" onClick={() => this.setTenPerPage()}>
        <h4 className="links">10</h4>
        </button></MenuItem>
  <MenuItem value={20}><button value = "20perPage" onClick={() => this.setTwentyPerPage()}>
        <h4 className="links">20</h4>
        </button></MenuItem>
</Select>
    </div>
<div className="nav-right-addBook nav-link">
    <InputLabel id="Rating">Rating</InputLabel>
<Select labelId="Rating" id="select" value= {this.state.ratingDD}  >
  <MenuItem value="All"><button value = "filterByAll" onClick={() => this.filterByAll()}>
        <h4 className="links">All</h4>
        </button></MenuItem>
  <MenuItem value="5"><button value = "filterByFive" onClick={() => this.filterByFive()}>
        <h4 className="links">5</h4>
        </button></MenuItem>
  <MenuItem value="4"><button value = "filterByFourPlus" onClick={() => this.filterByFourPlus()}>
        <h4 className="links">4</h4>
        </button></MenuItem>
  <MenuItem value="3"><button value = "filterByThreePlus" onClick={() => this.filterByThreePlus()}>
        <h4 className="links">3</h4>
        </button></MenuItem>
    <MenuItem value="2"><button value = "filterByTwoPlus" onClick={() => this.filterByTwoPlus()}>
        <h4 className="links">2</h4>
        </button></MenuItem>
    <MenuItem value="1"><button value = "filterByOnePlus" onClick={() => this.filterByOnePlus()}>
        <h4 className="links">1</h4>
        </button></MenuItem>
</Select>
    </div>
<div className="nav-right-cart nav-link">
    <InputLabel id="Genre">Genre</InputLabel>
<Select labelId="Genre" id="select" value= {this.state.genreDD}  >
  <MenuItem value="All"><button value = "filterByAll" onClick={() => this.filterByAll()}>
        <h4 className="links">All</h4>
        </button></MenuItem>
  <MenuItem value="Fiction"><button value = "filterByFiction" onClick={() => this.filterByFiction()}>
        <h4 className="links">Fiction</h4>
        </button></MenuItem>
  <MenuItem value="NF"><button value = "filterByNF" onClick={() => this.filterByNF()}>
        <h4 className="links">Non-Fiction</h4>
        </button></MenuItem>
  <MenuItem value="Fantasy"><button value = "filterByFantasy" onClick={() => this.filterByFantasy()}>
        <h4 className="links">Fantasy</h4>
        </button></MenuItem>
    <MenuItem value="Poetry"><button value = "filterByPoetry" onClick={() => this.filterByPoetry()}>
        <h4 className="links">Poetry</h4>
        </button></MenuItem>
    <MenuItem value="Humour"><button value = "filterByHumour" onClick={() => this.filterByHumour()}>
        <h4 className="links">Humour</h4>
        </button></MenuItem>
    <MenuItem value="AB"><button value = "filterByAB" onClick={() => this.filterByAB()}>
        <h4 className="links">Autobiography</h4>
        </button></MenuItem>
    <MenuItem value="Novel"><button value = "filterByNovel" onClick={() => this.filterByNovel()}>
        <h4 className="links">Novel</h4>
        </button></MenuItem>
</Select>
    </div>
    </div>
    </div>
    <div className="card">
                       {this.state.books.map((book) => (
            <Book
              key={book._id}
              title={book.title}
              price={book.price}
              rating={book.rating}
              cover={book.cover}
              bookId={book._id}
              authorId={book.author}
              authorName={book.authorName}
            />
          ),{
                        })}
                        
                        
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