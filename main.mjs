//@ts-check
document.addEventListener("DOMContentLoaded", main)

/** 
 * @returns {Promise<void>}
 * @throws {Error}
 */
async function main() {
  const canvas = document.querySelector("canvas")
  if (!canvas) {
    throw new Error("canvas element not found")
  }

  const { ctx, width, height } = getContext(canvas)
  const particles = []
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(width, height))
  }

  while (true) {
    await sleep(16.6) // 60 FPS
    ctx.clearRect(0, 0, width, height)

    for (const particle of particles) {
      particle.walk()
      particle.render(ctx)
    }
  }
}

/**
 * @typedef CanvasResult
 * @property {number} width
 * @property {number} height
 * @property {CanvasRenderingContext2D} ctx
 * 
 * @param {HTMLCanvasElement} canvas 
 * @returns {CanvasResult}
 * @throws {Error}
 */
function getContext(canvas) {
  const ctx = canvas.getContext("2d")
  if (!ctx) {
    throw new Error("failed to get canvas context")
  }

  const {height, width} = canvas.getBoundingClientRect()
  ctx.canvas.height = height
  ctx.canvas.width = width
  return { ctx, width, height }
}

/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function random(min, max) {
  const f =  Math.random() * (max - min) + min
  return Math.ceil(f)
}

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

class Position {
  /** @type {number} */
  x 

  /** @type {number} */
  y

  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Particle {
  /** @type {Position} */
  position

  /** @type {number} */
  size = 3

  /** @type {string} */
  color = "hsl(120, 84%, 50%)"

  /**
   * @param {number} windowWidth 
   * @param {number} windowHeight 
   */
  constructor(windowWidth, windowHeight) {
    const x = random(0, windowWidth)
    const y = random(0, windowHeight)
    this.position = new Position(x, y)
  }

  walk() {
    this.position.x += random(-3, 2)
    this.position.y += random(-3, 2)
  }

  /**
   * @param {CanvasRenderingContext2D} ctx 
   * @returns {void}
   */
  render(ctx) {
    const path = new Path2D()
    path.rect(this.position.x, this.position.y, this.size, this.size)
    ctx.fillStyle = this.color
    ctx.fill(path) 
  }
}