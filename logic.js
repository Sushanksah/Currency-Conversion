const fromAmount = document.querySelector('.amount');
const convertedAmount = document.querySelector('.convertedAmount');
const fromCurrency = document.querySelector('.fromCurrency');
const toCurrency = document.querySelector('.toCurrency');
const result = document.querySelector('.result');
const converterContainer = document.querySelector('.converter-container');

// Array of code of each country and country name 
for (code in countryList){
    // console.log(code, countryList[code]);
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');

    option1.innerText = option2.innerText = code;
    option1.value = option1.value = code;

    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);

    // Default Values
    fromCurrency.value = 'USD';
    toCurrency.value = 'INR';
}

// Function to get exchangeRates
const getExchangeRate = async () => {
    const amountValue = parseFloat(fromAmount.value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;
    result.innerHTML = 'Fetching exchange rates';

   try {
        // API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
        const data = await response.json();
        // console.log(data);

        const conversionRate = data.rates[toCurrencyValue];
        const convertedRate = (amountValue * conversionRate);

        if (typeof conversionRate === 'undefined'){
            result.textContent = 'Exchange rate is not available for selected country at this moment...';
            convertedAmount = "";
        } else {
            convertedAmount.value = convertedRate;
        result.innerText = `1 ${fromCurrencyValue} = ${conversionRate} ${toCurrencyValue}`;
        }
   } catch (error) {
        converterContainer.innerHTML = `<h2> Error while fetching exchange rates!!!<h2/>`
   }
}

// Fetch exchange rate when user enter the amount
fromAmount.addEventListener("input", getExchangeRate);

// Fetch exchange rate when user change the select option
fromCurrency.addEventListener("change", getExchangeRate);
toCurrency.addEventListener("change", getExchangeRate);

// Fetch exchange rate when page get refreshed
window.addEventListener("load", getExchangeRate);