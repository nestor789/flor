const starsCanvas = document.getElementById('stars');
const ctx = starsCanvas.getContext('2d');
const overlay = document.getElementById('overlay');
const startBtn = document.getElementById('startBtn');
const flowers = document.getElementById('flowers');
const loveText = document.getElementById('loveText');
const bgMusic = document.getElementById('bgMusic');

/* --- Ajuste de lienzo --- */
function resize() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

/* --- Estrellas con fugaces --- */
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

/* --- Crear flor --- */
function createFlower(x,y,size){
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

  // Pétalos (12)
  for(let i=0;i<12;i++){
    const p=document.createElement('div');
    p.className='petal';
    const angle = i * 30; // 360/12
    p.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleY(0)`;
    f.appendChild(p);
  }

  // Animación
  setTimeout(()=>{
    f.style.opacity=1;
    // Aparece centro
    c.style.transform = 'translate(-50%, -50%) scale(1)';
    // Despliegue secuencial de pétalos
    const petals = f.querySelectorAll('.petal');
    petals.forEach((p,idx)=>{
      setTimeout(()=>{
        p.style.transform = `translate(-50%, -50%) rotate(${idx*30}deg) scaleY(1)`;
      }, idx*80);
    });
    // Balanceo suave
    let a=0;
    setInterval(()=>{
      a+=0.02;
      f.style.transform=`rotate(${Math.sin(a)*2}deg)`;
    },30);
  }, Math.random()*2000);
}

/* --- Botón inicio --- */
startBtn.addEventListener('click',()=>{
  overlay.style.opacity=0;
  setTimeout(()=>overlay.style.display='none',1000);

  bgMusic.volume=0.7;
  bgMusic.play().catch(()=>console.log('Autoplay bloqueado'));

  initStars();
  drawStars();
  loveText.style.opacity=1;

  const w=window.innerWidth, h=window.innerHeight;
  const count=25;
  for(let i=0;i<count;i++){
    const x=Math.random()*w;
    const y=Math.random()*h*0.8 + h*0.1; // evita la franja del texto
    const s=40+Math.random()*40;
    // deja espacio central para el texto
    const dx=x-w/2, dy=y-h*0.2;
    if(Math.sqrt(dx*dx+dy*dy)<120){i--;continue;}
    createFlower(x,y,s);
  }
});
