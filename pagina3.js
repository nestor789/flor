const starsCanvas = document.getElementById('stars');
const ctx = starsCanvas.getContext('2d');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('startBtn');
const flowers = document.getElementById('flowers');
const loveText = document.getElementById('loveText');
const bgMusic = document.getElementById('bgMusic');

/* Ajustar canvas */
function resize() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* Estrellas */
let stars = [];
function initStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * starsCanvas.width,
      y: Math.random() * starsCanvas.height,
      r: Math.random() * 1.3 + 0.5,
      a: Math.random(),
      v: Math.random() * 0.02
    });
  }
}
let shooting = [];
function drawStars() {
  ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  stars.forEach(s=>{
    ctx.globalAlpha = s.a;
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
    s.a += s.v;
    if(s.a<=0 || s.a>=1) s.v*=-1;
  });
  shooting.forEach((st,i)=>{
    ctx.save();
    ctx.translate(st.x, st.y);
    ctx.rotate(st.angle);
    const grad = ctx.createLinearGradient(0,0,-st.len,0);
    grad.addColorStop(0,"white");
    grad.addColorStop(1,"transparent");
    ctx.strokeStyle = grad;
    ctx.lineWidth=2;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(-st.len,0);
    ctx.stroke();
    ctx.restore();
    st.x += st.speed*Math.cos(st.angle);
    st.y += st.speed*Math.sin(st.angle);
    if(st.x>starsCanvas.width || st.y>starsCanvas.height) shooting.splice(i,1);
  });
  if(Math.random()<0.01){
    shooting.push({
      x: Math.random()*starsCanvas.width,
      y: Math.random()*starsCanvas.height/2,
      len: 80,
      speed: 8,
      angle: Math.PI/4
    });
  }
  requestAnimationFrame(drawStars);
}

/* Crear girasol */
function createSunflower(x,y,size){
  const f=document.createElement('div');
  f.className='flower';
  f.style.left=x+'px';
  f.style.top=y+'px';
  f.style.setProperty('--size', size+'px');
  flowers.appendChild(f);

  // Centro
  const c=document.createElement('div');
  c.className='center';
  f.appendChild(c);

  // Pétalos
  const petalsCount = 20;
  for(let i=0;i<petalsCount;i++){
    const p=document.createElement('div');
    p.className='petal';
    const angle = i * (360/petalsCount);
    p.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleY(0)`;
    f.appendChild(p);
  }

  // Animación
  setTimeout(()=>{
    f.style.opacity=1;
    c.style.transform = 'translate(-50%, -50%) scale(1)';
    const petals = f.querySelectorAll('.petal');
    petals.forEach((p,idx)=>{
      setTimeout(()=>{
        p.style.transform = `translate(-50%, -50%) rotate(${idx*(360/petalsCount)}deg) scaleY(1)`;
      }, idx*70);
    });
    // Balanceo suave
    let a=0;
    setInterval(()=>{
      a+=0.02;
      f.style.transform=`rotate(${Math.sin(a)*2}deg)`;
    },30);
  }, Math.random()*1500);
}

/* Distribución uniforme en toda la pantalla */
function placeFlowers(count){
  const w = window.innerWidth;
  const h = window.innerHeight;
  const cols = Math.ceil(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  const cellW = w / cols;
  const cellH = h / rows;

  let placed = 0;
  for(let r=0; r<rows; r++){
    for(let c=0; c<cols; c++){
      if(placed >= count) return;
      const x = c*cellW + cellW/2 + (Math.random()-0.5)*cellW*0.4;
      const y = r*cellH + cellH/2 + (Math.random()-0.5)*cellH*0.4;
      const s = 60 + Math.random()*50;
      createSunflower(x,y,s);
      placed++;
    }
  }
}

/* Botón inicio */
startBtn.addEventListener('click',()=>{
  overlay.style.opacity=0;
  setTimeout(()=>overlay.style.display='none',1000);

  bgMusic.volume=0.7;
  bgMusic.play().catch(()=>console.log('Autoplay bloqueado'));

  initStars();
  drawStars();
  loveText.style.opacity=1;

  placeFlowers(25); // cantidad de girasoles
});
