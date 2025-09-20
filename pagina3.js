const startButton = document.getElementById('startButton');
const overlay = document.getElementById('overlay');
const starsCanvas = document.getElementById('starsCanvas');
const ctx = starsCanvas.getContext('2d');
const flowersContainer = document.getElementById('flowersContainer');
const music = document.getElementById('backgroundMusic');

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

/* === Estrellas === */
let stars = [];
function createStars() {
    for(let i=0;i<200;i++){
        stars.push({
            x: Math.random()*starsCanvas.width,
            y: Math.random()*starsCanvas.height,
            radius: Math.random()*1.5+0.5,
            alpha: Math.random(),
            twinkleSpeed: Math.random()*0.02
        });
    }
}

function drawStars(){
    ctx.clearRect(0,0,starsCanvas.width, starsCanvas.height);
    stars.forEach(s=>{
        ctx.beginPath();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = "white";
        ctx.arc(s.x,s.y,s.radius,0,Math.PI*2);
        ctx.fill();
        s.alpha += s.twinkleSpeed;
        if(s.alpha<=0||s.alpha>=1) s.twinkleSpeed*=-1;
    });
    requestAnimationFrame(drawStars);
}

/* === Flores === */
function createFlower(){
    const flower = document.createElement('div');
    flower.classList.add('flower');

    const stem = document.createElement('div');
    stem.classList.add('stem');

    const head = document.createElement('div');
    head.classList.add('flower-head');

    const center = document.createElement('div');
    center.classList.add('center');
    head.appendChild(center);

    // Crear 8 pétalos
    for(let i=0;i<8;i++){
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.transform = `rotate(${i*45}deg) translateY(-15px)`;
        head.appendChild(petal);
    }

    flower.appendChild(stem);
    flower.appendChild(head);
    flowersContainer.appendChild(flower);

    // Animación crecimiento desde la maceta
    flower.style.opacity = 1;
    setTimeout(()=>{ stem.style.height = '100px'; }, 100);
}

/* === Evento inicio === */
startButton.addEventListener('click',()=>{
    overlay.style.opacity = 0;
    setTimeout(()=>overlay.style.display='none',2000);
    music.play();
    createStars();
    drawStars();

    // Crear 5 flores centradas
    for(let i=0;i<5;i++){
        setTimeout(()=>{ createFlower(); }, i*600);
    }
});
