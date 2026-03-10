/* ==============================
   MEME DATABASE
============================== */

// CHANGE THIS NUMBER to match your memes
const TOTAL_MEMES = 65;

const memes = [];
for (let i = 1; i <= TOTAL_MEMES; i++) {
    memes.push(`memes/meme${i}.jpg`);
}


/* ==============================
   MEME DECK SYSTEM (NO REPEATS)
============================== */

let memeDeck = [];

// Shuffle array (Fisher-Yates shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create new shuffled deck
function createDeck() {
    memeDeck = [...memes]; // copy memes
    shuffle(memeDeck);
}

// Show next meme
function newMeme() {

    // reshuffle when empty
    if (memeDeck.length === 0) {
        createDeck();
    }

    const nextMeme = memeDeck.pop();
    document.getElementById("memeImage").src = nextMeme;
}


/* ==============================
   SCREEN CONTROL
============================== */

function startGame() {
    document.getElementById("welcomeScreen").classList.add("hidden");
    document.getElementById("gameScreen").classList.remove("hidden");

    createDeck();
    newMeme();
}


/* ==============================
   PLAYER SYSTEM
============================== */

let players = [];

// Add player
function addPlayer() {
    const input = document.getElementById("playerName");
    const name = input.value.trim();

    if (name === "") return;

    players.push({
        name: name,
        score: 0
    });

    input.value = "";
    renderPlayers();
}

// Change player score
function changeScore(index, value) {
    players[index].score += value;
    renderPlayers();
}

// Draw players on screen
function renderPlayers() {

    const container = document.getElementById("playersContainer");
    container.innerHTML = "";

    players.forEach((player, index) => {

        const div = document.createElement("div");
        div.className = "player";

        div.innerHTML = `
            <strong>${player.name}</strong>
            <span> Score: ${player.score} </span>
            <button onclick="changeScore(${index}, 1)">+1</button>
            <button onclick="changeScore(${index}, -1)">-1</button>
        `;

        container.appendChild(div);
    });
}


/* ==============================
   RESET GAME
============================== */

function resetGame() {
    players = [];
    renderPlayers();

    createDeck();
    newMeme();
}


/* ==============================
   PWA SERVICE WORKER
============================== */

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}