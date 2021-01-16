let companies = document.getElementById("companies");
let shareInput = document.getElementById("inputShareNo");
let priceInput = document.getElementById("inputBuyPrice");
let profitOrLoss = document.getElementById("output1");
let output = document.querySelectorAll(".output");
let profitLossPercent = document.getElementById("output2");
let calcButton = document.querySelector(".button");
let stockDetailsItem = document.querySelectorAll(".weight-bold");


let api_key = "K7GCCMCOXNSL32G9";
let stockDetails = [];

function generateURL(companyName){
    // return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${companyName}&apikey=${api_key}`;
    return "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";
}


function calcProfitLoss(costPrice, currentCostPrice){
    let profit = currentCostPrice - costPrice;
    let profitPercent = profit * 100/ costPrice;
    if(profit>=0){
        output[0].style["background-color"] = "green";
        output[1].style["background-color"] = "green";
        profitOrLoss.style.backgroundColor = "green";
        profitLossPercent.style.backgroundColor = "green";
    }
    else {
        output[0].style["background-color"] = "red";
        output[1].style["background-color"] = "red";
        profitOrLoss.style.backgroundColor = "red";
        profitLossPercent.style.backgroundColor = "red";
    }
    profitOrLoss.value = "$" + profit;
    profitLossPercent.value = profitPercent;

}

function fillStockDetails(items){
    for(let i=0; i<items.length; i++){
        stockDetailsItem[i].innerHTML = items[i];
    }
}

function clickHandler(){
    let noOfShares = parseInt(shareInput.value);
    let priceOfShare = parseInt(priceInput.value);
    let costPrice = priceOfShare * noOfShares;
    let currentPrice = 0;
    let company = companies.options[companies.selectedIndex].value;
    serverURL = generateURL(company);
    fetch(serverURL)
    .then(response => response.json())
    .then(json => {
        console.log(json);
        currentPrice = parseInt(json["Global Quote"]["05. price"]);
        stockDetails = [json["Global Quote"]["02. open"],json["Global Quote"]["08. previous close"],json["Global Quote"]["05. price"],json["Global Quote"]["03. high"],json["Global Quote"]["04. low"],json["Global Quote"]["06. volume"]];
        fillStockDetails(stockDetails);
        console.log(stockDetails);
        // fillStockDetails(json["Global Quote"]["02. open"],json["Global Quote"]["03. high"],json["Global Quote"]["04. low"],json["Global Quote"]["08. previous close"]);
        console.log(json["Global Quote"]["05. price"]);
    })
    .then( run => {
        calcProfitLoss(costPrice, currentPrice*noOfShares)});
}


calcButton.addEventListener('click', clickHandler);



