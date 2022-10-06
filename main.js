// CRYPTO CLICKER

//Variabler
let btcprice;
let xrpprice;
let hbarprice;
let xlmprice;
let walletValue;
let btcvalue;
let xrpvalue;
let hbarvalue;
let xlmvalue;
let btcminer = 0;




//BTC EVENT CLICKER
const btc = document.getElementById('btc');
const btccounter = document.getElementById('btccounter');
const btcwallet = document.getElementById('btcwallet');
let btcTotal = 0;
btc.addEventListener("click", ()=> {
    btcTotal++;
    update()
})

//XRP EVENT CLICKER
const xrp = document.getElementById('xrp');
const xrpcounter = document.getElementById('xrpcounter');
const xrpwallet = document.getElementById("xrpwallet");
let xrpTotal = 0;
xrp.addEventListener("click", () => {
    xrpTotal++;
    update()
})

//HBAR EVENT CLICKER
const hbar = document.getElementById('hbar');
const hbarcounter = document.getElementById('hbarcounter');
const hbarwallet = document.getElementById('hbarwallet');
let hbarTotal = 0;
hbar.addEventListener("click", () => {
    hbarTotal++;
    update()
})

//XLM EVENT CLICKER
const xlm = document.getElementById('xlm');
const xlmcounter = document.getElementById('xlmcounter');
const xlmwallet = document.getElementById('xlmwallet');
let xlmTotal = 0;
xlm.addEventListener("click", () => {
    xlmTotal++;
    update()
})

//---WEBSOCKET AFSNIT TAGET FRA: https://www.youtube.com/watch?v=XXuUNZIQUVA&ab_channel=MorganPage---------

//BTC websocket til pris
    let wsbtc = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
    let btcpriceelement = document.getElementById('btcwalletprice');
wsbtc.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let bitcoinPriceFromApi = parseFloat(stockObject.p);
    btcprice = bitcoinPriceFromApi;
    btcpriceelement.innerText = "BTC Price: " + parseFloat(stockObject.p).toFixed(2) +"$";
    update()
}

//XRP websocket til pris
    let wsxrp = new WebSocket('wss://stream.binance.com:9443/ws/xrpusdt@trade');
    let xrppriceelement = document.getElementById('xrpwalletprice');
wsxrp.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let xrpPriceFromApi = parseFloat(stockObject.p);
    xrpprice = xrpPriceFromApi;
    xrppriceelement.innerText = "XRP Price: " + parseFloat(stockObject.p).toFixed(2) +"$";
    update()
}

//HBAR websocket til pris
    let wshbar = new WebSocket('wss://stream.binance.com:9443/ws/hbarusdt@trade');
    let hbarpriceelement = document.getElementById('hbarwalletprice');
wshbar.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let hbarPriceFromApi = parseFloat(stockObject.p);
    hbarprice = hbarPriceFromApi;
    hbarpriceelement.innerText = "HBAR Price: " + parseFloat(stockObject.p).toFixed(2) +"$";
    update()
}

//XLM websocket til pris
    let wsxlm = new WebSocket('wss://stream.binance.com:9443/ws/hbarusdt@trade');
    let xlmpriceelement = document.getElementById('xlmwalletprice');
wsxlm.onmessage = (event) => {
    let stockObject = JSON.parse(event.data);
    let xlmPriceFromApi = parseFloat(stockObject.p);
    xlmprice = xlmPriceFromApi;
    xlmpriceelement.innerText = "XLM Price: " + parseFloat(stockObject.p).toFixed(2) +"$";
    update()
}
//---------------------------------------------------------------------------------------------


//-----------------Funktioner----------------

//Function update
function update() {

//function update - Counter og wallet
    btccounter.innerHTML = "BTC Earned: " + btcTotal.toFixed(2);
    btcwallet.innerHTML = "BTC: " + btcTotal.toFixed(2);
    xrpwallet.innerHTML = "XRP: " + xrpTotal;
    xrpcounter.innerHTML = "XRP Earned: " + xrpTotal;
    hbarwallet.innerHTML = "HBAR: " + hbarTotal;
    hbarcounter.innerHTML = "HBAR Earned: " + hbarTotal;
    xlmwallet.innerHTML = "XLM: " + xlmTotal;
    xlmcounter.innerHTML = "XLM Earned: " + xlmTotal;

//function update - Value i sekundet
    let valuePerSec = (btcminer * btcprice);
    document.getElementById("valuePerSec").innerHTML = "Value/sec: " + valuePerSec + "$";

//function update - Trading og pairing
    let TradeXrp = (10000 * xrpprice) / (btcprice);
    let TradeHbar = (10000 * hbarprice) / (btcprice);
    let TradeXlm = (10000 * xlmprice) / (btcprice);
    let btcxrp = xrpprice / btcprice;
    let btchbar = hbarprice / btcprice;
    let btcxlm = xlmprice / btcprice;
    document.getElementById("TradeXrp").innerHTML = "Trade " + TradeXrp.toFixed(2) + " BTC for 10000 XRP";
    document.getElementById("TradeHbar").innerHTML = "Trade " + TradeHbar.toFixed(2) + " BTC for 10000 HBAR";
    document.getElementById("TradeXlm").innerHTML = "Trade " + TradeXlm.toFixed(2) + " BTC for 10000 XLM";
    document.getElementById("btcxrp").innerHTML = "BTC/XRP Pairing: " + btcxrp.toFixed(7);
    document.getElementById("btchbar").innerHTML = "BTC/HBAR Pairing: " + btchbar.toFixed(7);
    document.getElementById("btcxlm").innerHTML = "BTC/XLM Pairing: " + btcxlm.toFixed(7);

//function update - Miners
    document.getElementById('amountofminers').innerHTML = "You Own " + btcminer + " btc miners";
    document.getElementById('btcminercost').innerHTML = "Miner cost: " + ((btcminer+1) * 12) + "BTC";


//function update - Wallet og wallet * value
    let wallet = (btcTotal * btcprice) + (xrpTotal * xrpprice) + (hbarTotal * hbarprice) + (xlmTotal * xlmprice);
    document.getElementById('walletvalue').innerHTML = "Wallet value: " + walletValue + "$";
    walletValue = wallet.toFixed(2);
    btcvalue = btcTotal * btcprice.toFixed(2);
    xrpvalue = xrpTotal * xrpprice.toFixed(2);
    hbarvalue = hbarTotal * hbarprice.toFixed(2);
    xlmvalue = xlmTotal * xlmprice.toFixed(2);
    document.getElementById("btcvalue").innerHTML = "BTC Value: " + btcvalue.toFixed(2) + "$";
    document.getElementById("xrpvalue").innerHTML = "XRP Value: " + xrpvalue.toFixed(2) + "$";
    document.getElementById("hbarvalue").innerHTML = "HBAR Value: " + hbarvalue.toFixed(2) + "$";
    document.getElementById("xlmvalue").innerHTML = "XLM Value: " + xlmvalue.toFixed(2) + "$";
}

//timer med interval for at update
function timer(){
    btcTotal = btcTotal + btcminer;
    update()
}

setInterval(timer, 1000);

//onClick funktioner køb miner, xrp, hbar og xlm

//Køb miner funktion
function buyBtcMiner(){
    if(btcTotal >= ((btcminer+1) * 12)) {
        btcTotal = btcTotal - ((btcminer+1) * 12);
        btcminer = btcminer + 1;
        update()
    }
}

//Trade XRP funktion
function buyXRP(){
    if(btcvalue >= xrpprice * 10000) {
        btcTotal = btcTotal - ((xrpprice * 10000) / btcprice);
        xrpTotal = xrpTotal + 10000;
        update()
    }
}

//Trade HBAR funktion
function buyHBAR(){
    if(btcvalue >= hbarprice * 10000) {
        btcTotal = btcTotal - ((hbarprice * 10000) / (btcprice));
        hbarTotal = hbarTotal + 10000;
        update()
    }
}

//Trade XLM funktion
function buyXLM(){
    if(btcvalue >= xlmprice * 10000) {
        btcTotal = btcTotal - ((xlmprice * 10000) / (btcprice));
        xlmTotal = xlmTotal + 10000;
        update()
    }
}
