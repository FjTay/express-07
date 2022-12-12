const express = require("express");
const { validateMovie } = require("./validator.js");
const { validateUser } = require("./validator.js");
const { hashPassword } = require("./auth.js");

const app = express();
app.use(express.json());

require("dotenv").config();

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const usersHandlers = require("./usersHandlers");

app.get("/api/movies", movieHandlers.getMovies)
app.get("/api/movies/:id", movieHandlers.getMovieById)

app.get("/api/users", usersHandlers.getUsers)
app.get("/api/users/:id", usersHandlers.getUsersById)

app.post("/api/users", validateUser, hashPassword, usersHandlers.postUser)
app.post("/api/movies", validateMovie, movieHandlers.postMovie)

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovieById)
app.put("/api/users/:id ", validateUser, usersHandlers.updateUserById)

app.delete("/api/movies/:id", movieHandlers.deleteMovie)

app.delete("/api/users/:id", usersHandlers.deleteUser)

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened")
  } else {
    console.log(`Server is listening on ${port}`)
  }
})
