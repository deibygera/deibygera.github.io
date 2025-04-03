
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
//ADDED RECENTLY: send, choose, teach, stand
let irregularVerbs =[
          {infinitive:"Say",simplePast:"Said" },
          {infinitive:"Think",simplePast:"Thought" },
          {infinitive:"Tell",simplePast:"Told" },
          {infinitive:"Stand",simplePast:"Stood" },
          {infinitive:"Read", simplePast:"Read" },
          {infinitive:"Send", simplePast:"Sent" },
          {infinitive:"Teach", simplePast:"Taught" },
          {infinitive:"choose", simplePast:"chose" },
          {infinitive:"See", simplePast:"Saw" },
          {infinitive:"Know", simplePast:"Knew" },
          {infinitive:"Go", simplePast:"Went" },
          {infinitive:"Come", simplePast:"Came"},
          {infinitive:"Win", simplePast:"Won" },
          {infinitive:"Eat", simplePast:"Ate" },
          {infinitive:"Bring",simplePast:"Brought"},
          {infinitive:"Write",simplePast:"Wrote" },
          {infinitive:"Do",simplePast:"Did" },
          {infinitive:"Have", simplePast:"Had" },
          {infinitive:"Drink", simplePast:"Drank"},
          {infinitive:"Become", simplePast:"Became"},
          {infinitive:"Begin",simplePast:"Began" },
          {infinitive:"Blow", simplePast:"Blew" },
          {infinitive:"Break", simplePast:"Broke" },
          {infinitive:"Build", simplePast:"Built" },
          {infinitive:"Dig", simplePast:"Dug" },
          {infinitive:"Drive", simplePast:"Drove" },
          {infinitive:"Drink", simplePast:"Drank"},
          {infinitive:"Fall",simplePast:"Fell" },
          {infinitive:"Fly",simplePast:"Flew" },
          {infinitive:"Find",simplePast:"Found" },
          {infinitive:"Forget", simplePast:"Forgot" },
          {infinitive:"Forgive", simplePast:"Forgave" },
          {infinitive:"Get", simplePast:"Got" },
          {infinitive:"Grow", simplePast:"Grew"},
          {infinitive:"Hold", simplePast:"Held" },
          {infinitive:"Keep", simplePast:"Kept" },
          {infinitive:"Leave", simplePast:"Left"},
          {infinitive:"Lose", simplePast:"Lost"},
          {infinitive:"Make", simplePast:"Made" },
          {infinitive:"Meet", simplePast:"Met"},
          {infinitive:"Pay",simplePast:"Paid"},
          {infinitive:"Run",simplePast:"Ran"},
          {infinitive:"Ring",simplePast:"Rang"},
          {infinitive:"Sell",simplePast:"Sold"},
          {infinitive:"Sing",simplePast:"Sang"},
          {infinitive:"Sit",simplePast:"Sat"},
          {infinitive:"Speak",simplePast:"Spoke"},
          {infinitive:"Swear",simplePast:"Swore"},
          {infinitive:"Take",simplePast:"Took"},
          {infinitive:"Wear",simplePast:"Wore"},
          {infinitive:"Put",simplePast:"Put"},
          {infinitive:"Hear",simplePast:"Heard"},
          {infinitive:"Lie",simplePast:"Lay"},
          {infinitive:"Understand",simplePast:"Understood"},
          {infinitive:"Draw",simplePast:"Drew"},
          {infinitive:"Be",simplePast:"Was",simplePast2:"Were"},
           {infinitive:"Burn",simplePast:"Burned",simplePast2:"Burnt"},
           {infinitive:"Bust",simplePast:"Bust",simplePast2:"Bust"},
           {infinitive:"Dream",simplePast:"Dreamed",simplePast2:"Dreamt"},
            {infinitive:"Deal",simplePast:"Dealt"}

]
function randomInfinitive(){
   gameStatus.currentVerb = irregularVerbs[Math.floor(Math.random() * Math.floor(irregularVerbs.length))];
   return gameStatus.currentVerb.infinitive;
}
function randomSimplePast(){
   return irregularVerbs[Math.floor(Math.random() * Math.floor(irregularVerbs.length))].simplePast;
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
    if(domElements.userInput.value.toLowerCase()===gameStatus.currentVerb.simplePast.toLowerCase()){
      infoAnimation(true);
      getNewVerb();
       }else if(gameStatus.currentVerb.hasOwnProperty('simplePast2')&& domElements.userInput.value.toLowerCase()===gameStatus.currentVerb.simplePast2.toLowerCase()){
      infoAnimation(true);
      getNewVerb();
      }else{
      infoAnimation(false);
      
    }
    
  }
});
domElements.checkIcon.addEventListener("click", function() {
    if(domElements.userInput.value.toLowerCase()===gameStatus.currentVerb.simplePast.toLowerCase()){
      infoAnimation(true);
      getNewVerb();
    }else if(gameStatus.currentVerb.hasOwnProperty('simplePast2')&& domElements.userInput.value.toLowerCase()===gameStatus.currentVerb.simplePast2.toLowerCase()){
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
