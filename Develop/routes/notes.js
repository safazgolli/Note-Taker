const note = require('express').Router();
const uuid = require('../helpers/uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
note.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
note.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting notes');
  }
});

// router.delete("/api/notes/:id", async function (req, res) {
//     // separates note to delete based on id
//     const noteToDelete = req.params.id;
  
//     const currentNotes = await DB.readNotes();
//     // sort notes file, create a new array - the note in question
//     const newNoteData = currentNotes.filter((note) => note.id !== noteToDelete);
  
//     await DB.deleteNote(newNoteData);
    
//     return res.send(newNoteData);
//   });

module.exports = note;