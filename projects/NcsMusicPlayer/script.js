// Simple music player
// last edit 15-9-20
/*  new songs:
-------
Syn Cole – Feel Good
Elektronomia – Sky High
Deaf Kev - Invincible
Disfigure - Blank
Tobu - Infectious
Different Heaven - Nekozilla
Jarico - Landscape
Ikson - All Night
---------
*/
let musicLibrary = [
{
 "trackName":"Sweet Story",
 "artist":"Tobu",
 "source":new Audio("https://sq-sycdn.kuwo.cn/505bc6debda4e8e2ee9cc121988a884f/627334d7/resource/n1/88/28/2986954712.mp3"),
 "thumbnail":"https://i1.sndcdn.com/artworks-000102479667-3nn5tt-t500x500.jpg"
},
{
"trackName":"My Heart",
"source":new Audio("https://englishsongs.wapkiz.com/filedownload/2198002/Different-Heaven-EH-DE-My-Heart-NCS-Release-(englishsongs.wapkiz.com).mp3"),
 "thumbnail":"https://images.genius.com/1f2ef3bf5684a87e07058bcb93c48ea7.600x600x1.jpg"
},
{
"trackName":"Triple Rush",
"source":new Audio("https://cs1.mp3.pm/download/165773821/T2pibmhXVnFNRlAzSGNJemsxYWM4T1NOY0trbjFTc0ZTS1h1dzk3ODdHbERsanB5K2tKNFVaYk82djBIWnVUN2tmWDFybUJ2ZDBmYVJGaUZvaUcxOFVRZytOSWdOeUxqc1hYaVFYMFZWbVYwc1RnY0RTR3REdlYwRjNxYUFsTGE/K-391_-_Triple_Rush_Original_Mix_(mp3.pm).mp3"),
 "artist":"K-391",
 "thumbnail":"https://images.genius.com/3894cc0c9c6738715e17608800f8c839.500x500x1.jpg"
},
{
"trackName":"Link",
"source":new Audio("https://englishsongs.online/filedownload/1061736/Jim-Yosef-Link-NCS-Release-(englishsongs.online).mp3"),
 "artist":"Jim Yosef",
 "thumbnail":"https://i1.sndcdn.com/artworks-000223534459-dahqkp-t500x500.jpg"
},
{
"trackName":"Symbolism",
"source":new Audio("https://englishsongs.online/filedownload/2198006/Electro-Light-Symbolism-NCS-Release-(englishsongs.online).mp3"),
 "artist":"Electro-Light",
 "thumbnail":"https://i1.sndcdn.com/artworks-000098493971-gbwyv8-t500x500.jpg"
},
{
"trackName":"Jumbo",
"source":new Audio("https://cs1.mp3.pm/download/128132180/T2pibmhXVnFNRlAzSGNJemsxYWM4T1NOY0trbjFTc0ZTS1h1dzk3ODdHbUh2MlUvQXB4QUlTVk5aL0lKd1JzYTdEQ1NXRjdyeThlV0JrRnE5ZXJWRjNqNGNNcllpWk1yMGhwTW1RVWk5dGdkQU5tREVMYTUya0k3c1ppclpLVHA/Alex_Skrindo_-_Jumbo_(mp3.pm).mp3"),
 "artist":"Alex Skrindo",
 "thumbnail":"https://i1.sndcdn.com/artworks-000135827914-gt4xmy-t500x500.jpg"
},
{
"trackName":"Be Together",
"source":new Audio("https://cs1.mp3.pm/download/72417269/T2pibmhXVnFNRlAzSGNJemsxYWM4T1NOY0trbjFTc0ZTS1h1dzk3ODdHbnVZNTdUaUhLSHcrMWFxK1YrVTdCYU1sTjdsWkNuU05MWDQxOFI2cWxmMnF0S0M0V0xFamx6dW9GMisyS1J0a3piOTlQdTRoanp0REw3bDIxYnp0UUI/Zaza_-_Be_Together_NCS_Release_(mp3.pm).mp3"),
 "artist":"Zaza",
 "thumbnail":"https://linkstorage.linkfire.com/medialinks/images/ab0dcb17-ba7d-406f-b59e-69bb379c91ec/artwork-440x440.jpg"
},
{
"trackName":"Flares",
"source":new Audio("https://cs1.mp3.pm/download/100062578/T2pibmhXVnFNRlAzSGNJemsxYWM4T1NOY0trbjFTc0ZTS1h1dzk3ODdHbmJJVkx0RWFqK0k3ODJhY0ZSSzdBWEZ6T2JrMG45ZjU2N0JQdUw2cDZRcFlDNlZkN0JLRU9QSkkwaWNOSkVqYjJ6di8yT09YVXRoekliR1dXYndJbnI/Flares_-_NIVIRO_(mp3.pm).mp3"),
 "artist":"NIVIRO",
 "thumbnail":"https://i1.sndcdn.com/artworks-000284690804-c40s96-t500x500.jpg"
}
]

let player={
  "playing":false,
  "mainContainer":document.getElementById("mainContainer"),
  "playButton":document.getElementById("playButton"),
  "fordwardButton":document.getElementById("fordwardButton"),
  "backwardButton":document.getElementById("backwardButton"),
  "trackImage":document.getElementById("thumbnail"),
  "trackName":document.getElementById("trackName"),
  "trackArtist":document.getElementById("trackArtist"),
  "currentTime":document.getElementById("currentTime"),
  "duration":document.getElementById("duration"),
  "currentTrack":0,
  "default":()=>{
    this.currentTrack=0;
  this.trackName.innerHTML=musicLibrary[0].trackName;
  this.trackArtist.innerHTML=musicLibrary[0].artist;  
  this.thumbnail.src=musicLibrary[0].thumbnail; 
  this.duration.innerHTML="00:00";
  this.currentTime.innerHTML="00:00";
  },
  "songChangeAnimation":()=>{
     //player.trackImage.className='songChangeAnimation';
     player.trackImage.classList.add("songChangeAnimation");
  }


}
player.default(); // initial
function updateTrackDuration(){
  player.duration.innerHTML=` ${parseInt((musicLibrary[player.currentTrack].source.duration / 60) % 60)} : ${parseInt(musicLibrary[player.currentTrack].source.duration % 60)}`;
  return(true);
}
function showCurrentTime(){
  let seconds=0; 
  let minutes=0; 
  seconds= parseInt(musicLibrary[player.currentTrack].source.currentTime % 60);
 minutes=parseInt((musicLibrary[player.currentTrack].source.currentTime / 60) % 60);
  player.currentTime.innerHTML=`${minutes} : ${seconds} `;
// this interval updates song current time
setInterval(function(){
  seconds= parseInt(musicLibrary[player.currentTrack].source.currentTime % 60);
 minutes=parseInt((musicLibrary[player.currentTrack].source.currentTime / 60) % 60);
  player.currentTime.innerHTML=` ${minutes} : ${seconds} `;
   }, 1000);
  
}
function play(){
if(!player.playing){
player.playButton.setAttribute("class","controls fas fa-pause");
player.playing=true;
musicLibrary[player.currentTrack].source.play();
player.mainContainer.classList.add("colorsAnimation");
showCurrentTime();
updateTrackDuration();

}else{
  player.playButton.setAttribute("class","controls fas fa-play");
  player.playing=false;
  musicLibrary[player.currentTrack].source.pause();
  player.mainContainer.classList.remove("colorsAnimation");
}
}

function nextTrack(){
if(player.currentTrack<musicLibrary.length-1){
   // stops current song
   musicLibrary[player.currentTrack].source.pause();
   player.currentTrack+=1;
  player.trackName.innerHTML=musicLibrary[player.currentTrack].trackName;
  player.trackArtist.innerHTML=musicLibrary[player.currentTrack].artist;
  player.trackImage.src=musicLibrary[player.currentTrack].thumbnail; 
  player.songChangeAnimation();
  updateTrackDuration();
  //play next song
  if(player.playing){
     musicLibrary[player.currentTrack].source.currentTime=0;
 musicLibrary[player.currentTrack].source.play();
 }
 }
}
function previousTrack(){
if(player.currentTrack>0){
  // stops the current song
 musicLibrary[player.currentTrack].source.pause();
  player.currentTrack-=1;
  //update music data
  player.trackName.innerHTML=musicLibrary[player.currentTrack].trackName;
  player.trackArtist.innerHTML=musicLibrary[player.currentTrack].artist;
    player.trackImage.src=musicLibrary[player.currentTrack].thumbnail;
    player.songChangeAnimation();
    updateTrackDuration();
    //play previus song
    if(player.playing){
      musicLibrary[player.currentTrack].source.currentTime=0;
 musicLibrary[player.currentTrack].source.play();
    }

  }
}
function autoPlayNextSong(){
setInterval(function(){
    if(player.playing && musicLibrary[player.currentTrack].source.ended){
     nextTrack();
      }else{
    return false;
    }
   }, 1000);
}
//triggers
player.playButton.addEventListener("click",()=>{
play();
autoPlayNextSong();
});
document.addEventListener('keypress', function(e) { 
  var key = e.keyCode || e.which;
   // use spacebar to play or pause
  if(key==32){
    play();
  }
});


player.fordwardButton.addEventListener("click",()=>{
 nextTrack();
});
player.backwardButton.addEventListener("click",()=>{ 
previousTrack();
});