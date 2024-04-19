const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readFromFile, readAndAppend, writeToFile } = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST route for a new note
notes.post("/", (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readAndAppend(newNote, "./db/db.json");
        res.json(`Note added successfully`);
    } else {
        res.error("Error in adding note");
    }
});

// DELETE route for a specific note
notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    readFromFile("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((json) => {
            // Make a new array of all notes except the one with the ID provided in the URL
            const result = json.filter((note) => note.id !== noteId);

            // Save that array to the filesystem
            writeToFile("./db/db.json", result);

            // Respond to the DELETE request
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

module.exports = notes;
