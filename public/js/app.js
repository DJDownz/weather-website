console.log(`client side shit loaded.`);

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
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
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) messageOne.textContent = data.error;
      if (!data.error) {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
