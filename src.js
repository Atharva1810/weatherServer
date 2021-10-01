const path = require("path");
const express = require("express");
const hbs = require("hbs");
const utils = require("./utils.js");

// Express is just a function which returns an application on which there are different methods
const app = express();

const port = process.env.PORT || 3000;
//Definepaths for express configuration
const viewsPath = path.join(__dirname, "/template/views");
const partialsPath = path.join(__dirname, "/template/partials");

//Setup handlebars engine and views location

// But one problem with setting up static assets is that we can use them for anything dynamic
// That is not even a single component on the page cant do anything dynamic

// Hence we need to use template engines like hbs(handlebars) where we can set up dynamic pages which get
// transformed to html during execution.

// In hbs files we use special syntax which is used to render dynamic components and for that we need to call
// another method on express that is the render method for rendering hbs files

// Now we set the view engine of express to hbs to let express know that we are using hbs templates

app.set("view engine", "hbs");
// As we have changes the views path we need to manually set it to required path
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Using express we can write html in the routes i.e. when use the get method but it can get out ouf hand really
// quickly as our application gets bigger so do our html files
// Hence in our project workflow we create a public directory where all our public static assets like HTML, CSS
// files and Client side Javascript resides

// Hence we tell the app to use the public static assets using app.use
app.use(express.static(path.join(__dirname, "/public")));

// render method accepts two arguments
// 1. The view(html page) to be rendered.
// 2. The an object that contains dynamic values that are to be passed to that view.
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Atharva",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Atharva",
    age: 18,
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    name: "Atharva",
    content: "help",
  });
});
app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "Please enter the address to fetch weather data",
    });
  }
  const address = req.query.address;

  // New code

  try {
    const [latitude, longitude, place] = await utils.geoCode(address);
    const currentWeather = await utils.forecast(latitude, longitude);

    res.send({
      Location: place,
      Temperature: currentWeather.temperature,
      Description: currentWeather.weather_descriptions[0],
    });
  } catch (error) {
    res.send({ Error: error });
  }

  //   ============================================   Old code    ==================================================
  //   utils.geoCode(command, (error, data = {}) => {
  //     if (error) {
  //       return res.send({ Error: error });
  //     }

  //     utils.forecast(data.latitude, data.longitude, (error, foreCastData) => {
  //       if (error) {
  //         return res.send({ Error: error });
  //       }
  //       res.send({
  //         Location: data.location,
  //         Temperature: foreCastData,
  //       });
  //     });
  //   });
});

app.get("*", (req, res) => {
  res.send("This my error page:");
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
