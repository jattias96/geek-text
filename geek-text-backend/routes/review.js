import  json  from 'body-parser';
import { Router } from 'express';
import { Book } from '../models/bookModel.js';

const router = Router();

//get reviews of a specific book 
router.route('/book/:id/reviews').post((req,res) => {
    await Book.findById(req.params.id, 'books')
    const newReview = new Review(req.body)
    newReview.save()
    .then(() => res.json('Review added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

export default router;