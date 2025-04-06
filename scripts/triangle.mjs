//@ts-check
import { Position } from "./position.mjs"
import { Color } from "./color.mjs"
import { Colors } from "./color.mjs"
import { random } from "./misc.mjs"

class Triangle {
  /** @type {Position} */
  position

  /** @type {number} */
  size = 30

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
    path.moveTo((this.position.x) + (this.size/4), this.position.y + (this.size/4))
    path.lineTo((this.position.x), (this.position.y) - (this.size / 4))
    path.lineTo((this.position.x) - (this.size/4), this.position.y + (this.size/4))
    ctx.fillStyle = this.color.toHex()
    ctx.fill(path)
  }  
}
