const background = document.getElementById('bg-img'),
      image = document.getElementById('cover'),
      title = document.getElementById('title'),
      artist = document.getElementById('artist'),
      playerBar = document.getElementById('player-bar'),
      progress = document.getElementById('progress'),
      startTimeEl = document.getElementById('start-time'),
      durationEl = document.getElementById('duration'),
      prevBtn = document.getElementById('prev'),
      playBtn = document.getElementById('play'),
      nextBtn = document.getElementById('next');

      const music = new Audio();

const songs = [
    {
        path: 'assets/audio/1_the_charmers_call.mp3',
        displayName: 'The Charmer\'s Call',
        cover: 'assets/img/1_the_charmers_call.jpg',
        artist: 'Hanu Dixit',
    },
    {
        path: 'assets/audio/2_you_will_never_see_me.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'assets/img/2_you_will_never_see_me.jpg',
        artist: 'NEFFEX',
    },
    {
        path: 'assets/audio/3_intellect.mp3',
        displayName: 'Intellect',
        cover: 'assets/img/3_intellect.jpg',
        artist: 'Yung Logos',
    }
];

let musicIndex = 0;
let isPlaying = false;

const togglePlay = () => {
 if (isPlaying) {
     pauseMusic();
 } else {
     playMusic();
 }
}

const playMusic = () => {
 isPlaying = true;
 playBtn.classList.replace('play', 'pause');
 playBtn.setAttribute('title', 'Pause');
 music.play();
}

const pauseMusic = () => {
 isPlaying = false;
 playBtn.classList.replace('pause', 'play');
 playBtn.setAttribute('title', 'Play');
 music.pause();
}

const loadMusic = (song) => {
 music.src = song.path;
 title.textContent = song.displayName;
 artist.textContent = song.artist;
 image.src = song.cover;
 background.src = song.cover;
}

const changeMusic = (direction) => {
 musicIndex = (musicIndex + direction + songs.length) % songs.length;
 loadMusic(songs[musicIndex]);
 playMusic();
}

const updateProgressBar = () => {
 const { duration, currentTime } = music;
 const progressPercent = (currentTime / duration) * 100;
 progress.style.width = `${progressPercent}%`;

 const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
 durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
 startTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

const setProgressBar = (e) => {
 const width = playerBar.clientWidth;
 const clickX = e.offsetX;
 music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerBar.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);