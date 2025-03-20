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

  const { height, width } = canvas.getBoundingClientRect()
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
  const f = Math.random() * (max - min) + min
  return Math.ceil(f)
}

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * @param {boolean} condition 
 * @param {string} error 
 * @returns {asserts condition}
 */
function assert(condition, error) {
  if (!condition) {
    throw new Error(error)
  }
}

class Color {
  /** @type {number} */
  #red

  /** @type {number} */
  #green

  /** @type {number} */
  #blue

  /** @type {number} */
  #alpha = 1.0

  /**
   * @param {number} r 
   * @param {number} g 
   * @param {number} b 
   * @param {number | null} a 
   */
  constructor(r, g, b, a = null) {
    assert(r >= 0 && r <= 255, "red must be between 0-255")
    assert(g >= 0 && g <= 255, "green must be between 0-255")
    assert(b >= 0 && b <= 255, "blue must be between 0-255")
    if (a != null) {
      assert(a >= 0.0 && a <= 1.0, "alpha must be between 0.0-1.0")
    }

    this.#red = r
    this.#green = g
    this.#blue = b
    
    if (a != null) {
      this.#alpha = a
    }
  }

  /**
   * @return {string}
   */
  toHex() {
    const rHex = this.#red.toString(16).padStart(2, "0")
    const gHex = this.#green.toString(16).padStart(2, "0")
    const bHex = this.#blue.toString(16).padStart(2, "0")
    const aHex = Math.round(this.#alpha * 255).toString(16).padStart(2, "0")

    return `#${rHex}${gHex}${bHex}${aHex}`
  }
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

  /** @type {Color} */
  color = new Color(20, 235, 20)

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
    ctx.fillStyle = this.color.toHex()
    ctx.fill(path)
  }
}