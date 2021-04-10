import mongoose from 'mongoose'
import {creditCardSchema} from './creditCard.js';
import {shippingAddressSchema} from './ShippingAddress.js';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    // TODO: Password must meet our current security standards
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // wac
    },
    homeAddress: { // wac
        type: String,
        default: "",
        trim: true
    },
    nickname: { // wac
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    shippingAddress: [shippingAddressSchema],
    creditCards: [creditCardSchema],
    cart: {
        type: Array,
        default: []
    },
    wishlist: {
        type: Array,
        default: []
    },
    booksPurchased:{
        type: [Schema.Types.ObjectId],
        ref: 'Book',
        default: []
    },
});

export const user = mongoose.model('user', userSchema);