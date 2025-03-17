
const amountValue = document.querySelector(".amountVal");
const fromCurrVal = document.querySelector(".from-currency");
const toCurrVal = document.querySelector(".to-currency");
const msgEle = document.querySelector(".msg");
const exchangeRateBtn = document.querySelector(".btn");

const searchList = document.querySelector(".search-list");


// Array to populate the select tags with these countries
const countries = [
    {code: "AED"},
    {code: "AFN"},
    {code: "XCD"},
    {code: "ALL"},
    {code: "AMD"},
    {code: "ANG"},
    {code: "AOA"},
    {code: "AQD"},
    {code: "ARS"},
    {code: "AUD"},
    {code: "AZN"},
    {code: "BAM"},
    {code: "BBD"},
    {code: "BDT"},
    {code: "XOF"},
    {code: "BGN"},
    {code: "BHD"},
    {code: "BIF"},
    {code: "BMD"},
    {code: "BND"},
    {code: "BOB"},
    {code: "BRL"},
    {code: "BSD"},
    {code: "NOK"},
    {code: "BWP"},
    {code: "BYR"},
    {code: "BZD"},
    {code: "CAD"},
    {code: "CDF"},
    {code: "XAF"},
    {code: "CHF"},
    {code: "CLP"},
    {code: "CNY"},
    {code: "COP"},
    {code: "CRC"},
    {code: "CUP"},
    {code: "CVE"},
    {code: "CYP"},
    {code: "CZK"},
    {code: "DJF"},
    {code: "DKK"},
    {code: "DOP"},
    {code: "DZD"},
    {code: "ECS"},
    {code: "EEK"},
    {code: "EGP"},
    {code: "ETB"},
    {code: "EUR"},
    {code: "FJD"},
    {code: "FKP"},
    {code: "GBP"},
    {code: "GEL"},
    {code: "GGP"},
    {code: "GHS"},
    {code: "GIP"},
    {code: "GMD"},
    {code: "GNF"},
    {code: "GTQ"},
    {code: "GYD"},
    {code: "HKD"},
    {code: "HNL"},
    {code: "HRK"},
    {code: "HTG"},
    {code: "HUF"},
    {code: "IDR"},
    {code: "ILS"},
    {code: "INR"},
    {code: "IQD"},
    {code: "IRR"},
    {code: "ISK"},
    {code: "JMD"},
    {code: "JOD"},
    {code: "JPY"},
    {code: "KES"},
    {code: "KGS"},
    {code: "KHR"},
    {code: "KMF"},
    {code: "KPW"},
    {code: "KRW"},
    {code: "KWD"},
    {code: "KYD"},
    {code: "KZT"},
    {code: "LAK"},
    {code: "LBP"},
    {code: "LKR"},
    {code: "LRD"},
    {code: "LSL"},
    {code: "LTL"},
    {code: "LVL"},
    {code: "LYD"},
    {code: "MAD"},
    {code: "MDL"},
    {code: "MGA"},
    {code: "MKD"},
    {code: "MMK"},
    {code: "MNT"},
    {code: "MOP"},
    {code: "MRO"},
    {code: "MTL"},
    {code: "MUR"},
    {code: "MVR"},
    {code: "MWK"},
    {code: "MXN"},
    {code: "MYR"},
    {code: "MZN"},
    {code: "NAD"},
    {code: "XPF"},
    {code: "NGN"},
    {code: "NIO"},
    {code: "NPR"},
    {code: "NZD"},
    {code: "OMR"},
    {code: "PAB"},
    {code: "PEN"},
    {code: "PGK"},
    {code: "PHP"},
    {code: "PKR"},
    {code: "PLN"},
    {code: "PYG"},
    {code: "QAR"},
    {code: "RON"},
    {code: "RSD"},
    {code: "RUB"},
    {code: "RWF"},
    {code: "SAR"},
    {code: "SBD"},
    {code: "SCR"},
    {code: "SDG"},
    {code: "SEK"},
    {code: "SGD"},
    {code: "SKK"},
    {code: "SLL"},
    {code: "SOS"},
    {code: "SRD"},
    {code: "STD"},
    {code: "SVC"},
    {code: "SYP"},
    {code: "SZL"},
    {code: "THB"},
    {code: "TJS"},
    {code: "TMT"},
    {code: "TND"},
    {code: "TOP"},
    {code: "TRY"},
    {code: "TTD"},
    {code: "TWD"},
    {code: "TZS"},
    {code: "UAH"},
    {code: "UGX"},
    {code: "USD"},
    {code: "UYU"},
    {code: "UZS"},
    {code: "VEF"},
    {code: "VND"},
    {code: "VUV"},
    {code: "YER"},
    {code: "ZAR"},
    {code: "ZMK"},
    {code: "ZWD"},
];


// Showing countries from array to select tag
countries.forEach(country => {
  const option1 = document.createElement("option");
  const option2 = document.createElement("option");

  option1.value = option2.value = country.code;
  option1.textContent= option2.textContent= `${country.code}`;

  fromCurrVal.appendChild(option1);
  toCurrVal.appendChild(option2);


  // Setting default values of select tag
  fromCurrVal.value = "USD";
  toCurrVal.value  =  "INR";

  fromCurrVal.addEventListener("change", (e)=>{
    updateFlag(e.target);
  });
  
  toCurrVal.addEventListener("change", (e)=>{
    updateFlag(e.target);
  });

});

let updateFlag = (ele) => {
  let currCode = ele.value;
  let newSrc = `https://flagsapi.com/${currCode.substring(0,2)}/flat/64.png`;
  let img = ele.parentElement.querySelector("img");
  if(img){
      img.src = newSrc;
  }
};


// Function to ge exchange rate using API
const getExchangeRate = async () =>{
  const amount = parseFloat(amountValue.value);
  const fromCurrency = fromCurrVal.value;
  const toCurrency = toCurrVal.value;

  // Fetch data from API
  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
  const data = await response.json();

  const conversionRate = data.rates[toCurrency];
  const convertedAmount = (amount * conversionRate);

  // msgEle.textContent = convertedAmount;
msgEle.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
}

exchangeRateBtn.addEventListener("click", getExchangeRate);
fromCurrVal.addEventListener("change", getExchangeRate);
toCurrVal.addEventListener("change", getExchangeRate);




// Showing countries from array to select tag
// countries.forEach(country => {
//   const option1 = document.createElement("option");
//   const option2 = document.createElement("option");

//   option1.value = option2.value = country.code;
//   option1.textContent= option2.textContent= `${country.code} (${country.name})`;

//   fromCurrVal.appendChild(option1);
//   toCurrVal.appendChild(option2);
// });
      

