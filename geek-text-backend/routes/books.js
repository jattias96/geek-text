import expressAzyncHandler from 'express-async-handler';
import { Router } from 'express';
import { Book } from '../models/bookModel.js';
const router = Router();

// Handle get request (all books)
router.route('/').get(async(req, res)=>{
    await Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Handle get request (Sort by title Alphabetical)
router.route('/getByTitle').get(async(req, res)=>{
    await Book.find().sort({title:1}).limit(10) 
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Handle get request (Sort by rating descending)
router.route('/getByRating').get(async (req, res) => {
    await Book.find().sort({rating: -1}).limit(10)
    .then(books=> res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Hande get request (Sort by Release date Newest to Oldest)
router.route('/getByRD').get(async (req, res) => {
    await Book.find().sort({releaseDate: -1}).limit(10)
    .then(books=> res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Handle post request (data population)
router.route('/add').post((req,res) => {
    const newBook = new Book(req.body)
    newBook.save()
    .then(() => res.json('Book added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

export default router;