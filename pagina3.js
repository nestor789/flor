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
const flowerCount = 9; // Número impar para mejor simetría
const baseStemHeight = 150;
const heightVariation = 40; // Variación de altura entre flores

function createFlower(index){
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flowersContainer.appendChild(flower);

    // Posicionar las flores en un arco sobre la maceta
    const angle = (index / (flowerCount - 1)) * Math.PI - Math.PI/2;
    const radius = 70;
    const flowerX = radius * Math.cos(angle);
    
    flower.style.left = `calc(50% + ${flowerX}px)`;
    
    const stem = document.createElement('div');
    stem.classList.add('stem');
    flower.appendChild(stem);

    // Hojas
    const leafCount = Math.floor(Math.random() * 2) + 2; // 2-3 hojas
    for(let i = 0; i < leafCount; i++){
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        flower.appendChild(leaf);
    }

    // Flor
    const head = document.createElement('div');
    head.classList.add('flower-head');
    head.classList.add('glow');
    flower.appendChild(head);

    const center = document.createElement('div');
    center.classList.add('center');
    head.appendChild(center);

    for(let i=0;i<12;i++){ // Más pétalos para un girasol más lleno
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.transform = `rotate(${i*30}deg) translateY(-25px)`;
        head.appendChild(petal);
    }

    flower.style.opacity = 1;

    // Altura variable para cada tallo
    const stemHeight = baseStemHeight + (Math.random() * heightVariation - heightVariation/2);
    
    // Animación tallo y hojas
    let currentStemHeight = 0;
    const growInterval = setInterval(()=>{
        if(currentStemHeight >= stemHeight){
            clearInterval(growInterval);
            // Flor florece
            head.style.transition = 'transform 1.5s ease-out';
            head.style.transform = 'scale(1)';
        } else {
            currentStemHeight += 2;
            stem.style.height = currentStemHeight + 'px';
            
            // Posicionar hojas en diferentes alturas
            const leaves = flower.querySelectorAll('.leaf');
            leaves.forEach((leaf, i) => {
                if (currentStemHeight > stemHeight * (0.2 + i * 0.2)) {
                    leaf.style.opacity = 1;
                    leaf.style.bottom = (currentStemHeight * (0.2 + i * 0.2)) + 'px';
                    
                    // Alternar posición izquierda/derecha
                    if (i % 2 === 0) {
                        leaf.style.left = '-15px';
                    } else {
                        leaf.style.right = '-15px';
                    }
                }
            });
        }
    }, 30);

    // Animación viento - usamos windAngle en lugar de angle
    let windAngle = 0;
    setInterval(()=>{
        windAngle += 0.02;
        const sway = Math.sin(windAngle) * (3 + Math.random() * 4);
        stem.style.transform = `rotate(${sway}deg)`;
        head.style.transform = `scale(1) rotate(${sway * 0.7}deg)`;
    },30);
}

startButton.addEventListener('click',()=>{
    overlay.style.opacity = 0;
    setTimeout(()=>overlay.style.display='none',2000);
    
    // Intentar reproducir música
    music.play().catch(e => {
        console.log("La reproducción automática de audio fue prevenida:", e);
    });
    
    createStars();
    drawStars();
    
    // Mostrar mensaje de amor
    loveMessage.style.opacity = 1;

    // Crear flores con pequeño retraso entre ellas
    for(let i=0;i<flowerCount;i++){
        setTimeout(() => createFlower(i), i * 200);
    }
});

// Ajustar el canvas cuando cambia el tamaño de la ventana
window.addEventListener('resize', function() {
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    stars = [];
    createStars();
});

// Manejar la reproducción de audio después de la interacción del usuario
document.addEventListener('click', function() {
    if (music.paused) {
        music.play().catch(e => {
            console.log("Error al reproducir audio:", e);
        });
    }
}, { once: true });