const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortLinksSchema = new Schema({
    url: { type: String, required: true },
    title: { type: String, required: true },
    id: { type: String, required: true },
},
    { timestamps: true}
);
const Shortlink = mongoose.model('Shortcut', shortLinksSchema);
module.exports = Shortlink;