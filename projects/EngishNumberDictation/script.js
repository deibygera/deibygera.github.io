
let gameDomElements={
      repeatIcon:document.getElementById("earIcon"),
      checkButton:document.getElementById("checkButton"),
      userInput:document.getElementById("user-answer"),
      checkIcon:document.getElementById("checkicon"),
      messagebox: document.getElementById("messagebox"),
      message: document.getElementById("message"),
      startMessage:document.getElementById("startMessage"),
      startButton:document.getElementById("btn-start"),
      messageIcon: document.getElementById("messageboxicon"),
      levelSelection:document.getElementById("levels")
}

let gameStats={
    randomNumber:0,
    level:1,
    language: 'en-US',
    rate: 0.6,
    pitch: 1,
    volume: 1,
    synth:window.speechSynthesis,
    talk:(words)=>{
      let speakObj=new SpeechSynthesisUtterance(words);
	    speakObj.lang = gameStats.language;
	    speakObj.rate = gameStats.rate;
	    speakObj.pitch = gameStats.pitch;
      speakObj.volume = gameStats.volume;
	    //let synth= window.speechSynthesis;
      gameStats.synth.speak(speakObj);
    },
      numberWithCommas:(x)=>{
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getRandomBetween: (min,max)=>{
    return Math.floor(Math.random()*(max-min+1)+min);
    },
    getRandom:()=>{
      if(gameStats.level===1){
      gameStats.randomNumber=gameStats.getRandomBetween(0,100);
      gameStats.talk(gameStats.numberWithCommas(gameStats.randomNumber));
      }else if(gameStats.level===2){
       gameStats.randomNumber=gameStats.getRandomBetween(100,999);
      gameStats.talk(gameStats.numberWithCommas(gameStats.randomNumber));
      }else if(gameStats.level===3){
      gameStats.randomNumber=gameStats.getRandomBetween(999,4000000);
      gameStats.talk(gameStats.numberWithCommas(gameStats.randomNumber));
      }
      gameDomElements.userInput.focus();
    }
  
}
function infoAnimation(correct){
    
  if(correct){
     gameDomElements.message.style.color="white";
     gameDomElements.messageIcon.classList.remove("fa-close");
     gameDomElements.messageIcon.style.color="greenyellow";
     gameDomElements.messageIcon.classList.add("fa-check");
//     domElements.message.innerHTML="CORRECT";
    }else{
      gameDomElements.message.style.color="white";
       gameDomElements.messageIcon.classList.remove("fa-check");
   gameDomElements.messageIcon.style.color="red";
    gameDomElements.messageIcon.classList.add("fa-close");
// domElements.message.innerHTML="WRONG";
 gameDomElements.userInput.focus();   
      gameDomElements.userInput.click();
    }
    gameDomElements.messagebox.classList.add("animationbox");
       setTimeout(function () {
      gameDomElements.messagebox.classList.remove("animationbox");
    }, 500);
}
gameDomElements.startButton.addEventListener("click",()=>{
   gameDomElements.startMessage.style.visibility="hidden";
   gameStats.getRandom(); 
});
gameDomElements.repeatIcon.addEventListener("click",()=>{
  if(gameStats.randomNumber>0){
    //console.log("Repeat");
    gameStats.synth.cancel();
 gameStats.talk(gameStats.numberWithCommas(gameStats.randomNumber));
  gameDomElements.userInput.focus();
  }
});
gameDomElements.checkIcon.addEventListener("click",()=>{
  
  if(gameStats.randomNumber===parseInt(gameDomElements.userInput.value)){
    gameDomElements.userInput.style.backgroundColor="#a5e8a5";
    gameDomElements.userInput.value="";
    gameStats.talk("Correct");
    infoAnimation(true);
    gameStats.getRandom();
  }else{
    gameDomElements.userInput.style.backgroundColor="#ed9d9d";
    infoAnimation(false);
    gameStats.talk("Wrong");
  }
  
});
gameDomElements.levelSelection.addEventListener("change",()=>{
  if(gameDomElements.levelSelection.value==="easy"){
    gameStats.synth.cancel();
    gameStats.level=1;
    gameStats.getRandom();
    }else if(gameDomElements.levelSelection.value==="medium"){
      gameStats.synth.cancel();
    gameStats.level=2;
    gameStats.getRandom();
    }else if(gameDomElements.levelSelection.value==="hard"){
    gameStats.synth.cancel();
    gameStats.level=3;
    gameStats.getRandom();

    }
    
});
gameDomElements.userInput.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    if(gameStats.randomNumber===parseInt(gameDomElements.userInput.value)){
    gameDomElements.userInput.style.backgroundColor="#a5e8a5";
    gameDomElements.userInput.value="";
    gameStats.talk("Correct");
    infoAnimation(true);
    gameStats.getRandom();
     gameDomElements.userInput.focus(); 
  }else{
    gameDomElements.userInput.style.backgroundColor="#ed9d9d";
    gameStats.talk("Wrong");
    infoAnimation(false);
    gameDomElements.userInput.focus();
  }
  
  }
});



