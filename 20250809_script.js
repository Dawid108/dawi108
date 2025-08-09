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
  // ignore clicks on UI overlays
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
  // set relative to playfield
  const left = target - pf.left;
  ufo.style.left = `${left}px`;
  ufo.style.transform = `translateX(0)`;
}

// --- bomby
function createBomb(){
  const b = document.createElement('div');
  b.className = 'bomb';
  b.textContent = '💣';
  // losuj x w zakresie playfield
  const pf = pfBounds();
  const minLeft = 6;
  const maxLeft = pf.width - 44 - 6;
  const x = randInt(minLeft, Math.max(minLeft, maxLeft));
  b.style.left = x + 'px';
  b.dataset.y = -80; // startowa pozycja
  b.dataset.speed = (fallSpeedBase + difficultyLevel*0.03) + (Math.random()*0.05); // px per ms
  playfield.appendChild(b);
  bombs.push(b);
}

// usuń bombę z DOM i z listy
function removeBomb(b){
  const idx = bombs.indexOf(b);
  if(idx !== -1) bombs.splice(idx,1);
  if(b && b.parentElement) b.parentElement.removeChild(b);
}

// aktualizuj animację
let lastTime = null;
function tick(ts){
  if(!running) return;
  if(!lastTime) lastTime = ts;
  const dt = ts - lastTime; // ms
  lastTime = ts;

  const pf = pfBounds();
  // przesuwaj bomby
  for(let i = bombs.length-1;i>=0;i--){
    const b = bombs[i];
    const speed = parseFloat(b.dataset.speed) || 0.12;
    let y = parseFloat(b.dataset.y) || -80;
    y += speed * dt * 2; // mnożnik by gra była dynamiczna
    b.dataset.y = y;
    b.style.transform = `translateY(${y}px)`;

    // jeśli dotknęła dolnej krawędzi -> +1 punkt i usuń
    if(y > pf.height){
      removeBomb(b);
      score += 1;
      bombsDropped += 1;
      scoreValueEl.textContent = score;
      // co 10 opadniętych bomb zwiększamy trudność
      if(bombsDropped % 10 === 0){
        increaseDifficulty();
      }
      continue;
    }

    // kolizja z UFO?
    const bRect = b.getBoundingClientRect();
    const uRect = ufoBounds();
    if(rectsIntersect(bRect, uRect)){
      endGame();
      return;
    }
  }

  animationId = requestAnimationFrame(tick);
}

// prosta kolizja AABB
function rectsIntersect(a,b){
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

// zwiększ trudność
function increaseDifficulty(){
  difficultyLevel += 1;
  // skróć interwał spawnu (do pewnego minimum)
  spawnInterval = Math.max(300, spawnInterval - 120);
  // lekko zwiększ prędkość już istniejących bomb
  bombs.forEach(b => {
    const cur = parseFloat(b.dataset.speed) || 0.12;
    b.dataset.speed = (cur + 0.03).toString();
  });
}

// rozpocznij i zatrzymaj spawner
function startSpawning(){
  if(spawnTimer) clearInterval(spawnTimer);
  spawnTimer = setInterval(()=>{
    // w czasie wysokiej trudności może tworzyć kilka bomb naraz
    createBomb();
    // drobne losowe dodatkowe bomby
    if(Math.random() < 0.12 + difficultyLevel*0.03) createBomb();
  }, spawnInterval);
}

function restartSpawning(){
  if(spawnTimer) clearInterval(spawnTimer);
  spawnTimer = setInterval(()=>{
    createBomb();
    if(Math.random() < 0.12 + difficultyLevel*0.03) createBomb();
  }, spawnInterval);
}

// start gry
function startGame(){
  // reset
  score = 0; bombsDropped = 0; difficultyLevel = 0;
  spawnInterval = 1200; fallSpeedBase = 0.12;
  scoreValueEl.textContent = score;
  // usuń istniejące bomby
  bombs.slice().forEach(removeBomb);
  uiOverlay.classList.add('hidden');
  gameoverOverlay.classList.add('hidden');
  running = true;
  lastTime = null;
  // ustaw UFO na środek
  const pf = pfBounds();
  ufo.style.left = `${(pf.width - ufo.offsetWidth)/2}px`;

  // start spawner i animacji
  createBomb();
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

// inicjalizacja przy ładowaniu
function init(){
  // ustaw rekord
  const rec = parseInt(localStorage.getItem(RECORD_KEY) || '0', 10);
  bestScoreEl.textContent = rec;

  // Start buttony
  startBtn.addEventListener('click', ()=>{
    startGame();
    // po krótkim czasie restart spawnera by dopasować do zmiennego spawnInterval
    setTimeout(restartSpawning, 500);
  });

  newGameBtn.addEventListener('click', ()=>{
    startGame();
    setTimeout(restartSpawning, 500);
  });

  // Jeśli gra jest przerwana (np. zmiana rozmiaru), dostosuj pozycję UFO
  window.addEventListener('resize', ()=>{
    // utrzymaj UFO wewnątrz pola
    const pf = pfBounds();
    const uRect = ufo.getBoundingClientRect();
    let left = parseFloat(ufo.style.left || '0');
    if(left + uRect.width > pf.width) left = Math.max(0, pf.width - uRect.width);
    ufo.style.left = left + 'px';
  });

  // Zapewnij, że pole kliknięcia nie przeszkadza wciśnięciom na overlayy
  playfield.addEventListener('pointerdown', (e)=>{
    // jeśli nie ruszamy UFO bezpośrednio, pozwól na przesunięcie go natychmiast
    if(!running) return;
    // gdy klikamy po stronie, przesuwamy UFO do tej pozycji
    if(e.target === playfield) moveUfoTo(e.clientX - ufo.offsetWidth/2);
  });

  // drobne pływające animacje ufo gdy gra nie trwa
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