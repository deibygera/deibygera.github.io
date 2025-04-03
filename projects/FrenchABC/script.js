

let domElements={
    letterContainer:document.getElementById("letter"),
    buttonStart:document.getElementById("startButton"),
    initialContainer:document.getElementById("initialContainer"),
    velocitybar:document.getElementById("velocity"),
    pronounceH3:document.getElementById("pronunciation")
}
let appData={
    alphabet:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    pronunciation:["a","be","se","de","e","ef","she","ash","i","shi","k","el","em","en","o","pe","ku","er","es","te","i","ve","double v","iks","i grek","zed"],    
    counter:0,
    velocity:2000,
    playing:false
}
let speechMotor={
    language: 'fr-FR',
    rate: 0.6,
    pitch: 1,
    volume: 1,
    synth:window.speechSynthesis,
    talk:(words)=>{
      let speakObj=new SpeechSynthesisUtterance(words);
	    speakObj.lang = speechMotor.language;
	    speakObj.rate = speechMotor.rate;
	    speakObj.pitch = speechMotor.pitch;
      speakObj.volume = speechMotor.volume;
	    //let synth= window.speechSynthesis;
      
      speechMotor.synth.speak(speakObj);
    },
    play:()=>{setTimeout(function(){ 
          
         if(appData.counter<appData.alphabet.length){
            //console.log(appData.alphabet[appData.counter]);
            domElements.letterContainer.innerHTML=appData.alphabet[appData.counter];
            domElements.pronounceH3.innerHTML=appData.pronunciation[appData.counter];
            speechMotor.synth.cancel();
            speechMotor.talk(appData.alphabet[appData.counter]);
            appData.counter++;
            }else{
              appData.counter=0;
               //console.log(appData.alphabet[appData.counter]);
               domElements.letterContainer.innerHTML=appData.alphabet[appData.counter];
               domElements.pronounceH3.innerHTML=appData.pronunciation[appData.counter];
              speechMotor.synth.cancel();
            speechMotor.talk(appData.alphabet[appData.counter]);
            appData.counter++;
            }
            speechMotor.play();
          }, appData.velocity)}
,
    stop:()=>{
      clearInterval(speechMotor.play);
    }
}


domElements.buttonStart.addEventListener("click",()=>{
  appData.playing=true;
  domElements.initialContainer.style.display="none";
  domElements.velocitybar.value=appData.velocity;

speechMotor.play();

});

domElements.velocitybar.addEventListener("change",()=>{
  console.log(domElements.velocitybar.value);
   appData.velocity=domElements.velocitybar.value;
   if(domElements.velocitybar.value<1500){
     speechMotor.rate=1.3;
   }else if(domElements.velocitybar.value>1500 && domElements.velocitybar.value<3000 ){
     speechMotor.rate=0.6;
   }else if(domElements.velocitybar.value>3000 &&domElements.velocitybar.value<4000 ){
     speechMotor.rate=0.4;
   }else if(domElements.velocitybar.value>4000 &&domElements.velocitybar.value<=5000 ){
     speechMotor.rate=0.2;
   }
});