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

/* Cielo estrellado */
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

/* Crear girasol realista */
function createSunflower(x,y,size){
  const f=document.createElement('div');
  f.className='flower';
  f.style.left=x+'px';
  f.style.top=y+'px';
  f.style.setProperty('--size', size+'px');
  flowers.appendChild(f);

  // Tallo
  const stem = document.createElement('div');
  stem.className = 'stem';
  f.appendChild(stem);

  // Hojas
  const leaf1 = document.createElement('div');
  leaf1.className = 'leaf left';
  f.appendChild(leaf1);

  const leaf2 = document.createElement('div');
  leaf2.className = 'leaf right';
  f.appendChild(leaf2);

  // Centro
  const c=document.createElement('div');
  c.className='center';
  f.appendChild(c);

  // Pétalos en gota con variación
  const petalsCount = 24;
  for(let i=0;i<petalsCount;i++){
    const p=document.createElement('div');
    p.className='petal';
    const angle = i * (360/petalsCount);
    // Variación aleatoria en la posición y rotación
    const variationX = (Math.random() - 0.5) * 5;
    const variationY = (Math.random() - 0.5) * 5;
    const variationRot = (Math.random() - 0.5) * 10;
    
    p.style.transform = `translate(calc(-50% + ${variationX}%), calc(-50% + ${variationY}%)) rotate(${angle + variationRot}deg) scaleY(0)`;
    f.appendChild(p);
  }

  // Animación
  setTimeout(()=>{
    f.style.opacity=1;
    c.style.transform = 'translate(-50%, -50%) scale(1)';
    const petals = f.querySelectorAll('.petal');
    petals.forEach((p,idx)=>{
      setTimeout(()=>{
        const currentTransform = p.style.transform;
        p.style.transform = currentTransform.replace('scaleY(0)', 'scaleY(1)');
      }, idx*50);
    });
    
    // Balanceo suave con movimiento de hojas
    let a = Math.random() * Math.PI * 2;
    setInterval(()=>{
      a+=0.01;
      f.style.transform=`rotate(${Math.sin(a)*3}deg)`;
      
      // Movimiento sutil de hojas
      leaf1.style.transform = `rotate(${-15 + Math.sin(a * 1.3) * 5}deg)`;
      leaf2.style.transform = `rotate(${15 + Math.cos(a * 1.3) * 5}deg) scaleX(-1)`;
    },30);
  }, Math.random()*1500);
}

/* Distribución orgánica */
function placeFlowers(count){
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  for(let i=0; i<count; i++){
    // Distribución más orgánica (no en cuadrícula)
    const x = Math.random() * w * 0.8 + w * 0.1;
    const y = h * 0.7 + Math.random() * h * 0.3; // Mayor concentración en la parte inferior
    const s = 70 + Math.random()*50;
    createSunflower(x,y,s);
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

  placeFlowers(25);
});