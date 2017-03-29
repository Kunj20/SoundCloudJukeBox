var playButton = document.querySelector("#play");
var pauseButton= document.querySelector("#pause");
var nextButton= document.querySelector("#nextsong");
var prevButton= document.querySelector("#prevsong");
var a= document.querySelector("#audio");
var searchButton= document.querySelector("#b1");
var searchWord= document.getElementById("input");
var searchArtwork= document.getElementById("a2");
var searchName= document.getElementById("d1");
var i= 0;
var k= 0;
var s;
var searchIdList= [];
var searchImageList= [];
var searchNameList= [];
var n= document.getElementById("n");
var l= document.getElementById("l");
var m= document.getElementById("m");
var stream;
SC.initialize({client_id:"fd4e76fc67798bfa742089ed619084a6"});
function Jukebox() {
  this.list= [];
  this.currentSong;
}
Jukebox.prototype.addSong = function(song) {
  var j;
  var k;
  this.list.push(song);
}
Jukebox.prototype.play = function () {
  this.currentSong= SC.stream("/tracks/" + this.list[i]);
  this.currentSong.then(function(player){
      stream= player;
      player.play();
    })
    SC.get("/tracks/" + this.list[i]).then(function(response){
      document.getElementById("artwork").src= response.artwork_url;
      document.getElementById("songName").innerHTML= response.title;
      document.getElementById("d2").innerHTML= response.description;

    })
}
Jukebox.prototype.pause= function () {
  this.currentSong.then(function(player){
    stream.pause();
  })
}
Jukebox.prototype.next= function(){
  i++;
  if(i<this.list.length){
    // SC.stream("/tracks/" + this.list[i]).then(function(player){
    //   stream= player;
    //   player.play();
    // })
    SC.get("/tracks/" + this.list[i]).then(function(response){
      document.getElementById("artwork").src= response.artwork_url;
      document.getElementById("songName").innerHTML= response.title;
      document.getElementById("d2").innerHTML= response.description;
    })
  }
  else{
    i= 0;
    // SC.stream("/tracks/" + this.list[i]).then(function(player){
    //   stream= player;
    //   player.play();
    // })
    SC.get("/tracks/" + this.list[i]).then(function(response){
      document.getElementById("artwork").src= response.artwork_url;
      document.getElementById("songName").innerHTML= response.title;
      document.getElementById("d2").innerHTML= response.description;
    })
  }
}
Jukebox.prototype.prev= function(){
  i--;
  if(i>=0){
    // SC.stream("/tracks/" + this.list[i]).then(function(player){
    //   stream= player;
    //   player.play();
    // })
    SC.get("/tracks/" + this.list[i]).then(function(response){
      document.getElementById("artwork").src= response.artwork_url;
      document.getElementById("songName").innerHTML= response.title;
      document.getElementById("d2").innerHTML= response.description;
    })
  }
  else{
    i= this.list.length-1;
    // SC.stream("/tracks/" + this.list[i]).then(function(player){
    //   stream= player;
    //   player.play();
    // })
    SC.get("/tracks/" + this.list[i]).then(function(response){
      document.getElementById("artwork").src= response.artwork_url;
      document.getElementById("songName").innerHTML= response.title;
      document.getElementById("d2").innerHTML= response.description;
    })
  }
}
var jukebox= new Jukebox();
function searchSC(word){
  SC.get("/tracks", {
    q: word
  }).then(function(response){
    var j;
    var n;
    var d;
    for(r = 0; r < response.length; r++){
      j= response[r].artwork_url;
      n= response[r].title;
      d= response[r].id;
      searchImageList.push(j);
      searchNameList.push(n);
      searchIdList.push(d);
    }
    k=0
    searchArtwork.src= searchImageList[k];
    searchName.innerHTML= searchNameList[k];
  })
}
searchSC.prototype.nextsong= function(){
  k++;
  if(k < searchImageList.length){
    searchArtwork.src= searchImageList[k];
    searchName.innerHTML= searchNameList[k];
  }
  else{
    k= 0;
    searchArtwork.src= searchImageList[k];
    searchName.innerHTML= searchNameList[k];
  }
}
searchSC.prototype.prevsong= function() {
  k--;
  if(k >= 0){
    searchArtwork.src= searchImageList[k];
    searchName.innerHTML= searchNameList[k];
  }
  else{
    k= searchImageList.length-1;
    searchArtwork.src= searchImageList[k];
    searchName.innerHTML= searchNameList[k];
  }
}
searchSC.prototype.getId= function(){
  return searchIdList[k];
}
playButton.addEventListener("click", function(event){
  event.preventDefault();
  jukebox.play()
})
pauseButton.addEventListener("click", function(event){
  event.preventDefault();
  jukebox.pause();
})
nextButton.addEventListener("click", function(event){
  event.preventDefault();
  jukebox.next();
})
prevButton.addEventListener("click", function(event){
  event.preventDefault();
  jukebox.prev();
})
searchButton.addEventListener("click", function(event){
  event.preventDefault();
  searchImageList= [];
  searchNameList= [];
  searchIdList= [];
  s= new searchSC(searchWord.value);
})
n.addEventListener("click", function(event){
  event.preventDefault();
  s.nextsong();
})
l.addEventListener("click", function(event){
  event.preventDefault();
  s.prevsong();
})
m.addEventListener("click", function(event){
  var q= s.getId();
  jukebox.addSong(q);
})
