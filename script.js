const amountInput = document.getElementById("amount");
const baseCurrency = document.getElementById("base-currency").value;
const targetCurrency = document.getElementById("target-currency").value;
const convertBtn = document.getElementById("convert-btn");
const resultElement = document.getElementById("result");

convertBtn.addEventListener("click", () => {
  convertCurrency();
});

function convertCurrency() {
  const amountInputValue = amountInput.value.trim();

  if (amountInputValue === "" || isNaN(amountInputValue)) {
    console.log("Invalid input value");
  } else {
    const amount = parseFloat(amountInputValue);
    console.log("Amount:", amount);
  }
}

async function fetchExchangeRate(baseCurrency, targetCurrency) {
  const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching exchange rates: ${response.statusText}`);
    }
    const data = await response.json();

    const baseRate = data[baseCurrency];
    const targetRate = data[targetCurrency];
    const exchangeRate = targetRate / baseRate;

    return exchangeRate;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
}
