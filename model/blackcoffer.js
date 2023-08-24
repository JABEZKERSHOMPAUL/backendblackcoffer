const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    _id: String,
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
}, { collection: 'blackcoffer' }); // Specify the collection name here

const NewsModel = mongoose.model('News', newsSchema);

module.exports=NewsModel;