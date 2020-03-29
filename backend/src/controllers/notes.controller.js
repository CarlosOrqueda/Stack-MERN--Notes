import Note from '../models/Note';

const notesController = {};

notesController.getNotes = async (req, res) => {
    const response = await Note.find().lean();
    res.json(response)
};

notesController.createNote = async (req, res) => {
    const { title, content, author} = req.body;
    const newNote = new Note({title, content, author});
    await newNote.save();
    res.json({message: "Note saved"});
};

notesController.updateNote = async (req, res) => {
    const note = await Note.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).lean();
    res.json(note);
};

notesController.deleteNote = async (req, res) => {
    await Note.findOneAndDelete({_id:req.params.id});
    res.json({message: "Note deleted"});
};

notesController.getNote = async (req, res) => {
    const note = await Note.findById({_id: req.params.id}).lean();
    res.json(note);
};

module.exports = notesController;