const musicContainer = document.querySelector(".music-container");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progressContainer = document.querySelector(".progress-container");
const progress = document.querySelector(".progress");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Song Title
const songs = ["hey", "summer", "ukulele"];

// Keep track of the songs
let songIndex = 2;

// Initially load song

function loadSong(song) {
  title.textContent = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpeg`;
}

loadSong(songs[songIndex]);

playBtn.addEventListener("click", onPlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", skipTo);
audio.addEventListener("ended", nextSong);

function onPlay() {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function playSong() {
  musicContainer.classList.add("play");
  audio.play();
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
}

function pauseSong() {
  musicContainer.classList.remove("play");
  audio.pause();
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
}

function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
}

function skipTo(e) {
  const { clientX } = e;
  const rect = progressContainer.getBoundingClientRect();

  const skipTo = Math.abs(rect.left - clientX) / (rect.right - rect.left);

  audio.currentTime = audio.duration * skipTo;
}
