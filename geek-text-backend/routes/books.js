import  json  from 'body-parser';
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
    const filter = JSON.parse(req.query.filter)

    await Book.find(filter).sort({title:1})
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Handle get request (Sort by Author Alphabetical)
router.route('/getByAuthor').get(async(req, res)=>{
    const filter = JSON.parse(req.query.filter)
    await Book.find(filter).sort({authorName:1})
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
})
// Handle get request (Sort by amount sold descending)
router.route('/getByTS').get(async (req, res) => {
    //console.log(req.query.filter)
    const filter = JSON.parse(req.query.filter)
    //console.log(filter)
    await Book.find(filter).sort({sold: -1})
    .then(books=> res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Handle get request (Sort by rating descending)
router.route('/getByRating').get(async (req, res) => {
    const filter = JSON.parse(req.query.filter)
    await Book.find(filter).sort({rating: -1})
    .then(books=> res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Handle get request (Sort by price descending)
router.route('/getByPrice').get(async (req, res) => {
    const filter = JSON.parse(req.query.filter)
    await Book.find(filter).sort({price: -1})
    .then(books=> res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
})

// Hande get request (Sort by Release date Newest to Oldest)
router.route('/getByRD').get(async (req, res) => {
    const filter = JSON.parse(req.query.filter)
    await Book.find(filter).sort({releaseDate: -1})
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

// Get a specific book
router.route('/:id').get(async(req, res)=>{
    await Book.findById(req.params.id)
    .populate('genre')
    .populate('author')
    .then(book => res.json(book))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Increment count of books sold
router.route('/purchase/:id').patch(async(req, res)=>{
    try{
        const _id = req.params.id;
        const sold = req.body.sold;
        const result = await Book.findByIdAndUpdate(_id,{
            $inc:{sold: sold}
        });
        res.send(result);
    } catch (error){
        console.log(error.message);
    }
});

export default router;