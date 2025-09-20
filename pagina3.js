const btn = document.getElementById('startBtn');
const garden = document.getElementById('garden');
const song = document.getElementById('song');
const loveText = document.getElementById('loveText');

btn.addEventListener('click', () => {
  btn.style.display = 'none';

  // Fondo de negro a amarillo suave
  document.body.animate([
    {backgroundColor:'black'},
    {backgroundColor:'#222'},
    {backgroundColor:'#ffeb3b'}
  ], {duration:5000, fill:'forwards'});

  // Reproducir la canción
  song.play();

  // Crear 7 flores amarillas
  const positions = [
    [50,80],[30,70],[70,70],[20,60],[80,60],[40,55],[60,55]
  ];
  positions.forEach((p,i)=>setTimeout(()=>drawFlower(p[0],p[1]), i*800));

  // Mostrar el texto al final
  setTimeout(()=>{
    loveText.animate([{opacity:0},{opacity:1}],{duration:3000,fill:'forwards'});
  }, positions.length*800 + 4000);
});

function drawFlower(xPercent,yPercent){
  const g = createSVG('g',{transform:`translate(${xPercent}%,${yPercent}%) scale(0)`});
  
  // Tallo
  const stem = createSVG('line',{
    x1:0, y1:0, x2:0, y2:-80,
    stroke:'green','stroke-width':6
  });
  g.appendChild(stem);

  // Hojas
  for(let i=0;i<2;i++){
    const leaf = createSVG('ellipse',{
      cx: i===0?-15:15,
      cy: -40,
      rx: 15, ry: 8,
      fill:'green'
    });
    g.appendChild(leaf);
  }

  // Centro
  const center = createSVG('circle',{
    cx:0, cy:-100, r:18,
    fill:'#4b2e1e'
  });
  g.appendChild(center);

  // Pétalos
  const petals = 14;
  for(let i=0;i<petals;i++){
    const angle = (360/petals)*i;
    const petal = createSVG('ellipse',{
      cx:0, cy:-100,
      rx:10, ry:30,
      fill:'gold',
      transform:`rotate(${angle},0,-100)`
    });
    g.appendChild(petal);
  }

  garden.appendChild(g);

  // Animación de crecimiento
  g.animate([{transform:`translate(${xPercent}%,${yPercent}%) scale(0)`},
             {transform:`translate(${xPercent}%,${yPercent}%) scale(1)`}],
             {duration:2000, fill:'forwards', easing:'ease-out'});
}

function createSVG(tag, attrs){
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for(let k in attrs) el.setAttribute(k, attrs[k]);
  return el;
}
