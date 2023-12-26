const mongoose = require('mongoose');
const usc = mongoose.Schema;
const userScheme = new usc({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        sparse: true
    },
    subscribed: {
        type: String,
        required: false,
    },
    spiceCourse: [{
        type: usc.Types.ObjectId,
        ref: 'spices'
    }]
});

const user = mongoose.model('myUsers', userScheme);
module.exports = { user }