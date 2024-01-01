const mongoose = require('mongoose');
const useSC = mongoose.Schema;

const userSchema = new useSC({
    name: {
        first: {
            type: String,
            trim: true,
            required: true
        },
        last: {
            type: String,
            trim: true,
            required: false
        }
    },
    userDetails: {
        type: useSC.Types.ObjectId,
        ref: 'myusers'
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
},
    { timestamps: true }
)