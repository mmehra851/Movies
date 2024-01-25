const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Movie = require('../models/movie.model'); 
const User = require('../models/user.model'); 
const verifyToken = require('../middleware/verifyToken')

// CREATE
router.post('/add', async (req, res) => {
    const movie = new Movie(req.body);
    try {
        await movie.save();
        res.status(201).send(movie);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/allmovies', async (req, res) => {
   try{
    const allMovies = await Movie.find()
    res.send(allMovies)

   }catch(error){
    res.status(400).send(error.message);
   }
});

// READ a specific movie by ID
router.get('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found. Please check the ID and try again.' });
        }
        res.send(movie);
    } catch (e) {
        if (e instanceof mongoose.Error.CastError) {
            res.status(400).send({ message: 'Invalid ID format. Please check the ID and try again.' });
        } else {
            res.status(500).send({ message: 'An error occurred while retrieving the movie. Please try again later.' });
        }
    }
});


// UPDATE
router.patch('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found. Please check the ID and try again.' });
        }
        res.send(movie);
    } catch (error) {
        // console.error(error);
        res.status(400).send(error.message);
    }
});

// DELETE
router.delete('/movies/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send({ message: 'Movie not found. Please check the ID and try again.' });
        }
        // Delete the movie
        await Movie.findByIdAndDelete(req.params.id);

        res.send(`Selected Movie deleted`);
    } catch (error) {
        // console.error(error);
        res.status(400).send(error.message);
    }
});

module.exports = router;
