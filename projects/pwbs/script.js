let slider={
    "imgElement":document.getElementById("viewer"),
    "imgTitle":document.getElementById("titleimg"),
    "imgDescription":document.getElementById("descriptionimg"),
    "pictures":["https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/34140/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940","https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"],
    "titles":["HTML","CSS","Javascript"],
    "descriptions":["Maquetado","Diseño Responsive","Sitios Dinámicos"],
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

