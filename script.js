//Grabbing HTML elements from the dom
const amountInput = document.getElementById("amount");
const baseCurrencySelect = document.getElementById("base-currency");
const targetCurrencySelect = document.getElementById("target-currency");
const convertBtn = document.getElementById("convert-btn");
const resultElement = document.getElementById("result");

//Event listener for the convert button that calls the getInput function when clicked
convertBtn.addEventListener("click", getInput);

//Function to get input from user, validate it, and return an error if it's invalid. It's an async function because it calls the fetchExchangeRate function inside of it
async function getInput() {
  //Getting the value of the input field and using the trim method to remove any whitespace that may cause an error
  const amountInputValue = amountInput.value.trim();

  //Getting the selected base and target currencies
  const baseCurrency = baseCurrencySelect.value;
  const targetCurrency = targetCurrencySelect.value;

  //Checking if the selected currencies are the same. Returns early if so
  if (baseCurrency === targetCurrency) {
    resultElement.innerText =
      "Base currency and target currency cannot be the same";
    return;
  }

  //Input validation to ensure that the input field isn't blank or not a number
  if (amountInputValue === "" || isNaN(amountInputValue)) {
    resultElement.innerText = "Invalid input value";
  } else {
    //Taking the input value, parsing it as a number and assigning it to the amount variable
    const amount = parseFloat(amountInputValue);

    //Fetching the exchange rate and calculating the converted amount
    const exchangeRate = await fetchExchangeRate(baseCurrency, targetCurrency);
    const convertedAmount = amount * exchangeRate;

    //Rounding the converted amount to two decimal places and displaying the result in the result element
    resultElement.innerText = `${amount} ${baseCurrency} = ${convertedAmount.toFixed(
      2
    )} ${targetCurrency}`;
  }
}

async function fetchExchangeRate(baseCurrency, targetCurrency) {
  //Defining the API URL
  const apiUrl = `https://v6.exchangerate-api.com/v6/bfcf6227812d45a8453534e4/latest/${baseCurrency}`;

  //Wrapping the code in a try-catch statement to catch any errors and logging them if they occur
  try {
    //Fetching data from the API
    const response = await fetch(apiUrl);

    //If the response is not ok throws an error
    if (!response.ok) {
      throw new Error(`Error fetching exchange rates: ${response.statusText}`);
    }

    //Parse the json response data
    const data = await response.json();

    // Checking if the API returned an error
    if (data.result === "error") {
      throw new Error(`Error fetching exchange rates: ${data["error-type"]}`);
    }

    // Getting the exchange rate directly from the data
    const exchangeRate = data.conversion_rates[targetCurrency];

    //Returning the exchange rate
    return exchangeRate;
  } catch (error) {
    //Logging any errors that occurred during the fetch process
    console.error("Error fetching exchange rates:", error);
  }
}
