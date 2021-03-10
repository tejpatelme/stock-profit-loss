const companies = document.getElementById("companies");
const shareInput = document.getElementById("inputShareNo");
const priceInput = document.getElementById("inputBuyPrice");
const profitOrLoss = document.getElementById("output1");
const output = document.querySelectorAll(".output");
const profitLossPercent = document.getElementById("output2");
const calcButton = document.querySelector(".button");
const stockDetailsItem = document.querySelectorAll(".weight-bold");
const errorDiv = document.querySelector(".errorDiv");
const message = document.getElementById("message");

const api_key = access.key;
let stockDetails = [];

//generating url to fetch based on the company selected
function generateURL(companyName){
    return `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${companyName}&apikey=${api_key}`;
    // return "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";
}

//calculating profit/loss and displaying the output in the output divs
function calcProfitLoss(costPrice, currentCostPrice){
    const profit = currentCostPrice - costPrice;
    const profitPercent = profit * 100/ costPrice;
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
async function clickHandler(){
    const noOfShares = parseInt(shareInput.value);
    const priceOfShare = parseFloat(priceInput.value);
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
        const costPrice = priceOfShare * noOfShares;
        let currentPrice = 0;
        const serverURL = generateURL(company);
        try {
            const response = await fetch(serverURL);
            const json = await response.json();
            currentPrice = parseFloat(json["Global Quote"]["05. price"]);
            stockDetails = [json["Global Quote"]["07. latest trading day"],json["Global Quote"]["02. open"],json["Global Quote"]["08. previous close"],json["Global Quote"]["05. price"],json["Global Quote"]["03. high"],json["Global Quote"]["04. low"],json["Global Quote"]["06. volume"]];
            fillStockDetails(stockDetails);
            calcProfitLoss(costPrice, currentPrice*noOfShares);
        } catch (error) {
            console.log(error);
            alert("There is something wrong with the server. Please try again in some time");
        }
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



