const request = require("request");

const getCoordinates = (cityName) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    cityName
  )}.json?access_token=pk.eyJ1IjoiYXRoYXJ2YWRlcmUxMDE4IiwiYSI6ImNrODJtdDBmMDA3YTgzbHFrZHV2MWxzenYifQ.6hGuEP7VmwXfVi3KQLy16A&limit=1`;

  const promise = new Promise((resolve, reject) => {
    request({ url: geocodeURL, json: true }, (error, response) => {
      if (error) {
        console.log("Unable to connect to the internet");
        reject("Unable to connect to the internet");
      } else if (response.body.features.length === 0) {
        console.log("No place found with given name");
        reject("No place found with given name");
      } else {
        const longitude = response.body.features[0].center[0];
        const latitude = response.body.features[0].center[1];
        const place = response.body.features[0].place_name;

        // console.log(
        //   "The latitude is: " +
        //     latitude +
        //     "  and the longitude is: " +
        //     longitude
        // );
        console.log(latitude, longitude);
        resolve([latitude, longitude, place]);
      }
    });
  });
  return promise;
};

const getWeather = (latitude, longitude) => {
  const url = `http://api.weatherstack.com/current?access_key=1410abeed804a4f15cb3e94cd6666ccd&query=${latitude},${longitude}`;

  // Setting json to true in the options callback so that the response gets already parsed
  const promise = new Promise((resolve, reject) => {
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        // console.log("Check for network error");
        reject("Check for network error");
      } else if (!response.body.current) {
        // console.log("Check for the city name");
        reject("Check for the city name");
      } else {
        // console.log(
        //   "It is currently " + response.body.current.temperature + " celcius"
        // );
        // console.log(
        //   "Weather Description: " +
        //     response.body.current.weather_descriptions[0]
        // );
        // console.log(response.body.current);
        resolve(response.body.current);
      }
    });
  });
  return promise;
};

module.exports = {
  geoCode: getCoordinates,
  forecast: getWeather,
};
