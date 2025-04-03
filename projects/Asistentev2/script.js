 var boton = document.getElementById("empezar");
boton.addEventListener("click",function(){

/* 
      
       function estado(){
        var items = Array("Muy bien y tú?", "Pura Vida","Excelente, como estás tú?","Solo Guud!","Tuanis Mop", "De lo mejor y tú?");
        var item = items[Math.floor(Math.random() * items.length)]
          hablar(item);
       }
       function numeroAzar(){
          var items = Array("1","2","3","4","5","6","7","8","9");
        var item = items[Math.floor(Math.random() * items.length)]
          hablar("El número es: "+item);
       }
       function chiste(){
        var items = Array("Cual es la diferencia entre un toro vivo y un toro muerto?. Que el toro vivo enviste y el toro muerto en Bisteck","Por qué un pelón no puede vender drogas?. Por que enseña toda la Coca!","Que hace una manguera a media calle?. Vendiendo Mangos!","Cual es el animal que siempre va de último en la fila?. El delfín.","Que hace Bob Esponja en la playa?. Jugando con Arenita.");
       var item = items[Math.floor(Math.random() * items.length)]
          hablar(item);

       } */
      
	  // let utterance = new SpeechSynthesisUtterance("Hello //world!");
// speechSynthesis.speak(utterance);
let assistant = {
      "name":undefined,
      "idiomaHabla":"es-US",
      "idiomaEscuha":"es-CR",
      "saludos":["hola","que tal?","buenas"],
      "despedidas":["nos vemos","adios","hasta luego"],
      hablar(message){ 
	var msg = new SpeechSynthesisUtterance(message)
  //var voices = window.speechSynthesis.getVoices();
   msg.volume = 1;
    msg.pitch = 1;
    msg.rate = 1;
    msg.lang = 'es-US';
 // msg.voice = voices[0];
  window.speechSynthesis.speak(msg);
    return true;
      },
      saludar(){
        return assistant.hablar(assistant.saludos[Math.floor(Math.random()*assistant.saludos.length)]);
              },
      despedirse(){
        return assistant.hablar(assistant.despedidas[Math.floor(Math.random()*assistant.despedidas.length)]);
              },
	  listen(){
	   console.log('escuche mi nombre');
	   return assistant.hablar("dime");
	   },
	horaActual(){
		var today = new Date();
	    var time = today.getHours() + ":" + today.getMinutes();
        assistant.hablar("Son las "+time);
       },
	  ytsearch(param){
        window.open('https://www.youtube.com/results?search_query='+param,'_blank');
       },
	   nombrar(name){
	      assistant.name=name;
		  localStorage.setItem('assistantName', name);
          annyang.addCommands({[name]:assistant.listen});
		  return assistant.hablar("Genial!, ahora mi nombre es "+name);
	   },
	   borrarNombre(){
	   localStorage.removeItem('assistantName');
	   annyang.removeCommands([assistant.name]);
	   return assistant.hablar("Se ha borrado mi nombre");
	   }
	
}
assistant.name=localStorage.getItem('assistantName');
if(assistant.name === undefined || assistant.name===null) {
  assistant.hablar('Aún no tengo nombre')
}else{
assistant.hablar("Hola soy "+assistant.name)
}

	  
  if (annyang) {
  // Let's define our first command. First the text we expect, and then the function it should call

  var commands = {"hola":assistant.saludar,"diga *palabra":assistant.hablar, "qué hora es":assistant.horaActual,"buscar en youtube *busqueda":assistant.ytsearch,"tu nombre es *nombre":assistant.nombrar,"borra tu nombre":assistant.borrarNombre};
  
  
  // Add our commands to annyang
  annyang.addCommands(commands); // comandos principales
  if(assistant.name){
  let nombreAsistente = assistant.name;
  console.log(" tengo un nombre"); 
let commands2 = {[nombreAsistente]:assistant.listen};
//commands[nombreAsistente]=assistant.listen;
 annyang.addCommands(commands2);
 }else{
  console.log("no tengo un nombre");
  }

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
//     let finalTranscript = '';
  let recognition = new window.SpeechRecognition();
  recognition.continuous = true;
annyang.setLanguage("es-CR");
annyang.start({ autoRestart: true, continuous: true });

}
});