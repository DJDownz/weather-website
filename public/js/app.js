console.log(`client side shit loaded.`);

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// DELETE absolute twataround
// const latitude = 42.3605;
// const longitude = -71.0596;
// const weatherURL =
//   "http://api.weatherstack.com/current?access_key=052f7dcdd98ef47357e9c692ab6693de&query=" +
//   latitude +
//   "," +
//   longitude;
// fetch(weatherURL).then((response) => {
//   response.json().then((data) => {
//     if (data.error) console.log(data.error.info);
//     if (!data.error) {
//       console.log(
//         `Weather for ${data.location.name}, ${data.location.region}, ${data.location.country}:`
//       );
//       console.log(...data.current.weather_descriptions);
//     }
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  //stop page refresh upon submit
  e.preventDefault();

  //set location to value in input box
  const location = search.value;

  //render loading message
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  //run fetch to weather page
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) messageOne.textContent = data.error;
        if (!data.error) {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
        }
      });
    }
  );
});
