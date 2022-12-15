const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
},
    { timestamps: true}
);
const user = mongoose.model('User', userSchema);
module.exports = user;