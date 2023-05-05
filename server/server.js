const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const db = require("./db/db-connection.js");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
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

// create the POST request
app.post("/api/users", async (req, res) => {
  try {
    const newUser = {
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.lastname,
      birthday: req.body.birthday,
      username: req.body.username
    };
    //console.log([newUser.id, newUser.name, newUser.email, newUser.birthday, newUser.username]);
    const result = await db.query(
      "INSERT INTO users(user_id, name, email, birthday, username) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [newUser.user_id, newUser.name, newUser.email, newUser.birthday, newUser.username]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
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
  //console.log(req.params);
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
    updated_user.username
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

// creates endpoint to fetch popular movies
app.get("/api/movie/popular/", (req, res) => {
  const apiKey = process.env.API_KEY;

  const url= `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
      res.send({data})
  })
  .catch((err) => {
      console.log(err)
  })
});


//creates endpoint to fetch popular tv shows
app.get("/api/tv/popular/", (req, res) => {
    const apiKey = process.env.API_KEY;
  
    const url= `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        res.send({data})
    })
    .catch((err) => {
        console.log(err)
    })
  });

  //creates endpoint to fetch now playing movies
app.get("/api/movie/now_playing/", (req, res) => {
    const apiKey = process.env.API_KEY;
  
    const url= `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
    
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        res.send({data})
    })
    .catch((err) => {
        console.log(err)
    })
  });


// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
