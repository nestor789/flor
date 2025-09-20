const startButton = document.getElementById('startButton');
const overlay = document.getElementById('overlay');
const starsCanvas = document.getElementById('starsCanvas');
const ctx = starsCanvas.getContext('2d');
const flowersContainer = document.getElementById('flowersContainer');
const loveMessage = document.getElementById('loveMessage');
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
const flowerCount = 5;
const maxStemHeight = 120;

function createFlower(index){
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flowersContainer.appendChild(flower);

    const stem = document.createElement('div');
    stem.classList.add('stem');
    flower.appendChild(stem);

    // Hojas
    const leaf1 = document.createElement('div');
    leaf1.classList.add('leaf');
    flower.appendChild(leaf1);

    const leaf2 = document.createElement('div');
    leaf2.classList.add('leaf');
    flower.appendChild(leaf2);

    // Flor
    const head = document.createElement('div');
    head.classList.add('flower-head');
    flower.appendChild(head);

    const center = document.createElement('div');
    center.classList.add('center');
    head.appendChild(center);

    for(let i=0;i<8;i++){
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.transform = `rotate(${i*45}deg) translateY(-15px)`;
        head.appendChild(petal);
    }

    flower.style.opacity = 1;

    // Animación tallo y hojas
    let stemHeight = 0;
    const growInterval = setInterval(()=>{
        if(stemHeight >= maxStemHeight){
            clearInterval(growInterval);
            // Flor florece
            head.style.transition = 'transform 1s ease-out';
            head.style.transform = 'scale(1)';
        } else {
            stemHeight += 2;
            stem.style.height = stemHeight + 'px';
            leaf1.style.opacity = 1;
            leaf2.style.opacity = 1;
            leaf1.style.bottom = (stemHeight*0.5) + 'px';
            leaf2.style.bottom = (stemHeight*0.7) + 'px';
            leaf1.style.left = '-10px';
            leaf2.style.left = '10px';
        }
    }, 30);

    // Animación viento
    let angle = 0;
    setInterval(()=>{
        angle += 0.02;
        const sway = Math.sin(angle) * 5;
        stem.style.transform = `rotate(${sway}deg)`;
        head.style.transform = `scale(1) rotate(${sway}deg)`;
    },30);
}

startButton.addEventListener('click',()=>{
    overlay.style.opacity = 0;
    setTimeout(()=>overlay.style.display='none',2000);
    music.play();
    createStars();
    drawStars();
    loveMessage.style.opacity = 1;

    // Crear flores simultáneamente
    for(let i=0;i<flowerCount;i++){
        createFlower(i);
    }
});
