let slider={
    "imgElement":document.getElementById("viewer"),
    "imgTitle":document.getElementById("titleimg"),
    "imgDescription":document.getElementById("descriptionimg"),
    "pictures":["https://images.pexels.com/photos/976862/pexels-photo-976862.jpeg","https://images.pexels.com/photos/12262186/pexels-photo-12262186.jpeg","https://images.pexels.com/photos/2020432/pexels-photo-2020432.jpeg","https://images.pexels.com/photos/92078/pexels-photo-92078.jpeg","https://images.pexels.com/photos/7887036/pexels-photo-7887036.jpeg","https://images.pexels.com/photos/744323/pexels-photo-744323.jpeg"],
    "titles":["Luces","Audio","Neblina","Musica en Vivo","Karaoke","DJ"],
    "descriptions":["Lights","Audio","Fog Machine","Live Music","Karaoke","DJ"],
    piccount:1,
    transition1:(value)=>{
      // not working
        slider.imgElement.style.filter="grayscale("+value+"%)";

    },
    start:()=>{
      slider.imgElement.src=slider.pictures[0];
      slider.imgTitle.innerHTML=slider.titles[0];
      slider.imgDescription.innerHTML=slider.descriptions[0];
      setInterval(function(){ 
          if(slider.piccount<slider.pictures.length){
          slider.imgElement.src=slider.pictures[slider.piccount];
          slider.imgTitle.innerHTML=slider.titles[slider.piccount];
          slider.imgDescription.innerHTML=slider.descriptions[slider.piccount];
          slider.piccount++;
          }else{
            slider.piccount=0;
             slider.imgElement.src=slider.pictures[slider.piccount];
              slider.imgTitle.innerHTML=slider.titles[slider.piccount];
          slider.imgDescription.innerHTML=slider.descriptions[slider.piccount];
          slider.piccount++;
          }
       }, 2000);
    }
}


window.onload=()=>{
   slider.start();
};