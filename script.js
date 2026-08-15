/* =========================
   MUSIC DATA
========================= */

const songs = [

    {
        title: "Song One",
        artist: "Your Artist",
        file: "music/song1.mp3"
    },

    {
        title: "Song Two",
        artist: "Your Artist",
        file: "music/song2.mp3"
    },

    {
        title: "Song Three",
        artist: "Your Artist",
        file: "music/song3.mp3"
    }

];


/* =========================
   AUDIO
========================= */

const audio = new Audio();

audio.volume = 1;

let currentSong = 0;

let isPlaying = false;

let shuffle = false;

let repeat = false;


/* =========================
   ELEMENTS
========================= */

const songTitle =
    document.getElementById("songTitle");

const artistName =
    document.getElementById("artistName");

const playBtn =
    document.getElementById("playBtn");

const previousBtn =
    document.getElementById("previousBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progressBar =
    document.getElementById("progressBar");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const volumeBar =
    document.getElementById("volumeBar");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const repeatBtn =
    document.getElementById("repeatBtn");

const album =
    document.querySelector(".album");


/* =========================
   LOAD SONG
========================= */

function loadSong(index) {

    currentSong = index;

    const song = songs[currentSong];

    audio.src = song.file;

    songTitle.textContent =
        song.title;

    artistName.textContent =
        song.artist;

    progressBar.value = 0;

    currentTime.textContent =
        "0:00";

}


/* =========================
   PLAY
========================= */

function playSong() {

    audio.play();

    isPlaying = true;

    playBtn.textContent =
        "❚❚";

    album.classList.add("playing");

}


/* =========================
   PAUSE
========================= */

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.textContent =
        "▶";

    album.classList.remove("playing");

}


/* =========================
   PLAY BUTTON
========================= */

playBtn.addEventListener(
    "click",
    function () {

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }
);


/* =========================
   NEXT
========================= */

function nextSong() {

    if (shuffle) {

        let random;

        do {

            random =
                Math.floor(
                    Math.random()
                    * songs.length
                );

        } while (
            random === currentSong
            && songs.length > 1
        );

        currentSong = random;

    } else {

        currentSong++;

        if (
            currentSong >=
            songs.length
        ) {

            currentSong = 0;

        }

    }

    loadSong(currentSong);

    playSong();

}


nextBtn.addEventListener(
    "click",
    nextSong
);


/* =========================
   PREVIOUS
========================= */

previousBtn.addEventListener(
    "click",
    function () {

        currentSong--;

        if (currentSong < 0) {

            currentSong =
                songs.length - 1;

        }

        loadSong(currentSong);

        playSong();

    }
);


/* =========================
   SONG ENDED
========================= */

audio.addEventListener(
    "ended",
    function () {

        if (repeat) {

            audio.currentTime = 0;

            playSong();

        } else {

            nextSong();

        }

    }
);


/* =========================
   PROGRESS UPDATE
========================= */

audio.addEventListener(
    "timeupdate",
    function () {

        if (!audio.duration) {
            return;
        }

        const percentage =
            (
                audio.currentTime /
                audio.duration
            ) * 100;

        progressBar.value =
            percentage;

        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);


/* =========================
   SEEK
========================= */

progressBar.addEventListener(
    "input",
    function () {

        if (!audio.duration) {
            return;
        }

        audio.currentTime =
            (
                progressBar.value /
                100
            ) * audio.duration;

    }
);


/* =========================
   VOLUME
========================= */

volumeBar.addEventListener(
    "input",
    function () {

        audio.volume =
            volumeBar.value;

    }
);


/* =========================
   SHUFFLE
========================= */

shuffleBtn.addEventListener(
    "click",
    function () {

        shuffle =
            !shuffle;

        shuffleBtn.style.color =
            shuffle
                ? "#ff72bd"
                : "white";

    }
);


/* =========================
   REPEAT
========================= */

repeatBtn.addEventListener(
    "click",
    function () {

        repeat =
            !repeat;

        repeatBtn.style.color =
            repeat
                ? "#a77bff"
                : "white";

    }
);


/* =========================
   FORMAT TIME
========================= */

function formatTime(seconds) {

    if (
        isNaN(seconds) ||
        seconds < 0
    ) {

        return "0:00";

    }

    const minutes =
        Math.floor(
            seconds / 60
        );

    const remainingSeconds =
        Math.floor(
            seconds % 60
        );

    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(2, "0")
    );

}


/* =========================
   MOOD LANES
========================= */

const lanes =
    document.querySelectorAll(".lane");

lanes.forEach(
    function (lane) {

        lane.addEventListener(
            "click",
            function () {

                lanes.forEach(
                    function (item) {

                        item.classList
                            .remove(
                                "active"
                            );

                    }
                );

                lane.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================
   CLOCK
========================= */

const clock =
    document.getElementById(
        "clock"
    );


function updateClock() {

    clock.textContent =
        new Date().toLocaleTimeString(
            [],
            {
                hour12: false
            }
        );

}


updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================
   INITIAL SONG
========================= */

loadSong(0);
