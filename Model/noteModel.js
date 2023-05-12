const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A title must be defined!']
    },
    description: {
        type: String,
        required: [true, 'A body must be included!']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;