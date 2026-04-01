import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "work"
});

db.connect(err => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// CREATE CAR
app.post("/cars", (req, res) => {
  db.query("INSERT INTO Car SET ?", req.body, (err) => {
    if (err) return res.send(err);
    res.send("Car added");
  });
});

// READ CARS
app.get("/", (req, res) => {
  res.send("Welcome to the Car Repair Payment Management System!");
});

// DELETE CAR
app.delete("/cars/:plate", (req, res) => {
  db.query("DELETE FROM Car WHERE PlateNumber = ?", [req.params.plate], (err) => {
    if (err) return res.send(err);
    res.send("Car deleted");
  });
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
