const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (value) => {
                const re =
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                value.match(re);
            },
            message: 'Please enter a valid email',
        }
    },
    password: {
        type: String,
        required: true
    }
});

const AuthModel = new mongoose.model("User", authSchema);

module.exports = AuthModel;