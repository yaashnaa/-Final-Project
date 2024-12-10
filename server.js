const express = require("express");
const app = express();
const path = require("path");
// const helmet = require("helmet");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
port=3000
// Serve static files

app.set("view engine", "ejs");

// Set the directory for EJS templates
app.set("views", path.join(__dirname, "views")); // Ensure 'views' folder exists

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.get("/", (req, res) => {
  res.render("index", {
    title: "Respiro",
  });
});

app.get("/box", (req, res) => {
  res.render("box");
});
app.get("/candle", (req, res) => {
  res.render("candle");
});

app.get("/mandala", (req, res) => {
  // console.log("Rendering visualiser page...");
  res.render("mandala");
});

app.get("/kaledioscope", (req, res) => {
  // console.log("Rendering visualiser page...");
  res.render("hands");
});