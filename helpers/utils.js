//Import Modules
//fs - The built -in Node.js module for interacting with the file system.
const fs = require("fs");
//util - This is a built -in Node.js module that provides utility functions for working with asynchronous code.
const util = require("util");

//Promisify fs.readFile

//fileRead - This here function uses util.promisify to convert the callback - based fs.readFile function into a promise - based function. It reads the contents of a file asynchronously and returns a promise that resolves with the file's content.
const fileRead = util.promisify(fs.readFile);

//File Editing Functions
//fileEdit - This here function takes a destination file path and content as arguments.It writes the content to the specified destination file using fs.writeFile.The content is stringified as JSON with an indentation of 4 spaces.If an error occurs during writing, it logs the error to the console.
const fileEdit = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => (err ? console.error(err) : console.info(`\nData written to ${destination}`)));

//readPlusEdit - This here function takes content to append and a file path as arguments.It reads the content of the file specified by the file path using fs.readFile.If there's an error reading the file, it logs the error to the console. Otherwise, it parses the data as JSON, appends the new content to the parsed data, and calls fileEdit to write the updated data back to the file.    
const readPlusEdit = (content, file) => {
    fs.readFile(file, "utf8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            fileEdit(file, parsedData);
        }
    });
};

//Export
//The module exports an object containing the fileRead, fileEdit, and readPlusEdit functions so that other modules can use them.
module.exports = { fileRead, fileEdit, readPlusEdit };