`use strict`;

const advice_text = document.querySelector(".advice");
const advice_generate_button = document.querySelector(".dice_container");
const advice_numeration = document.querySelector(".advice_numeration");

// remembering advice that was displayed before page refreshing and assigning in default text if no informaton in stored in "advice" on the computer yet
let advice = localStorage.getItem("advice");
advice_text.textContent =
  advice ||
  "“It is easy to sit up and take notice, what's difficult is getting up and taking action.”";

let advice_id = localStorage.getItem("advice_id");
advice_numeration.textContent = `ADVICE #${advice_id || 117}`;

function getAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then((response) => {
      if (response.ok) {
        console.log("SUCCESS"); // printing in console "SUCCESS" if everything went all right - 200 level status code
      } else {
        console.log("FAIL"); // printing in console "FAIL" if something didn't go well
      }
      return response.json();
    })
    .then((data) => {
      let advice = data.slip.advice;
      localStorage.setItem("advice", advice);
      advice_text.textContent = advice;
      advice_numeration.textContent = `ADVICE #${data.slip.id}`;
      localStorage.setItem("advice_id", data.slip.id);
      console.log(data);
    })
    // using catch method for occasions of network error or browser having hard time connecting to the internet
    .catch((error) => {
      console.error(error);
      advice_text.textContent =
        "Sorry, there was an error. Please try again later.";
    });
}

advice_generate_button.addEventListener("click", getAdvice);
