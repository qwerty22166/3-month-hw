const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");
const currencyOneEl = document.getElementById("currency-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountOneEl = document.getElementById("amount-one");
const amountTwoEl = document.getElementById("amount-two");

let dataFromBack = {};

const mapRatesKeys = () => {
    return new Promise((resolve) => {
        fetch(
            `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/USD`
        )
        .then((res) => res.json())
        .then((data) => {
            const {conversion_rates: rates} = data;
            let renderRatesUSD ="";
            let renderRatesEUR ="";


            for (let key in rates) {
                renderRatesUSD +=
                key === "USD"
                ?  `<option value="${key}" selected>${key}</option>`
                : `<option value="${key}">${key}</option>`;

                renderRatesEUR +=
                key === "EUR"
                ?  `<option value="${key}" selected>${key}</option>`
                : `<option value="${key}">${key}</option>`;
            }

            currencyOneEl.innerHTML = renderRatesUSD;
            currencyTwoEl.innerHTML = renderRatesEUR;
            resolve();
        });
    });
};

const getData = () => {
    const currencyOne = currencyOneEl.value;
    const currencyTwo = currencyTwoEl.value;

    fetch(
        `https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`
    )
    .then((res) => res.json())
    .then((data) => {
        dataFromBack = {...data.conversion_rates}
        calculete(dataFromBack, currencyTwo)
    });
}

const calculete = (data, currencyTwo) => {
    const rate = data[currencyTwo];
    amountTwoEl.value = (+amountOneEl.value * rate).toFixed(2);
}

const runCalculete = () => {
    calculete(dataFromBack, currencyTwoEl.value)
}

mapRatesKeys().then(() => getData());

amountOneEl.addEventListener("input", runCalculete);
currencyOneEl.addEventListener("change", getData);
currencyTwoEl.addEventListener("change", runCalculete);
swapEl.addEventListener("click", () => {
    const accum = currencyOneEl.value;
    currencyOneEl.value = currencyTwoEl.value;
    currencyTwoEl.value = accum;

    getData();
})