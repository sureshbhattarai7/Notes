const express = require('express');
const router = express.Router();
const noteController = require('./../Controller/noteController');

router.route('/')
    .post(noteController.createNote)
    .get(noteController.getNotes);

router.route('/:id')
    .get(noteController.getNote)
    .patch(noteController.updateNote)
    .delete(noteController.deleteNote);

module.exports = router;