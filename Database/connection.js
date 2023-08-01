const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://huzaifak08:5ZOKut6kf4vZD6H0@cluster0.kbq7wiw.mongodb.net/notesdb")
    .then(() => {
        console.log("MongoDB Atlas Connection Successfull");
    })
    .catch((err) => {
        console.log(`Got MongoDB Connection error ${err.message}`)
    });