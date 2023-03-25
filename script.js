const amountInput = document.getElementById("amount");
const baseCurrencySelect = document.getElementById("base-currency");
const targetCurrencySelect = document.getElementById("target-currency");
const convertBtn = document.getElementById("convert-btn");
const resultElement = document.getElementById("result");

convertBtn.addEventListener("click", getInput);

function getInput() {
  //Getting the value of the input field
  const amountInputValue = amountInput.value.trim();

  //Getting the selected base and target currencies
  const baseCurrency = baseCurrencySelect.value;
  const targetCurrency = targetCurrencySelect.value;

  //Checking if the selected currencies are the same. Returns early if so
  if (baseCurrency === targetCurrency) {
    console.log("Base currency and target currency cannot be the same");
    return;
  }

  //Input validation to ensure that the input field isn't blank or not a number
  if (amountInputValue === "" || isNaN(amountInputValue)) {
    console.log("Invalid input value");
  } else {
    //Taking the input value, parsing it as a number and assigning it to the amount variable
    const amount = parseFloat(amountInputValue);
    console.log("Amount:", amount);
    console.log("Base currency:", baseCurrency);
    console.log("Target currency:", targetCurrency);
  }
}

async function fetchExchangeRate(baseCurrency, targetCurrency) {
  //Defining the API URL
  const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`;

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

    //getting the base currency rate and the target currency rate from the data
    const baseRate = data[baseCurrency];
    const targetRate = data[targetCurrency];

    //Calculating the exchange rate by dividing the target rate by the base rate
    const exchangeRate = targetRate / baseRate;

    //Returning the exchange rate
    return exchangeRate;
  } catch (error) {
    //Logging any errors that occurred during the fetch process
    console.error("Error fetching exchange rates:", error);
  }
}
