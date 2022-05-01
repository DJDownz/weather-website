const { response } = require("express");
const request = require("request");

//forecast notes
//
// provide 3 arguments - two coords then the call back function with arguments (error, data)
// forecast outputs error and data for the callback function to use - only one though, one always undefined

const forecast = (longitude, latitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=052f7dcdd98ef47357e9c692ab6693de&query=" +
    longitude +
    "," +
    latitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Error: Unable to connect to weather service:`, undefined);
      console.log(error);
      return;
    }

    const { error: responseError, current: responseBodyCurrent } = body;

    if (responseError) {
      callback(`no good.:`, undefined);
      console.log(responseError);

      return;
    }

    if (!responseError) {
      callback(
        undefined,
        `${responseBodyCurrent.weather_descriptions[0]}. It is currently ${responseBodyCurrent.temperature} degrees. It feels like ${responseBodyCurrent.feelslike} degrees. Humidity is ${responseBodyCurrent.humidity}%.`
      );
      return;
    }
  });
};

// example call
//
// forecast(10, 10, (error, data) => {
//   console.log("Error:", error);
//   console.log("Data:", data);
// });

module.exports = forecast;
