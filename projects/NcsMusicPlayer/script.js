
// Simple music player
// last edit 15-9-20
/*  new songs:
-------
ncm_bounce_on_it
ncm_hitslab
ncm_noagain
---------
*/
let musicLibrary = [
{
 "trackName":"Bounce On IT",
 "artist":"Unknown",
 "source":new Audio("ncm_bounce_on_it.mp3"),
 "thumbnail":"https://i1.sndcdn.com/artworks-000102479667-3nn5tt-t500x500.jpg"
},
{
"trackName":"HitsLab",
 "artist":"Unknown",
"source":new Audio("ncm_hitslab.mp3"),
 "thumbnail":"https://images.genius.com/1f2ef3bf5684a87e07058bcb93c48ea7.600x600x1.jpg"
},
{
"trackName":"No Again",
"source":new Audio("ncm_noagain.mp3"),
 "artist":"Unknown",
 "thumbnail":"https://images.genius.com/3894cc0c9c6738715e17608800f8c839.500x500x1.jpg"
}]

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
