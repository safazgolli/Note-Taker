const note = require('express').Router();
const uuid = require('../helpers/uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const fs = require('fs');


// GET Route for retrieving all the notes
note.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting notes
note.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text} = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
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

note.delete("/:id", async function (req, res) {
    // separates note to delete based on id
    let initArray;
    const noteToDelete = req.params.id;
  
    await readFromFile('./db/db.json', 'utf8')
        .then((data) => initArray = JSON.parse(data))
  const newArray = initArray.filter((n) => n.id !== noteToDelete);
  console.log(newArray);

  fs.writeFile('./db/db.json', JSON.stringify(newArray, null, 4), (err) => 
  err ? console.error(err) : console.info('\nData written to ./db/db.json'))

  return res.send(newArray)
 
  });

module.exports = note;