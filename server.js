
const path = require("path");
const express = require("express");
const fs = require("fs");
const api = require("./routes/index.js");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api", api);


app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

app.listen(PORT, () => console.log("Now listening"));


// Descriptions:

// Importing Required Packages:
// It imports the necessary packages: path, express, fs, and a custom module api from "./routes/index.js".
// Creating an Express Application:
// It initializes an instance of the Express application.
// Defining Middleware:
// It sets up middleware using app.use():
//     express.json(): Parses incoming request bodies with JSON payloads.
//         express.urlencoded({ extended: true }): Parses incoming request bodies with URL - encoded payloads.
//             express.static("public"): Serves static files from the "public" directory.
// "/api", api: Routes API requests to the custom API router defined in "./routes/index.js".
// Defining Routes:
// It defines routes using app.get() for serving HTML pages:
// GET route for the homepage("/"): Sends the "index.html" file located in the "public" directory.
// GET route for the notes page("/notes"): Sends the "notes.html" file located in the "public" directory.
// Starting the Server:
// It starts the server and listens on the specified port(PORT) or port 3001 if no port is provided.
// When the server starts, it logs a message to the console indicating that it is now listening.