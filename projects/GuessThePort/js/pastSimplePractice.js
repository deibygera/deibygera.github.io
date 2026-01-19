
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
let abbvs =[
          {meaning:"HTTPS",abbreviation:"443",color:"#2003fc"},
          {meaning:"HTTP",abbreviation:"80",color:"#3926c9"},
          {meaning:"DNS",abbreviation:"53",color:""},
          {meaning:"DHCP(Server)",abbreviation:"67",color:"#4fa348"},
          {meaning:"DHCP(Client)",abbreviation:"68",color:"#79ff6e"},
          {meaning:"SSH",abbreviation:"22",color:"#f03e3e"},
          {meaning:"TFTP",abbreviation:"69",color:"#f0ed3e"},
          {meaning:"TELNET",abbreviation:"23",color:"#61005f"},
          {meaning:"SMTP",abbreviation:"25",color:"#c98d26"},
          {meaning:"FTP",abbreviation:"21",color:"#c7005d"},
                {meaning:"POP3",abbreviation:"110",color:"#00ffff"},
                   {meaning:"SNMP",abbreviation:"161",color:"#424242"},
                       {meaning:"IMAPv3",abbreviation:"220",color:"#7d4f00"},
                          {meaning:"OSPF",abbreviation:"89",color:"#c3ff00"}
          
]
function randomInfinitive(){
   gameStatus.currentVerb = abbvs[Math.floor(Math.random() * Math.floor(abbvs.length))];
   return gameStatus.currentVerb.meaning;
}
function randomSimplePast(){
   return abbvs[Math.floor(Math.random() * Math.floor(abbvs.length))].abbreviation;
}
function getNewVerb(){
domElements.wordContainer.innerHTML=randomInfinitive();
domElements.wordContainer.style.color=gameStatus.currentVerb.color;
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
    if(domElements.userInput.value.toLowerCase().replace(/ +/g, "")===gameStatus.currentVerb.abbreviation.toLowerCase().replace(/ +/g, "")){
      infoAnimation(true);
      getNewVerb();
       }else if(gameStatus.currentVerb.hasOwnProperty('abbreviation2')&& domElements.userInput.value.toLowerCase()===gameStatus.currentVerb.abbreviation2.toLowerCase()){
      infoAnimation(true);
      getNewVerb();
      }else{
      infoAnimation(false);
      
    }
    
  }
});
domElements.checkIcon.addEventListener("click", function() {
    if(domElements.userInput.value.toLowerCase().replace(/ +/g, "")===gameStatus.currentVerb.abbreviation.toLowerCase().replace(/ +/g, "")){
      infoAnimation(true);
      getNewVerb();
    }else if(gameStatus.currentVerb.hasOwnProperty('abbreviation2')&& domElements.userInput.value.toLowerCase().replace(/ +/g, "")===gameStatus.currentVerb.abbreviation2.toLowerCase().replace(/ +/g, "")){
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
