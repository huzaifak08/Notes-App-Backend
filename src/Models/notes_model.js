const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    email: {
        type: String,
        // required: true,
    },
    title: {
        type: String,
        // required: true,
    },
    content: {
        type: String,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    }
});

const NotesModel = new mongoose.model("Notes", notesSchema);

module.exports = NotesModel;