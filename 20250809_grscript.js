/* 20250809_grscript.js
   Naprawiona pozycja gracza: kot już nie startuje z prawego boku i nie wychodzi poza ekran.
   Pozostała logika: 3 tory, spadające obiekty, sklep, animacja biegu itd.
*/

/* --- KONFIG --- */
const CHARACTERS = [
  {id:'cat',emoji:['🐱','😺','😸'],price:0},
  {id:'monkey',emoji:['🐵','🙉','🙊'],price:50},
  {id:'lion',emoji:['🦁','🦁','🦁'],price:120},
  {id:'tiger',emoji:['🐯','🐯','🐯'],price:200},
  {id:'dog',emoji:['🐶','🐶','🐶'],price:80},
  {id:'bear',emoji:['🐻','🐻‍❄️','🐨'],price:180},
  {id:'panda',emoji:['🐼','🐼','🐼'],price:160},
  {id:'fox',emoji:['🦊','🦊','🦊'],price:90},
  {id:'rabbit',emoji:['🐰','🐰','🐰'],price:40}
];

const MAPS = [
  {id:'city',name:'Miasto',emoji:'🏙️',price:0,cls:'map-0'},
  {id:'night',name:'Noc',emoji:'🌃',price:100,cls:'map-1'},
  {id:'sunset',name:'Zachód',emoji:'🌇',price:80,cls:'map-2'},
  {id:'bridge',name:'Most',emoji:'🌉',price:140,cls:'map-3'}
];

const OBSTACLES = [
  {emoji:'🚘',jumpable:true},
  {emoji:'🚧',jumpable:true},
  {emoji:'🚊',jumpable:false}
];

const LANES = 3;
const LANE_PERCENT = [12, 50, 88]; // centers in percent
const GRAVITY = 0.8;
const JUMP_FORCE = 14;
const FALLING_BASE_SPEED = 2.5;
const POINTS_PER_HIT_BOTTOM = 5;

/* --- STORAGE --- */
let coins = Number(localStorage.getItem('gr_coins')||0);
let best = Number(localStorage.getItem('gr_best')||0);
let unlocked = JSON.parse(localStorage.getItem('gr_unlocked')||'{}');
let selectedChar = localStorage.getItem('gr_char')||'cat';
let selectedMap = localStorage.getItem('gr_map')||'city';
CHARACTERS.forEach(c=>{ if(c.price===0) unlocked[c.id]=true });
MAPS.forEach(m=>{ if(m.price===0) unlocked[m.id]=true });

/* --- DOM --- */
const stage = document.getElementById('stage');
const objectsWrap = document.getElementById('objects');
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
const restartBtn = document.getElementById('restartBtn');

/* --- STATE --- */
let running = false;
let score = 0;
let fallingSpeed = FALLING_BASE_SPEED;
let objs = [];
let lastSpawn = 0;
let spawnInterval = 1200;
let lastTime = 0;
let animId = null;

/* player */
let lane = 1;
let targetLane = 1;
let playerY = 0;
let velY = 0;
let isJumping = false;

/* run animation */
let runFrameIndex = 0;
let runFrameTimer = 0;

/* stage rect */
let stageRect = stage.getBoundingClientRect();
function updateStageRect(){ stageRect = stage.getBoundingClientRect(); }

/* ========== UI INIT ========== */
function initUI(){
  coinsEl.textContent = coins;
  shopCoinsEl.textContent = coins;
  bestEl.textContent = best;
  applySelected();
  renderShop();
  positionPlayerInstant();
}
function applySelected(){
  const ch = CHARACTERS.find(c=>c.id===selectedChar);
  const mp = MAPS.find(m=>m.id===selectedMap);
  if(ch) playerEl.textContent = ch.emoji[0];
  if(mp) backgroundEl.className = mp.cls;
}

/* ========== SHOP ========== */
function renderShop(){
  charsWrap.innerHTML = ''; mapsWrap.innerHTML = '';
  CHARACTERS.forEach(c=>{
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<div style="font-size:28px">${c.emoji[0]}</div><strong>${c.id}</strong><div>${c.price} 🪙</div>`;
    const btn = document.createElement('button');
    if((unlocked[c.id]||c.price===0)){
      btn.textContent = (selectedChar===c.id)?'Wybrano':'Wybierz';
      btn.onclick = ()=>{ selectedChar=c.id; localStorage.setItem('gr_char',selectedChar); applySelected(); renderShop(); };
    } else {
      btn.textContent = 'Kup';
      btn.onclick = ()=>{ buyItem(c); };
    }
    div.appendChild(btn);
    charsWrap.appendChild(div);
  });
  MAPS.forEach(m=>{
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<div style="font-size:26px">${m.emoji}</div><strong>${m.name}</strong><div>${m.price} 🪙</div>`;
    const btn = document.createElement('button');
    if((unlocked[m.id]||m.price===0)){
      btn.textContent = (selectedMap===m.id)?'Wybrano':'Wybierz';
      btn.onclick = ()=>{ selectedMap=m.id; localStorage.setItem('gr_map',selectedMap); applySelected(); renderShop(); };
    } else {
      btn.textContent = 'Kup';
      btn.onclick = ()=>{ buyItem(m); };
    }
    div.appendChild(btn);
    mapsWrap.appendChild(div);
  });
}
function buyItem(item){
  if(coins >= item.price){
    coins -= item.price;
    localStorage.setItem('gr_coins', coins);
    unlocked[item.id] = true;
    localStorage.setItem('gr_unlocked', JSON.stringify(unlocked));
    shopCoinsEl.textContent = coins; coinsEl.textContent = coins;
    renderShop(); applySelected();
  } else alert('Masz za mało monet!');
}

/* ========== SPAWN ========== */
function spawnPair(){
  const a = Math.floor(Math.random()*LANES);
  let b = Math.floor(Math.random()*LANES);
  while(b===a) b = Math.floor(Math.random()*LANES);
  [a,b].forEach(l=>{
    const isCoin = Math.random() < 0.35;
    if(isCoin) spawnObject('coin', l);
    else {
      const meta = OBSTACLES[Math.floor(Math.random()*OBSTACLES.length)];
      spawnObject('obs', l, meta);
    }
  });
}
let objIdCounter = 0;
function spawnObject(type, laneIndex, meta = null){
  const el = document.createElement('div');
  el.className = 'object ' + (type==='coin' ? 'coin' : 'obstacle');
  const midXpercent = LANE_PERCENT[laneIndex];
  el.style.left = `calc(${midXpercent}% - 32px)`;
  el.style.top = `-80px`;
  if(type==='coin') el.textContent = '🪙'; else el.textContent = meta.emoji;
  const id = ++objIdCounter;
  objectsWrap.appendChild(el);
  objs.push({ id, type, lane: laneIndex, y: -80, el, meta: meta || {} });
}

/* ========== COLLISIONS & BOTTOM ========== */
function checkCollisionsAndBottom(dt){
  const pRect = playerEl.getBoundingClientRect();
  for(let i = objs.length - 1; i >= 0; i--){
    const o = objs[i];
    o.el.style.top = (o.y) + 'px';
    const oRect = o.el.getBoundingClientRect();
    const sameLane = (o.lane === lane);
    const verticallyOverlap = !(oRect.bottom < pRect.top || oRect.top > pRect.bottom);

    if(sameLane && verticallyOverlap){
      if(o.type === 'coin'){
        coins += 1;
        localStorage.setItem('gr_coins', coins);
        coinsEl.textContent = coins; shopCoinsEl.textContent = coins;
        o.el.remove(); objs.splice(i,1);
        continue;
      } else {
        const jumpable = !!o.meta.jumpable;
        const playerAboveThreshold = playerY > 40;
        if(jumpable && playerAboveThreshold){
          // safe - jumped over
        } else {
          endGame();
          return;
        }
      }
    }

    if(o.y > stageRect.height - 40){
      score += POINTS_PER_HIT_BOTTOM;
      o.el.remove();
      objs.splice(i,1);
      continue;
    }
  }
}

/* ========== PLAYER UPDATE (NAPRAWA POZYCJI) ========== */
function updatePlayerPosition(dt){
  // Oblicz lewy px względem szerokości sceny i ustaw left (absolutnie).
  const targetPercent = LANE_PERCENT[targetLane];
  const rawPx = Math.round(stageRect.width * (targetPercent/100) - (playerEl.offsetWidth/2));
  // clamp: nie wychodzimy poza scenę
  const minPx = 0;
  const maxPx = Math.max(0, stageRect.width - playerEl.offsetWidth);
  const px = Math.min(Math.max(rawPx, minPx), maxPx);
  playerEl.style.left = px + 'px';

  // vertical physics (skok)
  if(isJumping){
    velY -= GRAVITY;
    playerY += velY;
    if(playerY <= 0){
      playerY = 0; velY = 0; isJumping = false; playerEl.classList.add('ground');
    } else {
      playerEl.classList.remove('ground');
    }
  }
  // bobbing when on ground
  const bob = isJumping ? 0 : Math.sin(Date.now()/120) * 2;
  playerEl.style.transform = `translateY(${ -playerY + bob }px)`;

  // run frame animation
  runFrameTimer += 1;
  if(runFrameTimer > 8){
    runFrameIndex = (runFrameIndex + 1) % getSelectedCharFrames().length;
    playerEl.textContent = getSelectedCharFrames()[runFrameIndex];
    runFrameTimer = 0;
  }
}

function positionPlayerInstant(){
  updateStageRect();
  const targetPercent = LANE_PERCENT[lane];
  const pxRaw = Math.round(stageRect.width * (targetPercent/100) - (playerEl.offsetWidth/2));
  const px = Math.min(Math.max(pxRaw, 0), Math.max(0, stageRect.width - playerEl.offsetWidth));
  playerEl.style.left = px + 'px';
  playerEl.style.transform = `translateY(0px)`;
}

/* ========== GAME LOOP ========== */
function gameLoop(ts){
  if(!lastTime) lastTime = ts;
  const dt = ts - lastTime;
  lastTime = ts;

  lastSpawn += dt;
  spawnInterval = Math.max(450, 1200 - Math.floor(score/3));
  if(lastSpawn > spawnInterval){
    spawnPair(); lastSpawn = 0;
  }

  fallingSpeed = FALLING_BASE_SPEED + (score * 0.02);
  const pxStep = fallingSpeed * (dt / 16.66);
  objs.forEach(o => { o.y += pxStep; o.el.style.top = o.y + 'px'; });

  checkCollisionsAndBottom(dt);
  updatePlayerPosition(dt);

  if(running) animId = requestAnimationFrame(gameLoop);
  else cancelAnimationFrame(animId);
}

/* ========== START / END ========== */
function startGame(){
  if(running) return;
  running = true;
  score = 0; lastSpawn = 0;
  objs.forEach(o=>o.el.remove()); objs = [];
  isJumping = false; velY = 0; playerY = 0;
  lane = 1; targetLane = 1;
  updateStageRect(); positionPlayerInstant();
  lastTime = 0;
  playerEl.classList.add('ground');
  gameOverEl.classList.add('hidden');
  animId = requestAnimationFrame(gameLoop);
}

function endGame(){
  running = false;
  if(score > best){ best = score; localStorage.setItem('gr_best', best); bestEl.textContent = best; }
  scoreFinalEl.textContent = score; gameOverEl.classList.remove('hidden');
}

/* ========== CONTROLS ========== */
let touchStartX = 0, touchStartY = 0, touchStartTime = 0;
const SWIPE_THRESHOLD = 30;
const SWIPE_TIME = 600;

stage.addEventListener('touchstart', (e)=>{
  if(e.touches && e.touches[0]){
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }
}, {passive:true});

stage.addEventListener('touchend', (e)=>{
  const dx = (e.changedTouches[0].clientX - touchStartX);
  const dy = (e.changedTouches[0].clientY - touchStartY);
  const dt = Date.now() - touchStartTime;

  if(Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD && dt < SWIPE_TIME){
    if(dx > 0) swipeRight();
    else swipeLeft();
  } else if(Math.abs(dy) > Math.abs(dx) && dy < -SWIPE_THRESHOLD && dt < SWIPE_TIME){
    doJump();
  } else {
    if(running) doJump();
  }
}, {passive:true});

function swipeLeft(){ if(targetLane > 0) targetLane--; lane = targetLane; }
function swipeRight(){ if(targetLane < LANES-1) targetLane++; lane = targetLane; }

function doJump(){
  if(!running) return;
  if(!isJumping){
    isJumping = true;
    velY = JUMP_FORCE;
    playerEl.classList.remove('ground');
  }
}

/* buttons */
startBtn.addEventListener('click', startGame);
jumpBtn.addEventListener('click', ()=> doJump());
shopBtn.addEventListener('click', ()=>{ shopEl.classList.remove('hidden'); shopCoinsEl.textContent = coins; });
closeShop.addEventListener('click', ()=>{ shopEl.classList.add('hidden'); });
restartBtn.addEventListener('click', ()=>{ gameOverEl.classList.add('hidden'); startGame(); });

window.addEventListener('resize', ()=>{ updateStageRect(); positionPlayerInstant(); });

window.addEventListener('beforeunload', ()=>{
  localStorage.setItem('gr_coins', coins);
  localStorage.setItem('gr_unlocked', JSON.stringify(unlocked));
  localStorage.setItem('gr_char', selectedChar);
  localStorage.setItem('gr_map', selectedMap);
  localStorage.setItem('gr_best', best);
});

function getSelectedCharFrames(){ const ch = CHARACTERS.find(c=>c.id===selectedChar); return ch ? ch.emoji : ['🐱','😺','😸']; }

/* init */
updateStageRect();
initUI();