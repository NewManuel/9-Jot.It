//Importing Required Packages
//It imports the necessary packages: fs, express, path, and a custom module api from "./routes/index.js".
const fs = require("fs");
const express = require("express");
const path = require("path");
const api = require("./routes/index.js");
const app = express();
const PORT = process.env.PORT || 3001;

//Creating an Express Application

//It initializes an instance of the Express application.Defining Middleware.It sets up middleware using app.use():
//express.json(): Parses incoming request bodies with JSON payloads.
app.use(express.json());
//express.urlencoded({ extended: true }): Parses incoming request bodies with URL - encoded payloads.
app.use(express.urlencoded({ extended: true }));
//express.static("public"): Serves static files from the "public" directory.
app.use(express.static("public"));
//"/api", api: Routes API requests to the custom API router defined in "./routes/index.js".
app.use("/api", api);

//Defining Routes

//It defines routes using app.get() for serving HTML pages:
//GET route for the homepage("/"): Sends the "index.html" file located in the "public" directory.
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));
//GET route for the notes page("/notes"): Sends the "notes.html" file located in the "public" directory.
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

//Starting the Server

//Below line starts the server and listens on the specified port(PORT) or port 3001 if no port is provided.
//When the server starts, it logs a message to the console indicating that it is "now listening".
app.listen(PORT, () => console.log("Now listening"));