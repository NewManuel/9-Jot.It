const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { fileRead, fileEdit, readPlusEdit } = require("../helpers/utils");


notes.get("/", (req, res) => {
    fileRead("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.post("/", (req, res) => {
    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        readPlusEdit(newNote, "./db/db.json");
        res.json(`Note added successfully`);
    } else {
        res.error("Error in adding note");
    }
});

notes.delete("/:id", (req, res) => {
    const noteId = req.params.id;
    fileRead("./db/db.json")
        .then((data) => JSON.parse(data))
        .then((json) => {
           
            const result = json.filter((note) => note.id !== noteId);

           
            fileEdit("./db/db.json", result);

            res.json(`Item ${noteId} has been 🗑️ discarded.`);
        });
});

module.exports = notes;
