// Deiby Picado
// Adivina el Numero - Juego
// Instrucciones del ejercicio tomadas de Mozilla MDN
let randomNumber  =  Math.ceil(Math.random()*100);
let resultsdiv= document.getElementById("results");
let submitbutton = document.getElementById("submitbutton");
let previousGuesses = document.getElementById("previousguesses");
let turns=0;
let playing=true;
function startAgain(){
  window.location.reload(true);
}
submitbutton.addEventListener("click",()=>{ 
    let inputUser= document.getElementById("numberInput").value; 
    if(turns<10){
  if(parseInt(inputUser) && playing){
    turns+=1;
    console.log("It's a number");
    previousGuesses.innerHTML+=`${inputUser} | `;
    if(parseInt(inputUser)===randomNumber){
      resultsdiv.style.background="green";
    resultsdiv.style.color="white";
    resultsdiv.innerHTML="CONGRATULATIONS! You guessed it";
     resultsdiv.innerHTML+="<br/> <button onclick='startAgain()'>Start Again</button>";
    playing=false;
    }else{
      if(parseInt(inputUser)<randomNumber){
        resultsdiv.style.background="Yellow";
    resultsdiv.style.color="black";
    resultsdiv.innerHTML="Wrong, last guess was too low";
      }else if(parseInt(inputUser)>randomNumber){
 resultsdiv.style.background="Yellow";
    resultsdiv.style.color="black";
    resultsdiv.innerHTML="Wrong, last guess was too high";
      }
    }
  }else{
    if(playing){
    resultsdiv.style.background="red";
    resultsdiv.style.color="white";
    resultsdiv.innerHTML="This is not a number";
    }
  }
    }else{
      resultsdiv.style.background="red";
    resultsdiv.style.color="white";
    resultsdiv.innerHTML="Sorry, you've ran out of turns";
    playing=false;
    resultsdiv.innerHTML+="<br/> <button onclick='startAgain()'>Start Again</button>";
    }
});


