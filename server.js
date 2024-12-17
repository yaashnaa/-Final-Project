const express = require("express");
const app = express();
const path = require("path");
const port= 3000
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the directory for EJS templates and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})
// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Respiro" });
});

app.get("/box", (req, res) => {
  res.render("box");
});

app.get("/affirmations", (req, res) => {
  res.render("affirmations");
});

app.get("/candle", (req, res) => {
  res.render("candle");
});

app.get("/navbar", (req, res) => {
  res.render("navbar");
});

app.get("/mandala", (req, res) => {
  res.render("mandala");
});

app.get("/kaledioscope", (req, res) => {
  res.render("hands");
});

// Export the app for Vercel
module.exports = app;
