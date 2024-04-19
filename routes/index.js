//Importing Dependencies

//const router = require("express").Router();:Here this line imports the Router class from the Express module.The Router class allows you to create modular, mountable route handlers.
const router = require("express").Router();

//Importing Routes

//const api = require("./api");: Here this line imports the routes defined in another directory.It's importing the routes from a directory named "api".
const api = require("./notes");

// Routing Middleware

//router.use("/api", api);: Here this line specifies that any requests with a path starting with "/api" should be handled by the routes defined in the api module.It mounts the routes defined in the api module under the "/api" path.
router.use("/notes", notesRouter);

// Exporting the Router
// module.exports = router;: Here this line exports the router instance created using express.Router().It allows other files or modules to import this router and use it to define routes or mount additional middleware.
module.exports = router;