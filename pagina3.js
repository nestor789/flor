const startButton = document.getElementById('startButton');
const overlay = document.getElementById('overlay');
const starsCanvas = document.getElementById('starsCanvas');
const ctx = starsCanvas.getContext('2d');
const bouquet = document.getElementById('bouquet');
const loveMessage = document.getElementById('loveMessage');
const heartsContainer = document.getElementById('heartsContainer');
const music = document.getElementById('backgroundMusic');

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];

/* === Estrellas === */
class Star {
    constructor() {
        this.x = Math.random() * starsCanvas.width;
        this.y = Math.random() * starsCanvas.height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random();
        this.twinkleSpeed = Math.random() * 0.02;
    }
    draw() {
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = "white";
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
    }
    update() {
        this.alpha += this.twinkleSpeed;
        if(this.alpha <=0 || this.alpha>=1) this.twinkleSpeed*=-1;
        this.draw();
    }
}

class ShootingStar {
    constructor() { this.reset(); }
    reset() { this.x=Math.random()*starsCanvas.width; this.y=Math.random()*starsCanvas.height*0.3; this.length=Math.random()*80+50; this.speed=Math.random()*10+6; this.trail=[]; }
    draw() {
        for(let i=0;i<this.trail.length;i++){
            const pos=this.trail[i];
            ctx.globalAlpha = i/this.trail.length;
            ctx.fillStyle='white';
            ctx.fillRect(pos.x,pos.y,2,2);
        }
        ctx.globalAlpha=1;
        ctx.fillRect(this.x,this.y,2,2);
    }
    update() {
        this.trail.push({x:this.x, y:this.y});
        if(this.trail.length>20) this.trail.shift();
        this.x+=this.speed; this.y+=this.speed;
        if(this.x>starsCanvas.width||this.y>starsCanvas.height) this.reset();
        this.draw();
    }
}

function createStars(){for(let i=0;i<200;i++) stars.push(new Star());}
function createShootingStars(){for(let i=0;i<4;i++) shootingStars.push(new ShootingStar());}

function animateStars(){
    ctx.clearRect(0,0,starsCanvas.width, starsCanvas.height);
    stars.forEach(s=>s.update());
    if(Math.random()<0.01) shootingStars.push(new ShootingStar());
    shootingStars.forEach(s=>s.update());
    requestAnimationFrame(animateStars);
}

/* === Flores === */
const sunflowerPositions=[
    { left:180, top:120, height:180, delay:0.2, center:true },
    { left:120, top:150, height:160, delay:0.4, center:false },
    { left:240, top:150, height:170, delay:0.6, center:false },
    { left:90, top:190, height:150, delay:0.8, center:false },
    { left:270, top:190, height:155, delay:1.0, center:false },
    { left:160, top:80, height:200, delay:1.2, center:false },
    { left:200, top:80, height:190, delay:1.4, center:false }
];

function createSunflower(left, top, height, isCenter=false, delay=0){
    const sunflower = document.createElement('div');
    sunflower.className = `sunflower ${isCenter?'center':''}`;
    sunflower.style.left=`${left}px`; sunflower.style.top=`${top}px`;
    sunflower.style.animationDelay=`${delay}s, ${delay+0.5}s`;

    sunflower.innerHTML=`
        <div class="sunflower__stem"></div>
        <div class="sunflower__leaf sunflower__leaf--1"></div>
        <div class="sunflower__leaf sunflower__leaf--2"></div>
        <div class="sunflower__head">
            <div class="sunflower__petals">${Array(16).fill(0).map(_=>'<div class="sunflower__petal"></div>').join('')}</div>
            <div class="sunflower__seeds"></div>
        </div>
    `;
    bouquet.appendChild(sunflower);
}

function createBouquet(){
    sunflowerPositions.forEach(pos=>{
        createSunflower(pos.left,pos.top,pos.height,pos.center,pos.delay);
    });
}

/* === Corazones === */
function createHearts(count){
    for(let i=0;i<count;i++){
        const heart=document.createElement('div');
        heart.className='heart'; heart.innerHTML='❤️';
        heart.style.left=Math.random()*100+'vw';
        heart.style.animationDuration=(Math.random()*5+5)+'s';
        heart.style.fontSize=(Math.random()*15+15)+'px';
        heartsContainer.appendChild(heart);
        setTimeout(()=>heart.remove(),8000);
    }
}

/* === Evento inicio === */
startButton.addEventListener('click',()=>{
    overlay.style.opacity=0;
    setTimeout(()=>overlay.style.display='none',2000);
    music.play();
    createStars(); createShootingStars(); animateStars();
    createBouquet();
    setTimeout(()=>loveMessage.style.opacity=1,3000);
    setTimeout(()=>createHearts(10),2000);
});
