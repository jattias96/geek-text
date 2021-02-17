const router = require('express').Router();
let Book = require('../models/book.model');

// Handle get request
router.route('/').get((req, res)=>{
    Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});


// Handle post request
router.route('/add').post((req,res) => {

    const newBook = new Book(req.body)

    newBook.save()
    .then(() => res.json('Book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

/**
 * 


const title = req.body.title;
const author = req.body.author;
const genre = req.body.genre;

const newBook = new Book({
    title,
    password,
    email,
});




"title": "A Sample Book",

    "author": "John Doe",

    "genre": "mistery",

    "sold": 3,

    "comments": ["I don't like it", "I like it"],
    
    "price": 3.00,

    "description": "this is a sample book",

    "cover":"https://edit.org/images/cat/book-covers-big-2019101610.jpg",

    "releaseDate":"Wed Feb 17 2021 01:17:07 GMT-0700 (PDT)",

    "publishingInfo":{
        "publisher":"somePublisher",
        "edition":2,
        "isbn":"1234567890123"
    },

    "rating":4.5


     */