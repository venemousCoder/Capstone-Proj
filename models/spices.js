const mongoose = require('mongoose');
const ssc = mongoose.Schema

const spiceSchema = new ssc({
    spiceName: {
        type: String,
        required: true,
        unique: true
    },
    ingredients: {
        type: [],
        required: true,
        unique: false
    },
    price: {
        type: Number,
        required: true,
        unique: false
    },
});

const spicy = mongoose.model('spices',spiceSchema);

module.exports = {spicy}