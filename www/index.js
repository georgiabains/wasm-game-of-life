import { Universe, Cell } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg.wasm"
import "./main.css"

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC";
const DEAD_COLOR = "#FFFFFF";
const ALIVE_COLOR = "#000000";

const universe = Universe.new()
const width = universe.width()
const height = universe.height()

const canvas = document.querySelector('[data-game="canvas"]')
canvas.height = (CELL_SIZE + 1) * height + 1
canvas.width = (CELL_SIZE + 1) * width + 1

const ctx = canvas.getContext('2d')

let animationId = null

const renderLoop = () => {
  debugger;
  universe.tick()

  drawGrid()
  drawCells()

  animationId = requestAnimationFrame(renderLoop)
}

const drawGrid = () => {
  ctx.beginPath()
  ctx.strokeStyle = GRID_COLOR

  // Vertical lines.
  for (let i = 0; i <= width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 0; j <= height; j++) {
    ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
}

const getIndex = (row, column) => {
  return row * width + column;
};

const drawCells = () => {
  const cellsPtr = universe.cells()
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height)

  ctx.beginPath()

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col);

      ctx.fillStyle = cells[idx] === Cell.Dead
        ? DEAD_COLOR
        : ALIVE_COLOR;

      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      );
    }
  }

  ctx.stroke();
}

const playPauseButton = document.querySelector('[data-game="play-pause"]')

const play = () => {
  playPauseButton.textContent = "pause"
  renderLoop()
}

const pause = () => {
  playPauseButton.textContent = "play"
  cancelAnimationFrame(animationId)
  animationId = null
}

const isPaused = () => {
  return animationId === null
}

playPauseButton.addEventListener('click', event => {
  isPaused() ? play() : pause()
})

canvas.addEventListener('click', event => {
  const boundingRect = canvas.getBoundingClientRect()
  
  const scaleX = canvas.width / boundingRect.width
  const scaleY = canvas.height / boundingRect.height

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX
  const canvasTop = (event.clientY - boundingRect.top) * scaleY

  const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1)
  const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1)

  universe.toggle_cell(row, col)

  drawGrid()
  drawCells()
})

drawGrid()
drawCells()
play()