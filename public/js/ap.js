console.log("Client side javascript is running");

const weatherform = document.querySelector("form");
const input = document.querySelector("input");
const messageone = document.querySelector("#message-1");
const messagetwo = document.querySelector("#message-2");
const messagethree = document.querySelector("#message-3");

weatherform.addEventListener("submit", async (e) => {
  e.preventDefault();

  const location = input.value;

  messageone.textContent = "Loading...";
  messagetwo.textContent = " ";
  messagethree.textContent = " ";

  // New code

  try {
    const response = await fetch(`/weather?address=${location}`);
    const data = await response.json();
    messageone.textContent = `Location: ${data.Location}`;
    messagetwo.textContent = `Temperature: ${data.Temperature}`;
    messagethree.textContent = `Weather Description: ${data.Description}`;
  } catch (error) {
    messageone.textContent = data.Error;
  }

  // Old code

  //   fetch("/weather?address=" + L).then((response) => {
  //     response.json().then((data) => {
  //       if (data.Error) {
  //         messageone.textContent = data.Error;
  //       } else {
  //         messageone.textContent = data.Location;
  //         messagetwo.textContent = data.Temperature;
  //       }
  //     });
  //   });
});
