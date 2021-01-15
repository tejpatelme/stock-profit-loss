let companies = document.getElementById("companies");
let shareInput = document.getElementById("inputShareNo");
let priceInput = document.getElementById("inputBuyPrice");
let profitOrLoss = document.getElementById("output1");
let profitLossPercent = document.getElementById("output2");
let calcButton = document.querySelector(".button");


function calcProfitLoss(costPrice, currentPrice){
    let profit = currentPrice - costPrice;
    console.log(profit);
    let profitPercent = profit * 100/ costPrice;
    console.log(profitPercent);
    profitOrLoss.value = profit;
    profitLossPercent.value = profitPercent;

}

function clickHandler(){
    let noOfShares = parseInt(shareInput.value);
    let priceOfShare = parseInt(priceInput.value);
    let costPrice = priceOfShare * noOfShares;
    calcProfitLoss(costPrice, 10000*noOfShares);
}


calcButton.addEventListener('click', clickHandler);



// let value = companies.options[companies.selectedIndex].text;