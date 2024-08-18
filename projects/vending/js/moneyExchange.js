var myHeaders = new Headers();
myHeaders.append("apikey", "lmtjoVkoN7qUDnvNAGE13rwQOA5aFvD5");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
let resultado;


async function convertAmount(currency){
    fetch("https://api.apilayer.com/exchangerates_data/convert?to="+currency+"&from=USD&amount="+totalaPagar, requestOptions)
    .then(response => response.text())
    .then(result => resultado=JSON.parse(result))
    //.then(document.getElementById("totalPagar").innerHTML=resultado['result']+"("+currency+")")
    .catch(error => console.log('error', error))
return resultado    
};





exchangeInput=document.getElementById("exchange");
exchangeInput.addEventListener("change",()=>{
    switch(exchangeInput.value){
        case "usd":
            document.getElementById("totalPagar").innerHTML="$"+totalaPagar+"(USD)";
            break;
        case "euro":
            console.log(convertAmount("EUR"));
            
            break;
        case "colones":
            // fetch("https://api.apilayer.com/exchangerates_data/convert?to=CRC&from=USD&amount="+totalaPagar, requestOptions)
            // .then(response => response.text())
            // .then(result => resultado=JSON.parse(result))
            // .catch(error => console.log('error', error))
            // .then(document.getElementById("totalPagar").innerHTML=resultado['result']+"(CRC)");
            break;
            case "pesoArg":
                // fetch("https://api.apilayer.com/exchangerates_data/convert?to=ARS&from=USD&amount="+totalaPagar, requestOptions)
                // .then(response => response.text())
                // .then(result => resultado=JSON.parse(result))
                // .catch(error => console.log('error', error))
                // .then(document.getElementById("totalPagar").innerHTML=resultado['result']+"(ARS)");

                break;
                case "pesoMex":
                    // fetch("https://api.apilayer.com/exchangerates_data/convert?to=MXN&from=USD&amount="+totalaPagar, requestOptions)
                    // .then(response => response.text())
                    // .then(result => resultado=JSON.parse(result))
                    // .catch(error => console.log('error', error))
                    // .then(document.getElementById("totalPagar").innerHTML=resultado['result']+"(MXN)");

                    break;
                    case "dolarCan":
                        // fetch("https://api.apilayer.com/exchangerates_data/convert?to=CAD&from=USD&amount="+totalaPagar, requestOptions)
                        // .then(response => response.text())
                        // .then(result => resultado=JSON.parse(result))
                        // .then(document.getElementById("totalPagar").innerHTML=resultado['result']+"(CAD)")
                        // .catch(error => console.log('error', error))
                       
                        break;
        default:
            console.log("internal error");
            break;
                


    }
    fetch("https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=CRC&amount=500", requestOptions)
    .then(response => response.text())
    .then(result => resultado=JSON.parse(result))
    .catch(error => console.log('error', error))
});
  