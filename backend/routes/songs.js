const express = require('express');
const router = express.Router();
const {
  getAllSongs,
  getSongById,
  createSong,
  updateSong,
  deleteSong,
} = require('../models/Song');

// Create a new song
router.post('/', async (req, res) => {
  try {
    const newSong = await createSong(req.body);
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await getAllSongs();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific song
router.get('/:id', async (req, res) => {
  try {
    const song = await getSongById(req.params.id);
    if (!song) return res.status(404).json({ message: 'Song not found' });
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a song
router.put('/:id', async (req, res) => {
  try {
    const updatedSong = await updateSong(req.params.id, req.body);
    if (!updatedSong) return res.status(404).json({ message: 'Song not found' });
    res.json(updatedSong);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a song
router.delete('/:id', async (req, res) => {
  try {
    await deleteSong(req.params.id);
    res.json({ message: 'Song deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
