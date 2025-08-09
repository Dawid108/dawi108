/* 20250809_grscript.js
  Prosta gra "Gold Run" - kliknij Start, kot biega i zbiera monety, unika przeszkód.
  Komentarze wyjaśniają ważne fragmenty kodu.
*/

// --- KONFIG ---
const CHARACTERS = [
  {id:'cat',emoji:'🐱',price:0},
  {id:'monkey',emoji:'🐵',price:50},
  {id:'lion',emoji:'🦁',price:120},
  {id:'tiger',emoji:'🐯',price:200},
  {id:'dog',emoji:'🐶',price:80},
  {id:'bear',emoji:'🐻',price:180},
  {id:'panda',emoji:'🐼',price:160},
  {id:'fox',emoji:'🦊',price:90},
  {id:'rabbit',emoji:'🐰',price:40}
];
const MAPS = [
  {id:'city',name:'Miasto',emoji:'🏙️',price:0,cls:'map-0'},
  {id:'night',name:'Noc',emoji:'🌃',price:100,cls:'map-1'},
  {id:'sunset',name:'Zachód',emoji:'🌇',price:80,cls:'map-2'},
  {id:'bridge',name:'Most',emoji:'🌉',price:140,cls:'map-3'}
];
const OBSTACLES = ['🚘','🚊','🚧'];

// --- STAN GRY ---
let coins = Number(localStorage.getItem('gr_coins')||0);
let best = Number(localStorage.getItem('gr_best')||0);
let unlocked = JSON.parse(localStorage.getItem('gr_unlocked')||'{}');
let selectedChar = localStorage.getItem('gr_char')||'cat';
let selectedMap = localStorage.getItem('gr_map')||'city';

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

// --- ZMIENNE ROZGRYWKI ---
let running=false, score=0, speed=3, spawnTimer=0, objs=[], animId=null;

// Inicjalizacja UI
function initUI(){
  coinsEl.textContent = coins;
  shopCoinsEl.textContent = coins;
  bestEl.textContent = best;
  renderShop();
  applySelected();
}

function applySelected(){
  const ch = CHARACTERS.find(c=>c.id===selectedChar);
  const mp = MAPS.find(m=>m.id===selectedMap);
  if(ch) playerEl.textContent = ch.emoji;
  if(mp) backgroundEl.className = mp.cls;
}

// Render sklepu (postacie + mapy)
function renderShop(){
  charsWrap.innerHTML=''; mapsWrap.innerHTML='';
  CHARACTERS.forEach(c=>{
    const div = document.createElement('div'); div.className='card';
    div.innerHTML = `<div style="font-size:32px">${c.emoji}</div><strong>${c.id}</strong><div>${c.price} 🪙</div>`;
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
    div.innerHTML = `<div style="font-size:28px">${m.emoji}</div><strong>${m.name}</strong><div>${m.price} 🪙</div>`;
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
    coins -= item.price; localStorage.setItem('gr_coins',coins);
    unlocked[item.id]=true; localStorage.setItem('gr_unlocked',JSON.stringify(unlocked));
    if(item.id && item.emoji) { /* postać */ }
    shopCoinsEl.textContent = coins; coinsEl.textContent = coins;
    renderShop();
    applySelected();
  } else {
    alert('Masz za mało monet!');
  }
}

// --- LOGIKA GRY ---
function startGame(){
  if(running) return;
  running=true; score=0; speed=3; spawnTimer=0; objs=[]; gameOverEl.classList.add('hidden');
  // usuń wszystkie przeszkody z DOM
  document.querySelectorAll('.obstacle,.coin').forEach(n=>n.remove());
  loop();
}

function endGame(){
  running=false; cancelAnimationFrame(animId);
  // pokaż wynik
  gameOverEl.classList.remove('hidden');
  scoreFinalEl.textContent = score;
  if(score>best){ best=score; localStorage.setItem('gr_best',best); bestEl.textContent = best; }
}

function restartGame(){
  startGame();
}

// proste skakanie
let isJumping=false; let jumpV=0;
function jump(){
  if(!running) return;
  if(isJumping) return;
  isJumping=true; jumpV = 12; // siła skoku
}

// spawn przeszkód i monet
function spawn(){
  // częstotliwość zależna od prędkości
  spawnTimer += 1;
  const threshold = Math.max(30, 90 - Math.floor(score/10));
  if(spawnTimer > threshold){
    spawnTimer = 0;
    // losuj typ: coin or obstacle
    if(Math.random()<0.35){ // moneta
      createCoin();
    } else {
      createObstacle();
    }
  }
}

function createObstacle(){
  const el = document.createElement('div'); el.className='obstacle';
  const emoji = OBSTACLES[Math.floor(Math.random()*OBSTACLES.length)];
  el.textContent = emoji;
  el.style.right = '-20%';
  el.dataset.x = window.innerWidth;
  document.getElementById('stage').appendChild(el);
  objs.push({type:'obs',el, x: window.innerWidth, w:40});
}

function createCoin(){
  const el = document.createElement('div'); el.className='coin'; el.textContent='🪙';
  el.style.right = '-10%';
  el.style.bottom = (Math.random()*30 + 18) + '%';
  el.dataset.x = window.innerWidth;
  document.getElementById('stage').appendChild(el);
  objs.push({type:'coin',el,x:window.innerWidth,w:28});
}

// prosta kolizja oparta na prostokątach ekranu
function checkCollisions(){
  const pRect = playerEl.getBoundingClientRect();
  for(let i=objs.length-1;i>=0;i--){
    const o = objs[i];
    const oRect = o.el.getBoundingClientRect();
    // kolizja
    if(pRect.right > oRect.left && pRect.left < oRect.right && pRect.bottom > oRect.top && pRect.top < oRect.bottom){
      if(o.type==='coin'){
        // zbierz monetę
        coins += 1; score += 1; localStorage.setItem('gr_coins',coins);
        coinsEl.textContent = coins; shopCoinsEl.textContent = coins;
        o.el.remove(); objs.splice(i,1);
      } else {
        // kolizja ze przeszkodą -> koniec gry
        endGame();
        return;
      }
    }
  }
}

// główna pętla animacji
function loop(){
  animId = requestAnimationFrame(loop);
  // porusz rzeczy w lewo
  for(let i=objs.length-1;i>=0;i--){
    const o = objs[i];
    o.x -= speed; // prędkość
    o.el.style.transform = `translateX(${- ( (window.innerWidth - o.x) )}px)`;
    // usuń gdy poza ekranem
    if(o.x < -100){ o.el.remove(); objs.splice(i,1); }
  }
  // skakanie: zmieniamy bottom względnie
  if(isJumping){
    const b = parseFloat(getComputedStyle(playerEl).bottom);
    // aktualizuj prędkość i pozycję
    const newBottom = b + jumpV;
    playerEl.style.bottom = Math.max(12, newBottom) + '%';
    jumpV -= 0.8; // grawitacja
    if(jumpV < -12){ // koniec skoku
      isJumping=false; playerEl.style.bottom = '12%';
    }
  }
  // losuj spawny i sprawdź kolizje
  spawn();
  checkCollisions();
  // zwiększ trudność
  if(running && score%10===0){ speed = 3 + Math.floor(score/20); }
}

// --- OBSŁUGA PRZYCISKÓW I DOTYKU ---
startBtn.addEventListener('click', startGame);
jumpBtn.addEventListener('click', ()=>jump());
shopBtn.addEventListener('click', ()=>{ shopEl.classList.remove('hidden'); shopCoinsEl.textContent = coins; });
closeShop.addEventListener('click', ()=>{ shopEl.classList.add('hidden'); });

document.getElementById('restartBtn').addEventListener('click', ()=>{ gameOverEl.classList.add('hidden'); startGame(); });

// obsługa dotyku: tapnij aby skoczyć kiedy gra w trakcie
document.getElementById('stage').addEventListener('touchstart', (e)=>{
  if(!running) return; jump();
});

// inicjalizacja UI i elementów
initUI();

// zapisz stan przy opuszczaniu strony
window.addEventListener('beforeunload', ()=>{
  localStorage.setItem('gr_coins',coins);
  localStorage.setItem('gr_unlocked',JSON.stringify(unlocked));
  localStorage.setItem('gr_char',selectedChar);
  localStorage.setItem('gr_map',selectedMap);
  localStorage.setItem('gr_best',best);
});