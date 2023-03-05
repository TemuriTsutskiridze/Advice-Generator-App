`use strict`


const advice_text = document.querySelector('.advice');
const advice_generate_button = document.querySelector('.dice_container');
const advice_numeration = document.querySelector(".advice_numeration");

// remembering advice coutner locally on the computer
let advice_counter = parseInt(localStorage.getItem('counter')) || 0; // converting string that is saved locally to integer
advice_numeration.textContent = `ADVICE #${advice_counter}`;

// remembering advice that was displayed before page refreshing and assigning in default text if no informaton in stored in "advice" on the computer yet
let advice = localStorage.getItem("advice");
advice_text.textContent = advice || "“It is easy to sit up and take notice, what's difficult is getting up and taking action.”";

function getAdvice() {
    fetch("https://api.adviceslip.com/advice")
        .then(response => {
            if (response.ok) {
                console.log("SUCCESS") // printing in console "SUCCESS" if everything went all right - 200 level status code
                // changing advice numeration
                advice_counter++;
                localStorage.setItem('counter', advice_counter);
                advice_numeration.textContent = `ADVICE #${advice_counter}`;
            } else {
                console.log("FAIL") // printing in console "FAIL" if something didn't go well
            }
            return response.json();
        })
        .then(data => {
            let advice = data.slip.advice;
            localStorage.setItem("advice", advice);
            advice_text.textContent = advice;
        })
        // using catch method for occasions of network error or browser having hard time connecting to the internet
        .catch(error => {
            console.error(error);
            advice_text.textContent = "Sorry, there was an error. Please try again later.";
        })
}

advice_generate_button.addEventListener("click", getAdvice);