
let domElements={
     gameScreen: document.getElementById("gameMainScreen"),
     wordContainer: document.getElementById("wordContainer"),
     userInput: document.getElementById("user-answer"),
     messagebox: document.getElementById("messagebox"),
    message: document.getElementById("message"),
    checkIcon: document.getElementById("checkicon"),
    soundIcon: document.getElementById("soundIcon"),
    messageIcon: document.getElementById("messageboxicon"),
    quackSound: new Audio("sounds/quack.mp3"),
    popSound: new Audio("sounds/pop.mp3")
}
let gameStatus={
      currentVerb:null,
      sound:true
}
let irregularVerbs =[
          {infinitive:"Say",pastParticiple:"Said" },
          {infinitive:"Awake",pastParticiple:"Awoken" },
          {infinitive:"Bite",pastParticiple:"Bitten" },
          {infinitive:"Seek",pastParticiple:"Sought" },
          {infinitive:"Shake",pastParticiple:"Shaken" },
          {infinitive:"Shrink",pastParticiple:"Shrunk" },
          {infinitive:"Tell",pastParticiple:"Told" },
          {infinitive:"Read", pastParticiple:"Read" },
          {infinitive:"See", pastParticiple:"Seen" },
          {infinitive:"Know", pastParticiple:"Known" },
          {infinitive:"Go", pastParticiple:"Gone" },
          {infinitive:"Come", pastParticiple:"Come"},
          {infinitive:"Win", pastParticiple:"Won" },
          {infinitive:"Eat", pastParticiple:"Eaten" },
          {infinitive:"Bring",pastParticiple:"Brought"},
          {infinitive:"Write",pastParticiple:"Written" },
          {infinitive:"Do",pastParticiple:"Done" },
          {infinitive:"Have", pastParticiple:"Had" },
          {infinitive:"Drink", pastParticiple:"Drunk"},
          {infinitive:"Become", pastParticiple:"Become"},
          {infinitive:"Begin",pastParticiple:"Begun" },
          {infinitive:"Blow", pastParticiple:"Blown" },
          {infinitive:"Break", pastParticiple:"Broken" },
          {infinitive:"Build", pastParticiple:"Built" },
          {infinitive:"Dig", pastParticiple:"Dug" },
          {infinitive:"Drive", pastParticiple:"Driven" },
          {infinitive:"Fall",pastParticiple:"Fallen" },
          {infinitive:"Fly",pastParticiple:"Flown" },
          {infinitive:"Find",pastParticiple:"Found" },
          {infinitive:"Steal",pastParticiple:"Stolen" },
          {infinitive:"throw",pastParticiple:"thrown" },
          {infinitive:"Forget", pastParticiple:"Forgotten" },
          {infinitive:"Forgive", pastParticiple:"Forgiven" },
          {infinitive:"Get", pastParticiple:"Gotten", pastParticiple2:"Got" },
          {infinitive:"Grow", pastParticiple:"Grown"},
          {infinitive:"Hold", pastParticiple:"Held" },
          {infinitive:"Keep", pastParticiple:"Kept" },
          {infinitive:"Leave", pastParticiple:"Left"},
          {infinitive:"Lose", pastParticiple:"Lost"},
          {infinitive:"Make", pastParticiple:"Made" },
          {infinitive:"Meet", pastParticiple:"Met"},
          {infinitive:"Pay",pastParticiple:"Paid"},
          {infinitive:"Run",pastParticiple:"Run"},
          {infinitive:"Ring",pastParticiple:"Rung"},
          {infinitive:"Sell",pastParticiple:"Sold"},
          {infinitive:"Sing",pastParticiple:"Sung"},
          {infinitive:"Sit",pastParticiple:"Sat"},
          {infinitive:"Speak",pastParticiple:"Spoken"},
          {infinitive:"Swear",pastParticiple:"Sworn"},
          {infinitive:"Take",pastParticiple:"Taken"},
          {infinitive:"Wear",pastParticiple:"Worn"},
          {infinitive:"Put",pastParticiple:"Put"},
          {infinitive:"Hear",pastParticiple:"Heard"},
          {infinitive:"Lie",pastParticiple:"Lain"},
          {infinitive:"Understand",pastParticiple:"Understood"},
          {infinitive:"Draw",pastParticiple:"Drawn"},
          {infinitive:"Be",pastParticiple:"Been"},
           {infinitive:"Burn",pastParticiple:"Burned",pastParticiple2:"Burnt"},
           {infinitive:"Bust",pastParticiple:"Bust",pastParticiple2:"Bust"},
           {infinitive:"Dream",pastParticiple:"Dreamed",pastParticiple2:"Dreamt"}

]
function randomInfinitive(){
   gameStatus.currentVerb = irregularVerbs[Math.floor(Math.random() * Math.floor(irregularVerbs.length))];
   return gameStatus.currentVerb.infinitive;
}
function randomSimplePast(){
   return irregularVerbs[Math.floor(Math.random() * Math.floor(irregularVerbs.length))].pastParticiple;
}
function getNewVerb(){
domElements.wordContainer.innerHTML=randomInfinitive();
 domElements.userInput.value="";
}
function infoAnimation(correct){
    
  if(correct){
     domElements.message.style.color="white";
     domElements.messageIcon.classList.remove("fa-close");
     domElements.messageIcon.style.color="greenyellow";
     domElements.messageIcon.classList.add("fa-check");
//     domElements.message.innerHTML="CORRECT";
     if(gameStatus.sound){
      domElements.popSound.play();
     }
      domElements.userInput.focus();   
      domElements.userInput.click();
    }else{
      domElements.message.style.color="white";
       domElements.messageIcon.classList.remove("fa-check");
   domElements.messageIcon.style.color="red";
    domElements.messageIcon.classList.add("fa-close");
// domElements.message.innerHTML="WRONG";
if(gameStatus.sound){
domElements.quackSound.play();
}
 domElements.userInput.focus();   
      domElements.userInput.click();
    }
    domElements.messagebox.classList.add("animationbox");
       setTimeout(function () {
      domElements.messagebox.classList.remove("animationbox");
    }, 500);
}
getNewVerb();
domElements.userInput.addEventListener("keydown", function(event) {
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    if(domElements.userInput.value.toLowerCase()===gameStatus.currentVerb.pastParticiple.toLowerCase()){
      infoAnimation(true);
      getNewVerb();
       }else if(gameStatus.currentVerb.hasOwnProperty('pastParticiple2')&& domElements.userInput.value.toLowerCase()===gameStatus.currentVerb.pastParticiple2.toLowerCase()){
      infoAnimation(true);
      getNewVerb();
      }else{
      infoAnimation(false);
      
    }
    
  }
});
domElements.checkIcon.addEventListener("click", function() {
    if(domElements.userInput.value.toLowerCase()===gameStatus.currentVerb.pastParticiple.toLowerCase()){
      infoAnimation(true);
      getNewVerb();
    }else if(gameStatus.currentVerb.hasOwnProperty('pastParticiple2')&& domElements.userInput.value.toLowerCase()===gameStatus.currentVerb.pastParticiple2.toLowerCase()){
      infoAnimation(true);
      getNewVerb();
      }else{
      infoAnimation(false);
      
    }
    
  
});
domElements.soundIcon.addEventListener("click",()=>{
    if(gameStatus.sound){
      gameStatus.sound=false;
      domElements.soundIcon.classList.remove("fa-bell");
      domElements.soundIcon.classList.add("fa-bell-slash");
      	
    }else{
      gameStatus.sound=true;
         domElements.soundIcon.classList.remove("fa-bell-slash");
      domElements.soundIcon.classList.add("fa-bell");
    }

});
//domElements.button1.innerHTML=gameStatus.currentVerb.simplePast; // RIGHT ANSWER
