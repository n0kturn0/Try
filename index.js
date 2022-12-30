// Import stylesheets
import './style.css';

// Write Javascript code!
const canvas = document.getElementById('myCanvas');
const tileSize = 86; // Tamaño de las casillas en pixels
const hexRadius = tileSize / 2; // Radio del hexágono en pixels
const players = [];

const map = [
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
];

function drawTile(type, row, col) {
  // Obtiene el contexto del canvas
  const ctx = canvas.getContext('2d');

  // Establece el color del relleno según el tipo de casilla
  if (type === 0) {
    ctx.fillStyle = 'green';
  } else if (type === 1) {
    ctx.fillStyle = 'gray';
  } else if (type === 2) {
    ctx.fillStyle = 'brown';
  }

  // Dibuja un rectángulo en la posición correspondiente
  ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
}

function getRandomPosition() {
  // Genera una posición aleatoria en el rango del mapa
  const x = Math.floor(Math.random() * map[0].length);
  const y = Math.floor(Math.random() * map.length);

  // Comprueba si la posición está ocupada
  if (map[y][x] === 0) {
    // Devuelve la posición aleatoria
    return { x, y };
  } else {
    // Vuelve a llamar a la función para generar otra posición aleatoria
    return getRandomPosition();
  }
}

function drawPlayer(player) {
  // Obtiene el contexto del canvas
  const ctx = canvas.getContext('2d');

  // Dibuja un círculo en la posición del jugador
  ctx.beginPath();
  ctx.arc(
    player.x * tileSize + tileSize / 2,
    player.y * tileSize + tileSize / 2,
    tileSize / 2,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = 'red';
  ctx.fill();
}

function drawMap() {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      // Dibuja cada casilla del mapa
      drawTile(map[row][col], row, col);
    }
  }
  // Dibuja a todos los jugadores
  players.forEach(drawPlayer);
}

drawMap();

class Player {
  constructor(id, name, x, y) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

function addPlayer(id, name) {
  // Obtiene una posición aleatoria en el mapa
  const pos = getRandomPosition();

  // Crea un nuevo jugador con los datos especificados y la posición aleatoria
  const player = new Player(id, name, pos.x, pos.y);

  // Añade el jugador a la lista
  players.push(player);
}

addPlayer(1, 'Jugador 1', 5, 5);
addPlayer(2, 'Jugador 2', 4, 4);
addPlayer(3, 'Jugador 3', 7, 7);

drawMap();
