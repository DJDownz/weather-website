const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "g4yboi69",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABout me",
    name: "g4yboi69",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    name: "g4yboi69",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "piss off poof" });
  }
  if (req.query.address) {
    geocode(
      req.query.address,
      (geocodeError, { latitude, longitude, location } = {}) => {
        if (geocodeError) {
          res.send(`Geocoding service error: ${geocodeError}`);
          return;
        }

        forecast(latitude, longitude, (forecastError, forecastData) => {
          if (forecastError) {
            res.send(`Weather service error: ${forecastError}`);
            return;
          }
          res.send({
            address: req.query.address,
            location: location,
            forecast: forecastData,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  req.query;
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    msg404: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    msg404: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server up on port 3000.");
});

// DELETE
// // quick little geocode/forecast - no error handling
// geocode("boston", (geocodeError, { latitude, location, longitude } = {}) => {
//   //if proceeds based on truthy return of a response value
//   if (longitude) {
//     console.log(location);
//     // I think longitude and latitude are confused in source function maybe
//     forecast(latitude, longitude, (forecastError, forecastResponse) => {
//       if (forecastResponse) {
//         console.log(forecastResponse);
//       }
//     });
//   }
// });
