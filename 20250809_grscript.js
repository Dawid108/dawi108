/* 20250809_grscript.js
   Ulepszona wersja Gold Run:
   - 3 tory (lewy, środkowy, prawy)
   - obiekty spadają z góry (po 2 na raz na różnych torach)
   - sterowanie dotykiem: swipe left/right -> zmiana toru; swipe up / tap -> skok
   - requestAnimationFrame dla płynnej animacji
   - sklep z postaciami i mapami, wszystko w localStorage
   - animacja biegu: cykliczne 3 emoji
   - 5 punktów za każdy obiekt który dotknie dołu
*/

/* ========== KONFIG ========== */
const CHARACTERS = [
  {id:'cat',emoji:['🐱','😺','😸'],price:0},
  {id:'monkey',emoji:['🐵','🙉','🦧'],price:50},
  {id:'lion',emoji:['🦁','😼','😻'],price:120},
  {id:'tiger',emoji:['🐯','😺','😸'],price:200},
  {id:'dog',emoji:['🐶','🐕','🐩'],price:80},
  {id:'bear',emoji:['🐻','🐻‍❄️','🧸'],price:180},
  {id:'panda',emoji:['🐼','🐼','🐼'],price:160},
  {id:'fox',emoji:['🦊','🦊','🦊'],price:90},
  {id:'rabbit',emoji:['🐰','🐇','🐰'],price:40}
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
  {emoji:'🚊',jumpable:false} // trzeba omijać w bok
];

// game tuning
const LANES = 3;
const LANE_PERCENT = [12, 50, 88]; // positions as percentage (center x of lanes)
const GRAVITY = 0.8;
const JUMP_FORCE = 14;
const FALLING_BASE_SPEED = 2.5; // px per frame base, will scale
const SPAWN_BASE = 1200; // ms baseline (we use timer/acc) - conceptual
const POINTS_PER_HIT_BOTTOM = 5;

/* ========== STORAGE ========== */
let coins = Number(localStorage.getItem('gr_coins')||0);
let best = Number(localStorage.getItem('gr_best')||0);
let unlocked = JSON.parse(localStorage.getItem('gr_unlocked')||'{}');
let selectedChar = localStorage.getItem('gr_char')||'cat';
let selectedMap = localStorage.getItem('gr_map')||'city';

/* ensure free items are unlocked */
CHARACTERS.forEach(c=>{ if(c.price===0) unlocked[c.id]=true });
MAPS.forEach(m=>{ if(m.price===0) unlocked[m.id]=true });

/* ========== DOM ========== */
const stage = document.getElementById('stage');
const objectsWrap = document.getElementById('objects');
const playerEl = document.getElementById('player');
const playerWrap = document.getElementById('playerWrap');
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

/* ========== GAME STATE ========== */
let running = false;
let score = 0;
let fallingSpeed = FALLING_BASE_SPEED; // px per frame baseline multiplied
let objs = []; // {id, type:'obs'|'coin', lane, y, el, meta}
let lastSpawn = 0;
let spawnInterval = 1200; // ms dynamic
let lastTime = 0;
let animId = null;

/* player state */
let lane = 1; // 0,1,2 (start in middle)
let targetLane = 1;
let laneX = 0; // pixel x target updated
let playerY = 0; // vertical offset for jump (px)
let velY = 0;
let isJumping = false;

/* run animation frames */
let runFrameIndex = 0;
let runFrameTimer = 0;

/* helpers for sizes (calculated on resize) */
let stageRect = stage.getBoundingClientRect();
function updateStageRect(){ stageRect = stage.getBoundingClientRect() }

/* ========== INIT UI ========== */
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
  charsWrap.innerHTML = '';
  mapsWrap.innerHTML = '';
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
    localStorage.setItem('gr_coins',coins);
    unlocked[item.id] = true;
    localStorage.setItem('gr_unlocked',JSON.stringify(unlocked));
    if(item.id && item.emoji) { /* character bought */ }
    shopCoinsEl.textContent = coins; coinsEl.textContent = coins;
    renderShop(); applySelected();
  } else {
    alert('Masz za mało monet!');
  }
}

/* ========== SPAWNING ========== */
function spawnPair(){
  // choose two distinct lanes
  const a = Math.floor(Math.random()*LANES);
  let b = Math.floor(Math.random()*LANES);
  while(b===a) b = Math.floor(Math.random()*LANES);

  // for each lane choose coin or obstacle (coins somewhat likely)
  [a,b].forEach(l=>{
    const isCoin = Math.random() < 0.35;
    if(isCoin){
      spawnObject('coin', l);
    } else {
      // pick obstacle type randomly
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
  el.style.left = `calc(${midXpercent}% - 32px)`; // center-ish
  el.style.top = `-80px`;
  if(type==='coin'){
    el.textContent = '🪙';
  } else {
    el.textContent = meta.emoji;
  }
  const id = ++objIdCounter;
  objectsWrap.appendChild(el);
  objs.push({
    id, type, lane: laneIndex, y: -80, el,
    meta: meta || {}
  });
}

/* ========== COLLISIONS & SCORING ========== */
function checkCollisionsAndBottom(dt){
  const pRect = playerEl.getBoundingClientRect();

  for(let i = objs.length - 1; i >= 0; i--){
    const o = objs[i];
    // update element position
    o.el.style.top = (o.y) + 'px';

    const oRect = o.el.getBoundingClientRect();

    // collision with player: only if on same lane & vertically overlapping
    const sameLane = (o.lane === lane);
    const verticallyOverlap = !(oRect.bottom < pRect.top || oRect.top > pRect.bottom);

    // if collided with player
    if(sameLane && verticallyOverlap){
      if(o.type === 'coin'){
        // collect coin
        coins += 1;
        localStorage.setItem('gr_coins', coins);
        coinsEl.textContent = coins; shopCoinsEl.textContent = coins;
        // remove object
        o.el.remove(); objs.splice(i,1);
        continue;
      } else {
        // obstacle: if jumpable and player is high enough -> safe
        const jumpable = !!o.meta.jumpable;
        const playerAboveThreshold = playerY > 40; // px - tunable
        if(jumpable && playerAboveThreshold){
          // safe: player jumped over it -> do nothing (object continues to fall)
        } else {
          // collision -> game over
          endGame();
          return;
        }
      }
    }

    // if object reaches bottom of stage -> award points and remove
    if(o.y > stageRect.height - 40){
      // award points for object touching bottom
      score += POINTS_PER_HIT_BOTTOM;
      // remove element
      o.el.remove();
      objs.splice(i,1);
      // optionally: visual feedback (not implemented)
      continue;
    }
  }
}

/* ========== PHYSICS & PLAYER ========== */
function updatePlayerPosition(dt){
  // horizontal: smooth move toward target lane center
  const targetPercent = LANE_PERCENT[targetLane];
  const centerX = stageRect.left + (stageRect.width * (targetPercent/100));
  // we position playerWrap (center) at that x
  // compute current transform X and animate using CSS transform for smoothness
  // We'll set playerWrap's left by translateX
  const wrapRect = playerWrap.getBoundingClientRect();
  const currentCenter = wrapRect.left + wrapRect.width/2;
  const dx = centerX - currentCenter;
  // move by portion to be smooth
  const moveStep = dx * Math.min(1, 0.2);
  if(Math.abs(moveStep) > 0.5){
    playerWrap.style.transform = `translateX(${moveStep}px)`;
  } else {
    playerWrap.style.transform = `translateX(0px)`;
  }
  // Instead of persistent transform, we set playerWrap absolute via left to center it
  // But to keep it simple across screen sizes, directly set playerEl transformX
  const stageLeft = stageRect.left;
  const px = (stageRect.width * (targetPercent/100)) - (playerEl.offsetWidth/2) - stageLeft;
  playerEl.style.transform = `translateX(${px}px) translateY(${ -playerY }px)`;

  // vertical: gravity
  if(isJumping){
    velY -= GRAVITY;
    playerY += velY;
    if(playerY <= 0){
      // landed
      playerY = 0;
      velY = 0;
      isJumping = false;
      playerEl.classList.add('ground');
    } else {
      playerEl.classList.remove('ground');
    }
  } else {
    // small bobbing when on ground to imitate running
    const bob = Math.sin(Date.now()/120) * 2;
    playerEl.style.transform = `translateX(${px}px) translateY(${ -playerY + bob }px)`;
  }

  // update run animation frames
  runFrameTimer += 1;
  if(runFrameTimer > 8){ // change every ~8 frames (~8*16ms ~ 128ms)
    runFrameIndex = (runFrameIndex + 1) % getSelectedCharFrames().length;
    playerEl.textContent = getSelectedCharFrames()[runFrameIndex];
    runFrameTimer = 0;
  }
}

function positionPlayerInstant(){
  updateStageRect();
  const targetPercent = LANE_PERCENT[lane];
  const stageLeft = stageRect.left;
  const px = (stageRect.width * (targetPercent/100)) - (playerEl.offsetWidth/2) - stageLeft;
  playerEl.style.transform = `translateX(${px}px) translateY(0px)`;
}

/* ========== GAME LOOP ========== */
function gameLoop(ts){
  if(!lastTime) lastTime = ts;
  const dt = ts - lastTime;
  lastTime = ts;

  // spawn logic: spawn every spawnInterval ms (decreasing with score)
  lastSpawn += dt;
  // adjust spawnInterval based on score to make it harder
  const speedFactor = 1 + Math.floor(score/50) * 0.12;
  spawnInterval = Math.max(450, 1200 - Math.floor(score/3));
  if(lastSpawn > spawnInterval){
    spawnPair();
    lastSpawn = 0;
  }

  // update falling speed based on score
  fallingSpeed = FALLING_BASE_SPEED + (score * 0.02);

  // update all objects (y += fallingSpeed * dtFactor)
  // dt is ms; convert to approximate px per frame scaling
  const pxStep = fallingSpeed * (dt / 16.66); // baseline per frame scale

  objs.forEach(o => {
    o.y += pxStep;
    // set top immediately; checkCollisions will evaluate later
    o.el.style.top = o.y + 'px';
  });

  // collisions and bottom detection
  checkCollisionsAndBottom(dt);

  // player update
  updatePlayerPosition(dt);

  if(running){
    animId = requestAnimationFrame(gameLoop);
  } else {
    cancelAnimationFrame(animId);
  }
}

/* ========== START / END ========== */
function startGame(){
  if(running) return;
  running = true;
  score = 0;
  lastSpawn = 0;
  objs.forEach(o=>o.el.remove());
  objs = [];
  isJumping = false; velY = 0; playerY = 0;
  lane = 1; targetLane = 1;
  updateStageRect();
  positionPlayerInstant();
  lastTime = 0;
  playerEl.classList.add('ground');
  animId = requestAnimationFrame(gameLoop);
  // UI
  gameOverEl.classList.add('hidden');
}

function endGame(){
  running = false;
  // store best
  if(score > best){
    best = score;
    localStorage.setItem('gr_best', best);
    bestEl.textContent = best;
  }
  // show summary
  scoreFinalEl.textContent = score;
  gameOverEl.classList.remove('hidden');
}

/* ========== CONTROLS: TOUCH & BUTTONS ========== */
let touchStartX = 0, touchStartY = 0, touchStartTime = 0;
const SWIPE_THRESHOLD = 30; // px
const SWIPE_TIME = 600; // ms

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
    // horizontal swipe
    if(dx > 0) swipeRight();
    else swipeLeft();
  } else if(Math.abs(dy) > Math.abs(dx) && dy < -SWIPE_THRESHOLD && dt < SWIPE_TIME){
    // swipe up
    doJump();
  } else {
    // tap
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

/* resize */
window.addEventListener('resize', ()=>{
  updateStageRect();
  positionPlayerInstant();
});

/* save on unload */
window.addEventListener('beforeunload', ()=>{
  localStorage.setItem('gr_coins', coins);
  localStorage.setItem('gr_unlocked', JSON.stringify(unlocked));
  localStorage.setItem('gr_char', selectedChar);
  localStorage.setItem('gr_map', selectedMap);
  localStorage.setItem('gr_best', best);
});

/* ========== UTILITIES ========== */
function getSelectedCharFrames(){
  const ch = CHARACTERS.find(c=>c.id===selectedChar);
  return ch ? ch.emoji : ['🐱','😺','😸'];
}

/* ========== INITIALIZE ========== */
updateStageRect();
initUI();

/* Debug: expose some values (optional)
window.__goldrun = { startGame, endGame, objs, getSelectedCharFrames };
*/

/* Notes on logic:
 - Przeszkody i monety spadają z góry. spawnPair() tworzy dwa obiekty na różnych torach.
 - Obiekty które dotkną dołu (y > stage.height - 40) dają 5 punktów.
 - Kolizja z przeszkodą kończy grę, chyba że przeszkoda jest 'jumpable' i gracz jest wystarczająco wysoko.
 - Monety zbierasz dotknięciem — zwiększa się liczba monet w localStorage.
 - Shop i wybory postaci/mapy działają jak poprzednio.
*/