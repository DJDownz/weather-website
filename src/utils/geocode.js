const request = require("request");

//geocode notes:
//
//geocode requires input of arguments: locationName (string), callback (function) (error, data)
//output of geocode is error (string), data (object) {latitude, longitude}
//provided callback function handles the error string and data object, logging them or whatever.
//geocode will always provide to callback function either error OR data, not both. Other will be undefined.

const geocode = (locationName, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(locationName) +
    ".json?access_token=pk.eyJ1IjoiYWRhbWRvd25lcyIsImEiOiJjbDBuY2k0ZTMwaGI4M2JrYTEwZ3FtdmM3In0.Zv9zuQNME94ldRcBsK823Q&limit=1";

  request({ url, json: true }, (error, response) => {
    // set features (only part used) from body object
    const { features } = response.body;

    if (error) {
      callback(`Error: Unable to connect to geocoding service`, undefined);
      return;
    }

    if (features.length === 0) {
      callback(`no good.`, undefined);
      return;
    }

    if (features.length !== 0) {
      // OLD CONST DEFINITIONS
      // const coords = features[0].center;
      // const long = coords[0];
      // const lat = coords[1];
      // const locationLong = features[0].place_name;

      // NEW CONST DEFNS
      const { center: coords, place_name: locationLong } = features[0];
      const long = coords[0];
      const lat = coords[1];
      callback(undefined, {
        longitude: long,
        latitude: lat,
        location: locationLong,
      });
      return;
    }
  });
};

module.exports = geocode;
