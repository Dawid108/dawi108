/* 20250809_grscript.js
   Gold Run 2.0 - gra mobilna z 3 torami, animacją biegu, gestami, sklepem i płynną animacją.
*/

// --- KONFIGURACJA ---

const CHARACTERS = [
  { id: 'cat', emoji: ['🐱', '😺', '😸'], price: 0 },
  { id: 'monkey', emoji: ['🐵', '🙈', '🙉'], price: 50 },
  { id: 'lion', emoji: ['🦁', '🐯', '🐅'], price: 120 },
  { id: 'dog', emoji: ['🐶', '🐕', '🐕‍🦺'], price: 80 },
  { id: 'bear', emoji: ['🐻', '🐻‍❄️', '🐨'], price: 180 },
  { id: 'panda', emoji: ['🐼', '🐼', '🐼'], price: 160 },
  { id: 'fox', emoji: ['🦊', '🦊', '🦊'], price: 90 },
  { id: 'rabbit', emoji: ['🐰', '🐇', '🐇'], price: 40 }
];

const MAPS = [
  { id: 'city', name: 'Miasto', emoji: '🏙️', price: 0, cls: 'map-0' },
  { id: 'night', name: 'Noc', emoji: '🌃', price: 100, cls: 'map-1' },
  { id: 'sunset', name: 'Zachód', emoji: '🌇', price: 80, cls: 'map-2' },
  { id: 'bridge', name: 'Most', emoji: '🌉', price: 140, cls: 'map-3' }
];

const OBSTACLES = ['🚘', '🚊', '🚧'];
const JUMPABLE = ['🚘', '🚧']; // można przeskakiwać nad nimi

const TRACK_COUNT = 3;
const TRACK_X_POS = [
  '16.66%', // lewy tor (1)
  '50%',    // środkowy tor (2)
  '83.33%'  // prawy tor (3)
];

const PLAYER_BOTTOM = 10; // % od dołu dla pozycji na ziemi

// --- STAN GRY ---

let coins = Number(localStorage.getItem('gr_coins') || 0);
let best = Number(localStorage.getItem('gr_best') || 0);
let unlocked = JSON.parse(localStorage.getItem('gr_unlocked') || '{}');
let selectedChar = localStorage.getItem('gr_char') || 'cat';
let selectedMap = localStorage.getItem('gr_map') || 'city';

let running = false;
let score = 0;
let speed = 2; // prędkość spadania
let spawnTimer = 0;
let spawnInterval = 90; // klatek
let objects = [];

let playerTrack = 1; // tor: 0-lewy,1-środkowy,2-prawy; start środkowy = 1
let playerY = PLAYER_BOTTOM; // procent od dołu
let isJumping = false;
let jumpVelocity = 0;
const GRAVITY = 0.7;

let frameCount = 0;
let playerAnimFrame = 0;

// --- ELEMENTY DOM ---

const playerEl = document.getElementById('player');
const startBtn = document.getElementById('startBtn');
const jumpBtn = document.getElementById('jumpBtn');
const shopBtn = document.getElementById('shopBtn');
const shopEl = document.getElementById('shop');
const closeShop = document.getElementById('closeShop');
const charsWrap = document.getElementById('chars');
const mapsWrap = document.getElementById('maps');
const coinsEl = document.querySelector('#coins span');
const shopCoinsEl = document.getElementById('shopCoins');
const backgroundEl = document.getElementById('background');
const gameOverEl = document.getElementById('gameOver');
const scoreFinalEl = document.getElementById('scoreFinal');
const bestEl = document.querySelector('#best span');

// --- INICJALIZACJA UI ---

function initUI() {
  coinsEl.textContent = coins;
  shopCoinsEl.textContent = coins;
  bestEl.textContent = best;
  renderShop();
  applySelected();
  setPlayerPosition();
}

function applySelected() {
  const ch = CHARACTERS.find(c => c.id === selectedChar);
  const mp = MAPS.find(m => m.id === selectedMap);
  if (ch) {
    playerEl.textContent = ch.emoji[playerAnimFrame];
  }
  if (mp) {
    backgroundEl.className = mp.cls;
  }
}

function setPlayerPosition() {
  playerEl.style.left = TRACK_X_POS[playerTrack];
  playerEl.style.bottom = playerY + '%';
}

// --- SKLEP ---

function renderShop() {
  charsWrap.innerHTML = '';
  mapsWrap.innerHTML = '';

  CHARACTERS.forEach(c => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<div style="font-size:32px">${c.emoji[0]}</div><strong>${c.id}</strong><div>${c.price} 🪙</div>`;
    const btn = document.createElement('button');
    if ((unlocked[c.id] || c.price === 0)) {
      btn.textContent = (selectedChar === c.id) ? 'Wybrano' : 'Wybierz';
      btn.onclick = () => {
        selectedChar = c.id;
        localStorage.setItem('gr_char', selectedChar);
        playerAnimFrame = 0;
        applySelected();
        renderShop();
      };
    } else {
      btn.textContent = 'Kup';
      btn.onclick = () => { buyItem(c); };
    }
    div.appendChild(btn);
    charsWrap.appendChild(div);
  });

  MAPS.forEach(m => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<div style="font-size:28px">${m.emoji}</div><strong>${m.name}</strong><div>${m.price} 🪙</div>`;
    const btn = document.createElement('button');
    if ((unlocked[m.id] || m.price === 0)) {
      btn.textContent = (selectedMap === m.id) ? 'Wybrano' : 'Wybierz';
      btn.onclick = () => {
        selectedMap = m.id;
        localStorage.setItem('gr_map', selectedMap);
        applySelected();
        renderShop();
      };
    } else {
      btn.textContent = 'Kup';
      btn.onclick = () => { buyItem(m); };
    }
    div.appendChild(btn);
    mapsWrap.appendChild(div);
  });
}

function buyItem(item) {
  if (coins >= item.price) {
    coins -= item.price;
    localStorage.setItem('gr_coins', coins);
    unlocked[item.id] = true;
    localStorage.setItem('gr_unlocked', JSON.stringify(unlocked));
    shopCoinsEl.textContent = coins;
    coinsEl.textContent = coins;
    renderShop();
    applySelected();
  } else {
    alert('Masz za mało monet!');
  }
}

// --- LOGIKA GRY ---

function startGame() {
  if (running) return;
  running = true;
  score = 0;
  speed = 2;
  spawnTimer = 0;
  objects.forEach(o => o.el.remove());
  objects = [];
  playerTrack = 1;
  playerY = PLAYER_BOTTOM;
  isJumping = false;
  jumpVelocity = 0;
  playerAnimFrame = 0;
  gameOverEl.classList.add('hidden');
  setPlayerPosition();
  loop();
}

function endGame() {
  running = false;
  cancelAnimationFrame(animationFrameId);
  gameOverEl.classList.remove('hidden');
  scoreFinalEl.textContent = score;
  if (score > best) {
    best = score;
    localStorage.setItem('gr_best', best);
    bestEl.textContent = best;
  }
}

function restartGame() {
  gameOverEl.classList.add('hidden');
  startGame();
}

// --- FIZYKA SKOKU ---

function jump() {
  if (!running) return;
  if (isJumping) return;
  isJumping = true;
  jumpVelocity = 12;
}

// --- TWORZENIE OBIEKTÓW ---

function createObject(type, track) {
  const el = document.createElement('div');
  el.className = type === 'coin' ? 'coin' : 'obstacle';
  if (type === 'coin') {
    el.textContent = '🪙';
  } else {
    const emoji = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];
    el.textContent = emoji;
    el.dataset.emoji = emoji;
  }
  el.style.left = TRACK_X_POS[track];
  el.style.top = '-50px';
  document.getElementById('stage').appendChild(el);
  return {
    type,
    el,
    track,
    y: -50,
    width: 36,
    height: 36,
    jumpable: type === 'coin' ? false : JUMPABLE.includes(el.dataset.emoji)
  };
}

// --- SPAWN OBIEKTÓW ---

function spawn() {
  spawnTimer++;
  if (spawnTimer > spawnInterval) {
    spawnTimer = 0;
    // Wylosuj 2 różne tory
    let t1 = Math.floor(Math.random() * TRACK_COUNT);
    let t2;
    do {
      t2 = Math.floor(Math.random() * TRACK_COUNT);
    } while (t2 === t1);

    // Pierwszy obiekt (moneta lub przeszkoda)
    const firstType = Math.random() < 0.4 ? 'coin' : 'obstacle';
    const secondType = Math.random() < 0.4 ? 'coin' : 'obstacle';

    objects.push(createObject(firstType, t1));
    objects.push(createObject(secondType, t2));
  }
}

// --- KOLIZJE ---

function checkCollisions() {
  const pRect = playerEl.getBoundingClientRect();
  const stage