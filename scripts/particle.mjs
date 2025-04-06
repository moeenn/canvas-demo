//@ts-check
import { Position } from "./position.mjs"
import { Colors, Color } from "./color.mjs"
import { random } from "./misc.mjs"

export class Particle {
  /** @type {Position} */
  position

  /** @type {number} */
  size = 4

  /** @type {Color} */
  color = Colors.Orange

  /**
   * @param {number} windowWidth 
   * @param {number} windowHeight 
   */
  constructor(windowWidth, windowHeight) {
    const x = random(0, windowWidth)
    const y = random(0, windowHeight)
    this.position = new Position(x, y)
  }

  /**
   * @param {CanvasRenderingContext2D} ctx 
   * @returns {void}
   */
  render(ctx) {
    const path = new Path2D()
    path.rect(this.position.x - (this.size/2), this.position.y - (this.size/2), this.size, this.size)
    ctx.fillStyle = this.color.toHex()
    ctx.fill(path)
  }
}

export class ParticleWalker {
  /** @type {number} */
  #xSpeed

  /** @type {number} */
  #ySpeed  

  /** @type {number} */
  screenWidth

  /** @type {number} */
  screenHeight

  /**
   * @param {number} speed 
   */
  constructor(screenWidth, screenHeight, speed) {
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight

    this.#xSpeed = random(-1 * speed, speed) || random(-1 * speed, speed)
    this.#ySpeed = random(-1 * speed, speed) || random(-1 * speed, speed)
  }

  /**
   * @param {Particle} particle 
   */
  walkParticle(particle) {
    particle.position.x += this.#xSpeed
    particle.position.y += this.#ySpeed

    if (particle.position.x < 0 || particle.position.x > this.screenWidth) {
      this.#xSpeed *= -1
    }

    if (particle.position.y < 0 || particle.position.y > this.screenHeight) {
      this.#ySpeed *= -1
    }
  }
}