const Note = require('../Model/noteModel');

exports.createNote = (async (req, res) => {
    console.log("hitted")
    try {
        const note = await Note.create(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                note
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
});

exports.updateNote = (async (req, res) => {
   
    try {

        const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                note
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
});

exports.getNotes = (async (req, res) => {
    const notes = await Note.find();
    try {
        res.status(200).json({
            status: 'success',
            data: {
                notes
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
});

exports.getNote = (async (req, res) => {
    const note = await Note.findById(req.params.id);
    if (!note) {
        console.log('Can not find the data with that id!');
    }
    try {
        res.status(200).json({
            status: 'success',
            data: {
                note
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
});

exports.deleteNote = (async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    try {
        res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    };
});