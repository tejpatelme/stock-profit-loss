let companies = document.getElementById("companies");
let shareInput = document.getElementById("inputShareNo");
let priceInput = document.getElementById("inputBuyPrice");
let profitOrLoss = document.getElementById("output1");
let output = document.querySelectorAll(".output");
let profitLossPercent = document.getElementById("output2");
let calcButton = document.querySelector(".button");
let stockDetailsItem = document.querySelectorAll(".weight-bold");
let errorDiv = document.querySelector(".errorDiv");
let message = document.getElementById("message");

let api_key = access.key;
let stockDetails = [];

//generating url to fetch based on the company selected
function generateURL(companyName){
    return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${companyName}&apikey=${api_key}`;
    // return "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";
}

//calculating profit/loss and displaying the output in the output divs
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
    profitOrLoss.value = "$" + profit.toFixed(2);
    profitLossPercent.value = profitPercent.toFixed(2);

}


//filling the stock details of the selected company
function fillStockDetails(items){
    for(let i=0; i<items.length; i++){
        stockDetailsItem[i].innerHTML = items[i];
    }
}

function showMessage(text){
    errorDiv.style.display = "flex";
    message.innerHTML = text;
}

function hideMessage(){
    errorDiv.style.display = "none";
}

//error handler
function handleError(error){
    console.log("Error:", error)
    alert("There is something wrong with the server, please try again in sometime")
}

//called when the calculate button is clicked.
function clickHandler(){
    let noOfShares = parseInt(shareInput.value);
    let priceOfShare = parseFloat(priceInput.value);
    let company = companies.options[companies.selectedIndex].value;
    if(company === "select"){
        showMessage("Please select a company")
    }
    else if(isNaN(noOfShares) || noOfShares === 0 || noOfShares < 0){
        showMessage("Enter valid number of shares");
    }
    else if(isNaN(priceOfShare) || priceOfShare === 0 || priceOfShare < 0){
        showMessage("Enter valid price of share");
    }
    else{
        hideMessage();
        let costPrice = priceOfShare * noOfShares;
        let currentPrice = 0;
        serverURL = generateURL(company);
        fetch(serverURL)
        .then(response => response.json())
        .then(json => {
            currentPrice = parseFloat(json["Global Quote"]["05. price"]);
            //populating the stockdetails array so as to pass it to the fillStockDetails function
            stockDetails = [json["Global Quote"]["07. latest trading day"],json["Global Quote"]["02. open"],json["Global Quote"]["08. previous close"],json["Global Quote"]["05. price"],json["Global Quote"]["03. high"],json["Global Quote"]["04. low"],json["Global Quote"]["06. volume"]];
            fillStockDetails(stockDetails);
            // console.log(stockDetails);
            // console.log(json["Global Quote"]["05. price"]);
        })
        .then( () => {
            calcProfitLoss(costPrice, currentPrice*noOfShares)})
        .catch(handleError)
    }

}

calcButton.addEventListener('click', clickHandler);

//dynamically populating the drop-down
window.addEventListener('load', ()=> {
    let option;
    for(let i=0; i<companiessandp.length; i++){
        option = new Option(companiessandp[i].Security, companiessandp[i].Symbol);
        companies.add(option);
    }
})



