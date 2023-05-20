// const fetch = require("node-fetch");
const axios = require("axios");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");
const app = express();

const REACT_BUILD_DIR = path.join(__dirname, "..", "client", "dist");
app.use(express.static(REACT_BUILD_DIR));

const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

//User table routes/requests

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  // res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
  res.sendFile(path.join(REACT_BUILD_DIR, "index.html"));
});

// create the get request for users in the endpoint '/api/users'
app.get("/api/users", async (req, res) => {
  try {
    const { rows: users } = await db.query("SELECT * FROM users");
    res.send(users);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the get request for single user in the endpoint '/api/users/:user_id'
app.get("/api/users/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const { rows: users } = await db.query(
      "SELECT * FROM users WHERE user_id=$1",
      [user_id]
    );
    res.send(users.length > 0 ? users[0] : {});
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request
app.post("/api/users", async (req, res) => {
  try {
    const newUser = {
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      picture: req.body.picture,
    };
    //console.log([newUser.id, newUser.name, newUser.email, newUser.birthday, newUser.username]);
    const result = await db.query(
      "INSERT INTO users(user_id, name, email, username, picture) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING RETURNING *",
      [
        newUser.user_id,
        newUser.name,
        newUser.email,
        newUser.username,
        newUser.picture,
      ]
    );
    console.log(result.rows[0]);
    //if value is undefined set value to null/nothing
    res.json(result.rows[0] ?? {});
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for users
app.delete("/api/users/:user_id", async (req, res) => {
  try {
    const user_id = req.params.user_id;
    await db.query("DELETE FROM users WHERE user_id=$1", [user_id]);
    console.log(user_id, "Has been deleted");
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a user
app.put("/api/user/:user_id", async (req, res) => {
  //This will be the id that I want to find in the DB - the student to be updated
  const user_id = req.params.user_id;
  const updated_user = {
    user_id: req.body.user_id,
    name: req.body.name,
    email: req.body.email,
    birthday: req.body.birthday,
    username: req.body.username,
  };
  console.log(user_id, "Has been updated");
  // UPDATE users SET name = "something" WHERE id="16";
  const query = `UPDATE users SET name=$1, email=$2, birthday=$3, username=$4 WHERE id=${user_id} RETURNING *`;
  const values = [
    updated_user.name,
    updated_user.email,
    updated_user.birthday,
    updated_user.username,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//Reviews routes/requests

// create the get request for reviews in the endpoint '/api/reviews'
app.get("/api/reviews", async (req, res) => {
  try {
    const { rows: reviews } = await db.query("SELECT * FROM reviews");
    res.send(reviews);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the get request for single review in the endpoint '/api/reviews/:review_id'
app.get("/api/reviews/:review_id", async (req, res) => {
  const review_id = req.params.review_id;
  try {
    const { rows: reviews } = await db.query(
      "SELECT * FROM users WHERE review_id=$1",
      [review_id]
    );
    res.send(reviews);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the get request for all reviews for single user_id in the endpoint '/api/reviews/:user_id'
app.get("/api/reviews/user/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const { rows: reviews } = await db.query(
      "SELECT * FROM reviews WHERE reviewers_user_id=$1",
      [user_id]
    );
    res.send(reviews);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the get request for all reviews for single movie_id in the endpoint '/api/reviews/:movie_id'
app.get("/api/reviews/movie/:movie_id", async (req, res) => {
  const movie_id = req.params.movie_id;
  try {
    const { rows: reviews } = await db.query(
      "SELECT * FROM reviews JOIN users ON reviews.reviewers_user_id=users.user_id WHERE movie_id=$1",
      [movie_id]
    );
    res.send(reviews);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request for review
app.post("/api/reviews", async (req, res) => {
  try {
    const newReview = {
      movie_id: req.body.movie_id,
      user_id: req.body.user_id,
      star_rating: req.body.star_rating,
      title: req.body.title,
      post: req.body.post,
    };

    const result = await db.query(
      "INSERT INTO reviews(movie_id, reviewers_user_id, star_rating, title, post) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [
        newReview.movie_id,
        newReview.user_id,
        newReview.star_rating,
        newReview.title,
        newReview.post,
      ]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a review
app.put("/api/reviews/:review_id", async (req, res) => {
  //This will be the id that I want to find in the DB - the student to be updated
  const review_id = req.params.review_id;
  const updated_review = {
    title: req.body.title,
    post: req.body.post,
    star_rating: req.body.star_rating,
  };
  console.log("review", review_id, "Has been updated");
  // UPDATE users SET name = "something" WHERE id="16";
  const query = `UPDATE reviews SET title=$1, post=$2, star_rating=$3 WHERE review_id=${review_id} RETURNING *`;
  const values = [
    updated_review.title,
    updated_review.post,
    updated_review.star_rating,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for reviews
app.delete("/api/reviews/:review_id", async (req, res) => {
  try {
    const review_id = req.params.review_id;
    await db.query("DELETE FROM reviews WHERE review_id=$1", [review_id]);
    console.log(review_id, "Has been deleted");
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//Comments routes/requests

// create the get request for comments according to review_id in the endpoint '/api/comments/:review_id'
app.get("/api/comments/:review_id", async (req, res) => {
  const review_id = req.params.review_id;
  try {
    const { rows: comments } = await db.query(
      "SELECT * FROM comments JOIN users ON comments.user_id=users.user_id WHERE movie_review_id=$1",
      [review_id]
    );
    res.send(comments);
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request for comments
app.post("/api/comments", async (req, res) => {
  try {
    const newComment = {
      review_id: req.body.review_id,
      user_id: req.body.user_id,
      comment_text: req.body.comment_text,
    };

    const result = await db.query(
      "INSERT INTO comments(movie_review_id, user_id, comment_text) VALUES($1, $2, $3) RETURNING *",
      [newComment.review_id, newComment.user_id, newComment.comment_text]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a comment
app.put("/api/comments/:comment_id", async (req, res) => {
  //This will be the id that I want to find in the DB - the student to be updated
  const comment_id = req.params.comment_id;
  const updatedComment = {
    comment_text: req.body.comment_text,
  };
  console.log("comment", comment_id, "Has been updated");
  // UPDATE comments SET name = "something" WHERE id="16";
  const query = `UPDATE comments SET comment_text=$1 WHERE comment_id=${comment_id} RETURNING *`;
  const values = [updatedComment.comment_text];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for comments
app.delete("/api/comments/:comment_id", async (req, res) => {
  try {
    const comment_id = req.params.comment_id;
    await db.query("DELETE FROM comments WHERE comment_id=$1", [comment_id]);
    console.log(comment_id, "Has been deleted");
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//API routes/requests

// creates endpoint to fetch popular movies
app.get("/api/movie/popular/", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//creates endpoint to fetch now playing movies
app.get("/api/movie/now_playing/", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//creates endpoint to fetch horror movies
app.get("/api/movie/horror/", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//creates endpoint to fetch comedy movies
app.get("/api/movie/comedy/", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=35`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});



//creates endpoint to fetch action movies
app.get("/api/movie/action/", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=28`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//creates endpoint to fetch fantasy movies
app.get("/api/movie/fantasy/", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=14`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//creates endpoint to fetch animated movies
app.get("/api/movie/animated/", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//creates endpoint to fetch family movies
app.get("/api/movie/family/", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=10751`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//creates endpoint to fetch scifi movies
app.get("/api/movie/scifi/", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=878`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//creates endpoint to fetch details about movie or show by id
app.get("/api/movie/:movie_id", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&append_to_response=videos,credits`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//creates endpoint to fetch search results for movie
app.get("/api/search/:movie_query", async (req, res) => {
  try {
    const apiKey = process.env.API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie_query}`;

    const response = await axios.get(url);
    const data = response.data;
    res.send({ data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});


// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
