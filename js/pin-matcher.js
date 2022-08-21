function getRandomInteger(inclusiveLowerBound, inclusiveUpperBound) {
  const Range = inclusiveUpperBound - inclusiveLowerBound;
  return inclusiveLowerBound + Math.floor(Math.random() * Range + 1);
}

function getNumberOfTrialsLeft() {
  const numberOfTrialsLeftElement = document.querySelector(
    ".number-of-trials-left"
  );
  return Number(numberOfTrialsLeftElement.textContent);
}

function decreaseNumberOfTrialsLeftByOne() {
  const numberOfTrialsLeftElement = document.querySelector(
    ".number-of-trials-left"
  );
  numberOfTrialsLeftElement.textContent =
    Number(numberOfTrialsLeftElement.textContent) - 1;
}

document
  .querySelector("button.generate-btn")
  .addEventListener("click", function () {
    this.previousElementSibling.value = getRandomInteger(0, 9999)
      .toString()
      .padStart(4, "0");
    document.querySelector(".number-of-trials-left").textContent = 3;
    document.querySelector("button.submit-btn").disabled = false;
  });

Array.from(document.querySelectorAll("div.button")).forEach(
  (calculatorButton) => {
    calculatorButton.addEventListener("click", function () {
      const numberOfTrialsLeft = getNumberOfTrialsLeft();
      if (numberOfTrialsLeft === 0) {
        return;
      }
      const input = this.textContent;
      const inputField = document.querySelector(".input-section input");
      if (input === "C") {
        inputField.value = "";
        return;
      }
      const currentInputFieldValue = inputField.value;
      if (input === "<" && currentInputFieldValue.length > 0) {
        inputField.value = currentInputFieldValue.slice(0, -1);
        return;
      }

      if (currentInputFieldValue.length >= 4) {
        return;
      }
      inputField.value = currentInputFieldValue + input;
    });
  }
);

document
  .querySelector("button.submit-btn")
  .addEventListener("click", function () {
    const inputField = document.querySelector(".input-section input");
    const currentInputFieldValue = inputField.value;
    const generatedPinInputField = document.querySelector(
      "input.generated-pin"
    );
    const currentGeneratedPin = generatedPinInputField.value;

    if (currentInputFieldValue === currentGeneratedPin) {
      const successElement = document.querySelector(".success-notification");
      inputField.value = "";
      generatedPinInputField.value = "";
      successElement.style.display = "block";
      setTimeout(function () {
        successElement.style.display = "none";
      }, 3000);
    } else {
      const failureElement = document.querySelector(".failure-notification");
      inputField.value = "";
      failureElement.style.display = "block";
      setTimeout(function () {
        failureElement.style.display = "none";
      }, 3000);
    }
    inputField.value = "";
    decreaseNumberOfTrialsLeftByOne();
    if (getNumberOfTrialsLeft() === 0) {
      generatedPinInputField.value = "";
      this.disabled = true;
    }
  });
