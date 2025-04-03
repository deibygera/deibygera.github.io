
let domElements={
     gameScreen: document.getElementById("gameMainScreen"),
     wordContainer: document.getElementById("wordContainer"),
     messagebox: document.getElementById("messagebox"),
    message: document.getElementById("message"),
    soundIcon: document.getElementById("soundIcon"),
    messageIcon: document.getElementById("messageboxicon"),
    startButton: document.getElementById("playbutton"),
    startScreen: document.getElementById("waitRoom"),
    quackSound: new Audio("../sounds/quack.mp3"),
    popSound: new Audio("../sounds/pop.mp3")
}
let gameStatus={
      letterCount:0,
      sound:true,
      transcript:"",
      currentLetter:"",
      wordCount:0
}
let letters =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
function nextLetter(){
  if(gameStatus.letterCount===0){
domElements.wordContainer.innerHTML=letters[gameStatus.letterCount];
gameStatus.currentLetter=letters[gameStatus.letterCount];
  gameStatus.letterCount++;         
  }else if(gameStatus.letterCount<=25){
   domElements.wordContainer.innerHTML=letters[gameStatus.letterCount];
   gameStatus.currentLetter=letters[gameStatus.letterCount];
   gameStatus.letterCount++;         
   }else if(gameStatus.letterCount>25){
     gameStatus.letterCount=0;
      domElements.wordContainer.innerHTML=letters[gameStatus.letterCount];
      gameStatus.currentLetter=letters[gameStatus.letterCount];
      gameStatus.letterCount++;  
   }
   return true;
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
    }else{
      domElements.message.style.color="white";
       domElements.messageIcon.classList.remove("fa-check");
   domElements.messageIcon.style.color="red";
    domElements.messageIcon.classList.add("fa-close");
// domElements.message.innerHTML="WRONG";
if(gameStatus.sound){
domElements.quackSound.play();
}
    }
    domElements.messagebox.classList.add("animationbox");
       setTimeout(function () {
      domElements.messagebox.classList.remove("animationbox");
    }, 500);
}

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

function checkLetter(transcript){
  if(transcript.toLowerCase().replace(/\s/g, '')===gameStatus.currentLetter.toLowerCase()){
infoAnimation(true);
console.log("cierto"+transcript);
nextLetter();
  }else{
    infoAnimation(false);
    console.log("falso"+transcript);
  }


}
var grammar = '#JSGF V1.0; grammar letters; public <lettter> = a | b | c | d | e | f | g | h | i | j | k | l | m | n | o | p | q | r | s | t | u | v | w | x | y | z | ;'

 var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;
 var resultados=null;
domElements.startButton.addEventListener("click",()=>{
  domElements.startScreen.style.display="none";
recognition.start();
nextLetter();

  /*recognition.onspeechend = function() {
                    console.log("stopped listening");
                    recognition.stop();
                    
                }*/
                  recognition.onresult = function(event) {
                    gameStatus.transcript = event.results[gameStatus.wordCount][0].transcript;

                  resultados = event.results;
                    var confidence = event.results[0][0].confidence;

                    checkLetter(gameStatus.transcript);
                    gameStatus.wordCount++;
                 
                };
                recognition.onspeechend = function() {
  recognition.stop();
}

});
