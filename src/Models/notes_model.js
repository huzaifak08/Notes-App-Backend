const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
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