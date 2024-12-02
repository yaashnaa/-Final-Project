const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files

app.set("view engine", "ejs");

// Set the directory for EJS templates
app.set("views", path.join(__dirname, "views")); // Ensure 'views' folder exists

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, "public")));

// written by AI because of CSP errors
app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            'https://cdnjs.cloudflare.com',
            'https://unpkg.com',
            'https://cdn.jsdelivr.net', // If you have external scripts from jsdelivr
          ],
          styleSrc: ["'self'", "'unsafe-inline'"],
          styleSrcElem: ["'self'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:'],
          connectSrc: [
            "'self'",
            "http://XX.XX.XX.XX:8084/mypp/",
            "https://tfhub.dev", // Add this line
          ],
        },
      },
    })
  );
app.listen(8080, () => console.log("Node.js web server at 8080 is running.."));

// Setup ngrok
const ngrok = require("@ngrok/ngrok");
(async function () {
  const listener = await ngrok.forward({
    addr: 8080,
    authtoken: "2pfpDevS44dc6rQ4PqM9Q1ZnjvY_5CkW3xbWqEi7Lty5wuo57" ,
  });
  console.log(`Ingress established at: ${listener.url()}`);
})();

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    description: "Welcome to our site!",
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