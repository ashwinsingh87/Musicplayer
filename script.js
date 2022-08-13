console.log("Welcome to Spotify");

// Initiating the variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songMasterName = document.getElementById('songMasterName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Someone You Love", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
    {songName:"Once Upon A Time", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
    {songName:"Legend", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
    {songName:"Exceptional", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
    {songName:"All Of Me ", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
    {songName:"All Too Well", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
    {songName:"Girls Like You", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
    {songName:"Memories", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
}) 

// listen to events
audioElement.addEventListener('timeupdate',()=>{   
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// Function to make all the songs listed pause with play sign.
const makeAllPlays = ()=>{
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        songMasterName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0 ;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>6){
        songIndex = 0
    }else{
        songIndex+=1;
    } 
    audioElement.src = `songs/${songIndex+1}.mp3`;
    songMasterName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0 ;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }else{
        songIndex-=1;
    } 
    audioElement.src = `songs/${songIndex+1}.mp3`;
    songMasterName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0 ;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
})