let characters=["0","1","2","3","4","5","6","7","8","9","A","a","B","b","C","c","D","d","E","e","F","f","G","g","H","h","I","i","J","j","K","k","L","l","M","m","N","n","O","o","P","p","Q","q","R","r","S","s","T","t","U","u","V","v","W","w","X","x","Y","y","Z","z","-","_"];

let ytCode="";

for(i=0;i<11;i++){

ytCode+=characters[Math.ceil(Math.random()*64)]


}
document.write("<iframe title='ytresult' src='https://www.youtube.com/embed/watch?v="+ytCode+"'width='500' height='500' >");