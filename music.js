const songs = [
  {
    title: "Rebi",
    artist: "Selam Desta",
    src: "a.mp3"
  },
  {
    title: "Bizu Zemen",
    artist: "Surafel H/Mikael",
    src: "bizu.mp3"
  },
  {
    title: "Getan Mematsene",
    artist: "Tamirat hayile",
    src: "b.mp3"
  },
  {
    title: "Tsegawu Newu",
    artist: "Bereket Tesfaye",
    src: "d.mp3"
  },
  {
    title: "Habte Semay",
    artist: "Hana Tekle",
    src: "habte.mp3"
  }
];
let currentSongIndex = 0;
        let isPlaying = false;
        let isMuted = false;
        let lastVolume = 0.7;


let currentIndex = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  highlightPlaylist();
}

function playSong() {
  audio.play();
  document.querySelector(".controls button:nth-child(2)").textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  document.querySelector(".controls button:nth-child(2)").textContent = "▶️";
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  playSong();
}

function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  playSong();
}
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", () => {
  nextSong(); // autoplay next
});

function renderPlaylist() {
  playlist.innerHTML = '';
  songs.forEach((song, idx) => {
    const item = document.createElement("div");
    item.textContent = `${song.title} - ${song.artist}`;
    item.onclick = () => {
      currentIndex = idx;
      loadSong(currentIndex);
      playSong();
    };
    playlist.appendChild(item);
  });
}

function highlightPlaylist() {
  const items = playlist.children;
  Array.from(items).forEach((el, idx) => {
    el.classList.toggle("active", idx === currentIndex);
  });
}

renderPlaylist();
loadSong(currentIndex);
updateProgress();
volume.value = 0.5;
audio.volume = 0.5;