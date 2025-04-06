//@ts-check
import { Position } from "./position.mjs"
import { Colors, Color } from "./color.mjs"
import { random } from "./misc.mjs"
import { Dimentions } from "./dimentions.mjs"

export class Particle {
  /** @type {Position} */
  position

  /** @type {number} */
  size = 2

  /** @type {Color} */
  color = Colors.Orange

  /**
   * @param {Dimentions} canvasSize 
   */
  constructor(canvasSize) {
    const x = random(0, canvasSize.width)
    const y = random(0, canvasSize.height)
    this.position = new Position(x, y)
  }

  /**
   * @param {CanvasRenderingContext2D} ctx 
   * @returns {void}
   */
  render(ctx) {
    ctx.beginPath()
    ctx.arc(this.position.x - (this.size/2), this.position.y - (this.size/2), this.size, 0, 2 * Math.PI)
    ctx.fillStyle = this.color.toHex()
    ctx.fill()
  }
}

export class ParticleWalker {
  /** @type {number} */
  #xSpeed

  /** @type {number} */
  #ySpeed  

  /** @type {Dimentions} */
  canvasSize

  /**
   * @param {Dimentions} canvasSize
   * @param {number} speed 
   */
  constructor(canvasSize, speed) {
    this.canvasSize = canvasSize
    this.#xSpeed = random(-1 * speed, speed) || random(-1 * speed, speed)
    this.#ySpeed = random(-1 * speed, speed) || random(-1 * speed, speed)
  }

  /**
   * @param {Particle} particle 
   */
  walkParticle(particle) {
    particle.position.x += this.#xSpeed
    particle.position.y += this.#ySpeed

    if (particle.position.x < 0 || particle.position.x > this.canvasSize.width) {
      this.#xSpeed *= -1
    }

    if (particle.position.y < 0 || particle.position.y > this.canvasSize.height) {
      this.#ySpeed *= -1
    }
  }
}