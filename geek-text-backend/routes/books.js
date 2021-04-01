import { Router } from 'express';
import { Book } from '../models/bookModel.js';
const router = Router();

// Handle get request (all books)
router.route('/').get(async(req, res)=>{
    await Book.find()
    .then(books => res.json(books))
    .catch(err => res.status(400).json('Error: ' + err));
});

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