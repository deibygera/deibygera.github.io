	var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.lang = 'es-CR';
	//recognition.interimResults = true;
	function start(){
		recognition.onresult = function(event) { 
			console.log(event);
			var output = document.getElementById("campoBusqueda");
			output.value = "";
			for(var i=0; i<event.results.length; i++){
				output.value = output.innerHTML + event.results[i][0].transcript;
			}
		}
		recognition.start();
	}
