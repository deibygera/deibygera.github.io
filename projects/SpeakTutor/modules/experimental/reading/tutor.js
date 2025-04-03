


let tutor={
   domElements:{
     playButton:document.getElementById("playButton"),
     waitScreen:document.getElementById("waitRoom"),
     textTitle:document.getElementById("textTitle"),
     textContent:document.getElementById("textContent")
   },
  amIspeaking:false,
  wordCount:0,
  words:[],
  readVelocity:1000,
  sayHi:()=>{
    return console.log("Hi Everyone");
  },
  read:()=>{
    tutor.words=tutor.domElements.textContent.innerHTML.match(/\b\w{1,}\b/gmi);
    setInterval(() => {
          let utterance = new SpeechSynthesisUtterance(tutor.words[tutor.wordCount]);
      speechSynthesis.speak(utterance);

      tutor.words[tutor.wordCount].replace((match) => `<mark>${match}</mark>`);
      console.log(tutor.words[tutor.wordCount]);
      tutor.wordCount++;
    }, tutor.readVelocity);
    }
  // /\b\w{1,}\b/gmi

  }



tutor.domElements.playButton.addEventListener("click",()=>{
  tutor.domElements.waitScreen.style.display="none";

});
