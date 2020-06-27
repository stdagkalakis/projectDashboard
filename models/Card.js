const mongoose = require('mongoose');

const CardSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('card', CardSchema);