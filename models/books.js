const mongoose = require('mongoose'); 
const path = require('path');

const coverImageBasePath = 'uploads/bookCovers';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    publishDate: {
        type: Date,
        required: true
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now // Date.now is a function that returns the current date

    }, 
    coverImageName: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // This is a reference to the author model
        required: true,
        ref: 'Author' // This is the name of the model we are referencing
    }
});

bookSchema.virtual('coverImagePath').get(function() {
    if (this.coverImageName != null) {
        return path.join('/', coverImageBasePath, this.coverImageName); // This is the path to the image
    }
});



module.exports = mongoose.model('book', bookSchema);
module.exports.coverImageBasePath = coverImageBasePath;