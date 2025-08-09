// 20250809_script.js
// Klucz localStorage
const RECORD_KEY = 'ufo_record';

const playfield = document.getElementById('playfield');
const ufo = document.getElementById('ufo');
const startBtn = document.getElementById('startBtn');
const uiOverlay = document.getElementById('ui-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const finalScoreEl = document.getElementById('finalScore');
const bestScoreEl = document.getElementById('bestScore');
const newGameBtn = document.getElementById('newGameBtn');
const scoreValueEl = document.getElementById('scoreValue');

let score = 0;
let bombsDropped = 0;
let running = false;
let spawnTimer = null;
let animationId = null;
let spawnInterval = 1200; // ms
let fallSpeedBase = 0.12; // pixels per ms multiplier
let difficultyLevel = 0; // increases every 10 punktów
let bombs = [];

// rozmiary i limity
function pfBounds() { return playfield.getBoundingClientRect(); }
function ufoBounds() { return ufo.getBoundingClientRect(); }

// pomoc: losuj int
function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

// --- sterowanie UFO (pointer events obsługują mysz/touch)
let dragging = false;
let pointerOffsetX = 0;

ufo.addEventListener('pointerdown', (e)=>{
  e.preventDefault();
  dragging = true;
  ufo.setPointerCapture(e.pointerId);
  const rect = ufo.getBoundingClientRect();
  pointerOffsetX = e.clientX - rect.left;
});

window.addEventListener('pointermove', (e)=>{
  if(!dragging) return;
  moveUfoTo(e.clientX - pointerOffsetX);
});

window.addEventListener('pointerup', (e)=>{
  if(dragging){
    dragging = false;
    try { ufo.releasePointerCapture(e.pointerId); } catch(e){}
  }
});

// Tap/click on playfield to move center of UFO
playfield.addEventListener('click', (e)=>{
  if(!running) return;
  moveUfoTo(e.clientX - ufo.offsetWidth/2);
});

function moveUfoTo(x){
  const pf = pfBounds();
  const minX = pf.left;
  const maxX = pf.right - ufo.offsetWidth;
  let target = x;
  if(target < minX) target = minX;
  if(target > maxX) target = maxX;
  const left = target - pf.left;
  ufo.style.left = `${left}px`;
  ufo.style.transform = `translateX(0)`;
}

// --- bomby
function createBomb(){
  const b = document.createElement('div');
  b.className = 'bomb';
  b.textContent = '💣';
  const pf = pfBounds();
  const minLeft = 6;
  const maxLeft = pf.width - 44 - 6;
  const x = randInt(minLeft, Math.max(minLeft, maxLeft));
  b.style.left = x + 'px';
  b.dataset.y = -80; 
  b.dataset.speed = (fallSpeedBase + difficultyLevel*0.03) + (Math.random()*0.05);
  playfield.appendChild(b);
  bombs.push(b);
}

function removeBomb(b){
  const idx = bombs.indexOf(b);
  if(idx !== -1) bombs.splice(idx,1);
  if(b && b.parentElement) b.parentElement.removeChild(b);
}

// --- funkcja decydująca ile bomb spada naraz
function spawnBombWave(){
  if(score >= 200){
    for(let i=0;i<3;i++) createBomb();
  } else if(score >= 100){
    for(let i=0;i<2;i++) createBomb();
  } else {
    createBomb();
  }
}

// aktualizuj animację
let lastTime = null;
function tick(ts){
  if(!running) return;
  if(!lastTime) lastTime = ts;
  const dt = ts - lastTime;
  lastTime = ts;

  const pf = pfBounds();
  for(let i = bombs.length-1;i>=0;i--){
    const b = bombs[i];
    const speed = parseFloat(b.dataset.speed) || 0.12;
    let y = parseFloat(b.dataset.y) || -80;
    y += speed * dt * 2;
    b.dataset.y = y;
    b.style.transform = `translateY(${y}px)`;

    if(y > pf.height){
      removeBomb(b);
      score += 1;
      bombsDropped += 1;
      scoreValueEl.textContent = score;

      // Reset i zmiana trudności przy 100 i 200 punktach
      if(score === 100){
        difficultyLevel = 0;
        spawnInterval = 1000;
        fallSpeedBase = 0.10;
        bombsDropped = 0;
        restartSpawning();
      } else if(score === 200){
        difficultyLevel = 0;
        spawnInterval = 900;
        fallSpeedBase = 0.09;
        bombsDropped = 0;
        restartSpawning();
      } else if(bombsDropped % 10 === 0){
        increaseDifficulty();
      }
      continue;
    }

    const bRect = b.getBoundingClientRect();
    const uRect = ufoBounds();
    if(rectsIntersect(bRect, uRect)){
      endGame();
      return;
    }
  }

  animationId = requestAnimationFrame(tick);
}

// kolizja AABB
function rectsIntersect(a,b){
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

// zwiększ trudność
function increaseDifficulty(){
  difficultyLevel += 1;
  spawnInterval = Math.max(300, spawnInterval - 120);
  bombs.forEach(b => {
    const cur = parseFloat(b.dataset.speed) || 0.12;
    b.dataset.speed = (cur + 0.03).toString();
  });
}

// startSpawning i restartSpawning z nową falą bomb
function startSpawning(){
  if(spawnTimer) clearInterval(spawnTimer);
  spawnTimer = setInterval(()=>{
    spawnBombWave();
    if(Math.random() < 0.12 + difficultyLevel*0.03) createBomb();
  }, spawnInterval);
}

function restartSpawning(){
  if(spawnTimer) clearInterval(spawnTimer);
  spawnTimer = setInterval(()=>{
    spawnBombWave();
    if(Math.random() < 0.12 + difficultyLevel*0.03) createBomb();
  }, spawnInterval);
}

// start gry
function startGame(){
  score = 0; bombsDropped = 0; difficultyLevel = 0;
  spawnInterval = 1200; fallSpeedBase = 0.12;
  scoreValueEl.textContent = score;
  bombs.slice().forEach(removeBomb);
  uiOverlay.classList.add('hidden');
  gameoverOverlay.classList.add('hidden');
  running = true;
  lastTime = null;
  const pf = pfBounds();
  ufo.style.left = `${(pf.width - ufo.offsetWidth)/2}px`;

  spawnBombWave();
  startSpawning();
  animationId = requestAnimationFrame(tick);
}

// zakończenie gry
function endGame(){
  running = false;
  if(spawnTimer) clearInterval(spawnTimer);
  if(animationId) cancelAnimationFrame(animationId);
  finalScoreEl.textContent = score;
  const prev = parseInt(localStorage.getItem(RECORD_KEY) || '0', 10);
  if(score > prev){
    localStorage.setItem(RECORD_KEY, score);
  }
  bestScoreEl.textContent = Math.max(score, prev);
  gameoverOverlay.classList.remove('hidden');
}

// inicjalizacja
function init(){
  const rec = parseInt(localStorage.getItem(RECORD_KEY) || '0', 10);
  bestScoreEl.textContent = rec;

  startBtn.addEventListener('click', ()=>{
    startGame();
    setTimeout(restartSpawning, 500);
  });

  newGameBtn.addEventListener('click', ()=>{
    startGame();
    setTimeout(restartSpawning, 500);
  });

  window.addEventListener('resize', ()=>{
    const pf = pfBounds();
    const uRect = ufo.getBoundingClientRect();
    let left = parseFloat(ufo.style.left || '0');
    if(left + uRect.width > pf.width) left = Math.max(0, pf.width - uRect.width);
    ufo.style.left = left + 'px';
  });

  playfield.addEventListener('pointerdown', (e)=>{
    if(!running) return;
    if(e.target === playfield) moveUfoTo(e.clientX - ufo.offsetWidth/2);
  });

  (function idleLoop(){
    if(!running){
      const t = Date.now()/800;
      const amp = 6;
      ufo.style.bottom = `${18 + Math.sin(t)*amp}px`;
    } else {
      ufo.style.bottom = '';
    }
    requestAnimationFrame(idleLoop);
  })();
}

init();