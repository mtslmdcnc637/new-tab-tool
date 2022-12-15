const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortcutSchema = new Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    user_email: { type: String, required: true }
},
    { timestamps: true}
);
const Shortcut = mongoose.model('Shortcut', shortcutSchema);
module.exports = Shortcut;