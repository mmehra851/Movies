const mongoose = require('mongoose');

//  Movie schema
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String, required: true }, 
    year: { type: Number, required: true },
    director: { type: String, required: true },
    cast: [{ type: String }],
   
});

// Create a model based on the schema
const Movie = mongoose.model('Movie', movieSchema);

// Export the Movie model
module.exports = Movie;
