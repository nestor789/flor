function createFlower(index) {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flowersContainer.appendChild(flower);

    // Posicionar las flores en estilo ramo
    const offsetX = (Math.random() - 0.5) * 100; // ±50px respecto al centro
    const offsetY = Math.random() * 30;          // variación vertical
    flower.style.left = `calc(50% + ${offsetX}px)`;
    flower.style.bottom = `${100 + offsetY}px`; // base del tallo sobre la maceta

    // Tallo
    const stem = document.createElement('div');
    stem.classList.add('stem');
    flower.appendChild(stem);

    // Hojas
    const leafCount = Math.floor(Math.random() * 2) + 2;
    const leaves = [];
    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.classList.add('leaf');
        flower.appendChild(leaf);
        leaves.push(leaf);
    }

    // Cabeza de la flor
    const head = document.createElement('div');
    head.classList.add('flower-head', 'glow');
    head.style.position = 'absolute';
    head.style.left = '50%';
    head.style.bottom = '0px'; // se actualizará con el tallo
    head.style.transform = 'translateX(-50%) scale(0)';
    flower.appendChild(head);

    const center = document.createElement('div');
    center.classList.add('center');
    head.appendChild(center);

    const petals = [];
    for (let i = 0; i < 12; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.transform = `rotate(${i * 30}deg) translateY(-25px)`;
        head.appendChild(petal);
        petals.push(petal);
    }

    flower.style.opacity = 1;

    // Altura variable del tallo
    const baseStemHeight = 150;
    const heightVariation = 40;
    const stemHeight = baseStemHeight + (Math.random() * heightVariation - heightVariation / 2);

    // Animación de crecimiento del tallo
    let currentStemHeight = 0;
    const growInterval = setInterval(() => {
        if (currentStemHeight >= stemHeight) {
            clearInterval(growInterval);
            head.style.transition = 'transform 1.5s ease-out';
            head.style.transform = 'translateX(-50%) scale(1)';
        } else {
            currentStemHeight += 2;
            stem.style.height = currentStemHeight + 'px';

            // Posicionar hojas a lo largo del tallo
            leaves.forEach((leaf, i) => {
                if (currentStemHeight > stemHeight * (0.2 + i * 0.2)) {
                    leaf.style.opacity = 1;
                    leaf.style.bottom = (currentStemHeight * (0.2 + i * 0.2)) + 'px';
                    leaf.style.left = i % 2 === 0 ? '-15px' : '';
                    leaf.style.right = i % 2 !== 0 ? '-15px' : '';
                }
            });

            // Mantener la flor en la punta del tallo
            head.style.bottom = currentStemHeight + 'px';
        }
    }, 30);

    // Animación viento para tallo, hojas y pétalos
    let windAngle = Math.random() * Math.PI * 2; // ángulo inicial aleatorio
    setInterval(() => {
        windAngle += 0.02;

        // Oscilación del tallo
        const sway = Math.sin(windAngle) * (2 + Math.random() * 3);
        stem.style.transform = `rotate(${sway}deg)`;

        // Oscilación de la flor
        head.style.transform = `translateX(-50%) scale(1) rotate(${sway * 0.7}deg)`;

        // Oscilación suave de los pétalos
        petals.forEach((petal, i) => {
            const petalSway = Math.sin(windAngle + i) * 5; // cada pétalo se mueve ligeramente distinto
            petal.style.transform = `rotate(${i * 30 + petalSway}deg) translateY(-25px)`;
        });

        // Oscilación de hojas
        leaves.forEach((leaf, i) => {
            const leafSway = Math.sin(windAngle + i) * 8;
            leaf.style.transform = `rotate(${i % 2 === 0 ? -45 + leafSway : 45 + leafSway}deg)`;
        });
    }, 30);
}
