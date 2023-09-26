const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const cors = require("cors");
const validator = require("express-validator");
app.use(cors());
const { Pool, Client } = require("pg");
const pool = new Pool();

const PORT = 3232;

//users table

app.get("/users", (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500).send("it failed"));
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM users WHERE id = $1;", [id])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500).send("it failed"));
});

app.post("/users", (req, res) => {
  const { first_name, last_name, age } = req.body;

  pool
    .query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3);",
      [first_name, last_name, age]
    )
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500).send("smth is wrong"));
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;

  pool
    .query(
      "UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4;",
      [first_name, last_name, age, id]
    )
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500).send("cant update"));
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM users WHERE id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500).send("cant delete this row"));
});

//orders table

app.get("/orders", (req, res) => {
  pool
    .query("SELECT * FROM orders")
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(404).send("your table is not found"));
});

app.get("/orders/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("SELECT * FROM orders WHERE id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(404).send("your table is not found"));
});

app.post("/orders", (req, res) => {
  const { price, date, user_id } = req.body;

  pool
    .query("INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3);", [
      price,
      date,
      user_id,
    ])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500).send("could not create a new order"));
});

app.put("/orders/:id", (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;

  pool
    .query(
      "UPDATE orders SET price = $1, date = $2, user_id = $3 WHERE id = $4;",
      [price, date, user_id, id]
    )
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500).send("could not update your row"));
});

app.delete("/orders/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM orders WHERE id = $1", [id])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(404).send("could not delete"));
});

app.listen(PORT, () => {
  console.log(`listening ${PORT}`);
});
