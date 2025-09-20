const startButton = document.getElementById('startButton');
const overlay = document.getElementById('overlay');
const flowersContainer = document.getElementById('flowersContainer');
const pot = document.querySelector('.pot');
const starsCanvas = document.getElementById('starsCanvas');
const ctx = starsCanvas.getContext('2d');
const music = document.getElementById('backgroundMusic');
const loveMessage = document.getElementById('loveMessage');

starsCanvas.width = window.innerWidth;
starsCanvas.height = window.innerHeight;

// === Estrellas y fugaces ===
let stars = [];
let shootingStars = [];

function createStars() {
    stars = [];
    shootingStars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * starsCanvas.width,
            y: Math.random() * starsCanvas.height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            twinkleSpeed: Math.random() * 0.02
        });
    }
}

function drawStars() {
    ctx.clearRect(0,0,starsCanvas.width, starsCanvas.height);

    stars.forEach(s => {
        ctx.beginPath();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = 'white';
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI*2);
        ctx.fill();
        s.alpha += s.twinkleSpeed;
        if(s.alpha<=0||s.alpha>=1) s.twinkleSpeed*=-1;
    });

    shootingStars.forEach((star,i)=>{
        star.x += star.vx;
        star.y += star.vy;
        star.alpha -= 0.01;
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle='white';
        ctx.fillRect(star.x, star.y, 2, 2);
        if(star.alpha<=0) shootingStars.splice(i,1);
    });

    requestAnimationFrame(drawStars);
}

function spawnShootingStar(){
    shootingStars.push({
        x: Math.random()*starsCanvas.width,
        y: Math.random()*starsCanvas.height/2,
        vx: Math.random()*8 + 4,
        vy: Math.random()*2 + 1,
        alpha:1
    });
    setTimeout(spawnShootingStar, Math.random()*3000 + 2000);
}

// === Crear flores ===
const flowerCount = 4;

function createFlower(index){
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = `calc(50% + ${(index-1.5)*150}px)`;
    flower.style.bottom = '100px';
    flower.style.opacity = 1;
    flowersContainer.appendChild(flower);

    const stem = document.createElement('div');
    stem.classList.add('stem');
    stem.style.height='0px';
    flower.appendChild(stem);

    const leafs = [];
    const leafCount = 2 + Math.floor(Math.random()*2);
    for(let i=0;i<leafCount;i++){
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        leaf.style.opacity=0;
        flower.appendChild(leaf);
        leafs.push(leaf);
    }

    const head = document.createElement('div');
    head.classList.add('flower-head','glow');
    head.style.transform='translateX(-50%) scale(0)';
    flower.appendChild(head);

    const center = document.createElement('div');
    center.classList.add('center');
    center.style.width = '35px';
    center.style.height = '35px';
    head.appendChild(center);

    const petals = [];
    for(let i=0;i<12;i++){
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.transform=`rotate(${i*30}deg) translateY(-25px)`;
        head.appendChild(petal);
        petals.push(petal);
    }

    // Tamaño del tallo aleatorio
    const maxHeight = 150 + Math.random()*70;
    let currentHeight = 0;

    const growInterval = setInterval(()=>{
        if(currentHeight>=maxHeight){
            clearInterval(growInterval);

            // Flor aparece al final
            let scale=0;
            const flowerGrow = setInterval(()=>{
                if(scale>=1) clearInterval(flowerGrow);
                scale+=0.02;
                head.style.transform = `translateX(-50%) scale(${scale})`;
            },30);

        } else {
            currentHeight+=2;
            stem.style.height = currentHeight+'px';
            head.style.bottom = currentHeight+'px';

            // Hojas crecen
            leafs.forEach((leaf,i)=>{
                leaf.style.opacity=1;
                const pos = currentHeight*(0.2+i*0.3);
                leaf.style.bottom = pos+'px';
                leaf.style.left = i%2===0 ? '-15px':'';
                leaf.style.right = i%2!==0 ? '-15px':'';
            });
        }
    },30);

    // Animación viento
    let windAngle = Math.random()*Math.PI*2;
    setInterval(()=>{
        windAngle += 0.005;
        const sway = Math.sin(windAngle)*2;
        stem.style.transform = `rotate(${sway}deg)`;
        const scaleMatch = head.style.transform.includes('scale') ? 1 : 0;
        head.style.transform = `translateX(-50%) scale(${scaleMatch}) rotate(${sway*0.5}deg)`;
        petals.forEach((petal,i)=>{
            const swayPetal = Math.sin(windAngle+i/2)*2;
            petal.style.transform = `rotate(${i*30 + swayPetal}deg) translateY(-25px)`;
        });
    },50);

    // Líneas de viento
    for(let i=0;i<3;i++){
        const wind = document.createElement('div');
        wind.classList.add('wind');
        wind.style.left = `${Math.random()*50 - 25}px`;
        wind.style.bottom = `${Math.random()*maxHeight}px`;
        flower.appendChild(wind);
    }
}

// === Botón iniciar ===
startButton.addEventListener('click',()=>{
    overlay.style.opacity = 0;
    setTimeout(()=>{
        overlay.style.display='none';
        pot.style.display='block';
    },500);

    music.play().catch(e=>console.log("Autoplay prevenido:",e));

    createStars();
    drawStars();
    spawnShootingStar();

    loveMessage.style.opacity = 1;

    for(let i=0;i<flowerCount;i++){
        setTimeout(()=>createFlower(i), i*500);
    }
});

window.addEventListener('resize',()=>{
    starsCanvas.width = window.innerWidth;
    starsCanvas.height = window.innerHeight;
    createStars();
});
