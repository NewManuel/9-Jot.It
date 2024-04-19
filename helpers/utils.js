const fs = require("fs");
const util = require("util");


const fileRead = util.promisify(fs.readFile);

const fileEdit = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) => (err ? console.error(err) : console.info(`\nData written to ${destination}`)));

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

module.exports = { fileRead, fileEdit, readPlusEdit };