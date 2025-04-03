
let domElements={
     gameScreen: document.getElementById("gameMainScreen"),
     wordContainer: document.getElementById("wordContainer"),
     messagebox: document.getElementById("messagebox"),
    message: document.getElementById("message"),
    soundIcon: document.getElementById("soundIcon"),
    messageIcon: document.getElementById("messageboxicon"),
    startButton: document.getElementById("playbutton"),
    startScreen: document.getElementById("waitRoom"),
}
let gameStatus={
      sound:true,
      transcript:"",
      wordCount:0,
      speaking:false
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
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
 function repeat(word){
  let synth=window.speechSynthesis;
let utterance= new SpeechSynthesisUtterance(word);
utterance.lang = 'en-US';
synth.speak(utterance);
gameStatus.speaking=synth.speaking;

utterance.onend = async function(event) {
  console.log('Utterance has finished being spoken after ' + event.elapsedTime + ' milliseconds.');
  await sleep(1500);
  gameStatus.speaking=synth.speaking;
  console.log(gameStatus.speaking);
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

   if(gameStatus.speaking===false){
                  recognition.onresult = function(event) {
                 
                    gameStatus.transcript = event.results[gameStatus.wordCount][0].transcript;

                  resultados = event.results;
                  
                    var confidence = event.results[0][0].confidence;
                  console.log(gameStatus.transcript)
                   repeat(gameStatus.transcript);
                    gameStatus.wordCount++;
                 
                };
                }
          //      recognition.onspeechend = function() {
  //recognition.stop();
//}

});
